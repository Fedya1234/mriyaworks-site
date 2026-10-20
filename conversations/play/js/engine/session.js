"use strict";
/* Session — одна партія в історії. Без DOM. Кожна дія гравця синхронно змінює стан
   і повертає «сценарій ходу» (turn script): масив фаз {delay, events}, який програє js/ui/presenter.js.
   delay: 0 | "npcReply" | "nextNode" | "act" (мс — у A.config.pacing).
   Текстові функції історії викликаються рівно в тому порядку і з тим станом, що й у легасі. */
(function(A){
  var E = A.engine;
  var clamp = E.clamp, val = E.val, copy = E.deepCopy;

  function Session(def, opts){
    opts = opts || {};
    this.def = def;
    this.rng = opts.rng || Math.random;
    this.t = opts.t || function(k){ return k; };
    // {nodeKey:{idx:true}} — позначки «вже було» переживають відмотки й рестарти (як у легасі)
    this.tried = opts.tried || {};
    // UI може зберігати в знімку свій стан (HTML чату); рушій його не читає
    this.captureUi = opts.captureUi || null;
    this.rewinds = 0;
    this._init();
  }
  var P = Session.prototype;

  P._init = function(){
    var def = this.def, s;
    s = this.state = { w:{}, contact:def.start.contact, node:"n1", fake:0, aggro:0, f:{}, scars:[], ord:{} };
    Object.assign(s, copy(def.extra || {}));
    def.cast.forEach(function(c){ s.w[c.key] = def.start.w ? def.start.w[c.key] : def.start.wall; });
    E.sync(def, s);
    this.snapshots = [];
    this.moveLog = [];
    this.trace = [];
    this.picks = {};
    this.ended = null;
  };

  /* ---------- допоміжне ---------- */

  P.fk = function(){ return E.firstKey(this.def); };
  P.node = function(){ return this.def.nodes[this.state.node]; };
  P.canRewind = function(){ return this.snapshots.length > 0; };

  P.speaker = function(nodeKey){
    var tg = this.def.nodes[nodeKey].target;
    var c = this.def.cast.filter(function(x){ return x.key===tg; })[0] || this.def.cast[0];
    return c.name;
  };

  P.statusEv = function(dw, dc){
    return { type:"status", faces:E.faces(this.def, this.state), wall:this.state.w[this.fk()],
             contact:this.state.contact, dw:dw||0, dc:dc||0 };
  };

  P.announceEv = function(nodeKey){
    var nd = this.def.nodes[nodeKey];
    if(nd.acts) return { type:"scene", html:val(nd.narr, this.state) };
    return { type:"npc", text:nd.npc(this.state), name:this.speaker(nodeKey) };
  };

  P.snap = function(){
    this.snapshots.push({ state:copy(this.state), ui:this.captureUi ? this.captureUi() : null,
                          moves:this.moveLog.slice(), trace:this.trace.slice() });
  };

  P.endEvs = function(id){
    this.ended = id;
    return [{ type:"end", id:id, storageKey:this.def.storageKey }, { type:"options" }];
  };

  P.failCheck = function(){ return E.failCheck(this.def, this.state); };

  /* ---------- старт / рестарт ---------- */

  P.start = function(){
    var ev = [{ type:"reset" }];
    if(this.def.backstory) ev.push({ type:"backstory", html:this.def.backstory });
    ev.push({ type:"scene", html:this.def.intro });
    ev.push(this.announceEv("n1"));
    ev.push(this.statusEv(0,0));
    ev.push({ type:"options" });
    ev.push({ type:"timeline" });
    return [{ delay:0, events:ev }];
  };

  // Легасі reset(): лічильник відмоток не скидається
  P.restart = function(){ this._init(); return this.start(); };

  /* ---------- що показати гравцю (викликається під час рендеру — тут відбувається перемішування) ---------- */

  P.view = function(){
    var s = this.state, self = this, rng = this.rng;
    if(this.ended) return { kind:"end", id:this.ended, canRewind:this.canRewind() };
    var node = this.node();
    if(node.acts){
      var items = [];
      E.orderFor(s, s.node, node.acts.length, rng).forEach(function(idx){
        var a = node.acts[idx];
        if(a.if && !a.if(s)) return;   // у такому стані ця дія неможлива
        items.push({ idx:idx, text:val(a.text, s) });
      });
      return { kind:"acts", items:items, canRewind:this.canRewind() };
    }
    if(node.slots){
      var hot = s.w.you>=50;
      var slots = node.slots.map(function(slot, si){
        var frags = [];
        E.orderFor(s, s.node+":"+si, slot.frags.length, rng).forEach(function(fi){
          var fr = slot.frags[fi];
          if(fr.needsCalm && hot) return;   // у такому стані ці слова просто не спадають на думку
          frags.push({ fi:fi, text:fr.text, on:self.picks[si]===fi });
        });
        return { label:slot.label, hint:slot.hint, frags:frags };
      });
      var done = node.slots.every(function(_, si){ return self.picks[si]!==undefined; });
      return { kind:"builder", slots:slots, hot:hot, done:done,
               preview: done ? node.slots.map(function(sl,si){ return sl.frags[self.picks[si]].text; }).join(" ") : null,
               calm:s.calm, canBreathe:!(s.calm<=0), canRewind:this.canRewind() };
    }
    var ts = this.tried[s.node] || {};
    var opts = [];
    E.orderFor(s, s.node, node.options.length, rng).forEach(function(idx){
      var opt = node.options[idx];
      if(opt.if && !opt.if(s)) return;   // репліка, яка вже не має сенсу після сказаного
      opts.push({ idx:idx, text:val(opt.text, s), tried:!!ts[idx] });
    });
    return { kind:"options", items:opts, canRewind:this.canRewind() };
  };

  /* ---------- класичний вибір репліки ---------- */

  P.choose = function(idx){
    var def = this.def, s = this.state, self = this;
    if(this.ended) return null;
    var node = this.node();
    if(!node || !node.options || !node.options[idx]) return null;
    var opt = node.options[idx];
    if(opt.if && !opt.if(s)) return null;

    (this.tried[s.node] = this.tried[s.node] || {})[idx] = true;
    this.snap();
    var p0 = [{ type:"clearOptions" }, { type:"timeline" }, { type:"me", text:val(opt.text, s) }];

    var fk = this.fk();
    var tgt = node.target || fk;
    var deltas = opt.d || (function(){ var o={}; o[fk]=(opt.dw||0); return o; })();
    var muted = s.w[tgt]>=60 && (opt.dc||0)>0;
    var dc = muted ? Math.floor((opt.dc||0)/2) : (opt.dc||0);

    Object.keys(deltas).forEach(function(k){ s.w[k] = clamp(s.w[k]+deltas[k]); });
    E.sync(def, s);
    s.contact = clamp(s.contact+dc);
    s.fake += opt.fake||0;
    s.aggro += opt.aggro||0;
    if(opt.set) Object.assign(s.f, opt.set);
    if(opt.res) Object.keys(opt.res).forEach(function(k){ s[k] = (s[k]||0)+opt.res[k]; });
    if(opt.scar) s.scars.push(opt.scar);
    this.moveLog.push({ icon:opt.icon, tag:opt.tag, cls:opt.cls });
    this.trace.push({ tag:opt.tag, icon:opt.icon, cls:opt.cls, d:deltas, dc:dc });
    var dwFirst = deltas[fk]||0;
    p0.push({ type:"moveBadge", icon:opt.icon, tag:opt.tag, dw:dwFirst, dc:dc, hidden:!!def.hidden });

    var p1 = [];
    var script = [{ delay:0, events:p0 }, { delay:"npcReply", events:p1 }];
    if(opt.beat){
      def.cast.forEach(function(c){
        var b = opt.beat[c.key];
        if(b) p1.push({ type:"beat", name:c.name, text: typeof b==="function" ? b(s) : b });
      });
    }
    p1.push({ type:"npc", text:opt.react(s), name:this.speaker(s.node) });
    p1.push(this.statusEv(dwFirst, dc));
    p1.push({ type:"coach", text:opt.coach, muted:muted });

    if(opt.forceEnd){
      var forced = opt.forceEnd(s);
      if(forced){ push(p1, this.endEvs(forced)); return script; }
    }
    var failed = this.failCheck();
    if(failed){ push(p1, this.endEvs(failed)); return script; }

    if(opt.endsRun){
      var id;
      if(def.resolve) id = def.resolve(s, opt);
      else if(opt.cls==="good" && s.contact>=60 && s.fake<3) id = "contact";
      else id = "truce";
      push(p1, this.endEvs(id));
      return script;
    }

    var nextKey = val(node.next, s);
    if(!nextKey){ push(p1, this.endEvs(def.resolve ? def.resolve(s, opt) : "truce")); return script; }
    s.node = nextKey;
    var nx = def.nodes[s.node];
    var p2 = [];
    script.push({ delay:"nextNode", events:p2 });
    if(nx.enter){
      var key = nx.enter.dwKey || fk;
      s.w[key] = clamp(s.w[key]+nx.enter.dw);
      E.sync(def, s);
      p2.push(this.statusEv(def.hidden ? 0 : nx.enter.dw, 0));
      p2.push({ type:"sys", text:nx.enter.note, dw: def.hidden ? null : nx.enter.dw });
      var f2 = this.failCheck();
      if(f2){
        p2.push({ type:"npc", text:nx.npc(s), name:this.speaker(s.node) });
        push(p2, this.endEvs(f2));
        return script;
      }
    }
    p2.push(this.announceEv(s.node));
    p2.push({ type:"options" });
    return script;
  };

  /* ---------- вузол-дія (прелюдія): вчинки, не слова ---------- */

  P.doAct = function(idx){
    var def = this.def, s = this.state;
    if(this.ended) return null;
    var node = this.node();
    if(!node || !node.acts || !node.acts[idx]) return null;
    var a = node.acts[idx];
    if(a.if && !a.if(s)) return null;

    this.snap();
    var p0 = [{ type:"clearOptions" }, { type:"timeline" }, { type:"beat", you:true, text:val(a.did, s) }];
    if(a.d) Object.keys(a.d).forEach(function(k){ s.w[k] = clamp(s.w[k]+a.d[k]); });
    if(a.res) Object.keys(a.res).forEach(function(k){ s[k] = (s[k]||0)+a.res[k]; });
    if(a.set) Object.assign(s.f, a.set);
    E.sync(def, s);
    this.moveLog.push({ icon:a.icon||"•", tag:a.tag, cls:a.cls||"meh" });
    this.trace.push({ tag:a.tag, icon:a.icon||"•", cls:a.cls||"meh", d:a.d||{}, dc:0 });
    p0.push(this.statusEv(0,0));

    var p1 = [];
    var script = [{ delay:0, events:p0 }, { delay:"act", events:p1 }];
    if(a.note) p1.push({ type:"coach", text:a.note, muted:false });
    if(a.end){ push(p1, this.endEvs(a.end)); return script; }
    s.node = val(a.then, s);
    p1.push(this.announceEv(s.node));
    p1.push({ type:"options" });
    return script;
  };

  /* ---------- конструктор фрази ---------- */

  P.pick = function(si, fi){
    if(this.ended) return null;
    var node = this.node();
    if(!node || !node.slots || !node.slots[si] || !node.slots[si].frags[fi]) return null;
    if(node.slots[si].frags[fi].needsCalm && this.state.w.you>=50) return null;
    this.picks[si] = fi;
    return [{ delay:0, events:[{ type:"options" }] }];
  };

  P.breathe = function(){
    var def = this.def, s = this.state, fk = this.fk();
    if(this.ended) return null;
    var node = this.node();
    if(!node || !node.slots || s.calm<=0) return null;
    s.calm--;
    s.w.you = Math.max(0, s.w.you-35);
    s.w[fk] = Math.min(100, s.w[fk]+4);
    E.sync(def, s);
    var ev = [{ type:"beat", you:true, textKey:"breatheSelf" }];
    if(def.breatheBeat) ev.push({ type:"beat", name:def.cast[0].name, text:def.breatheBeat });
    ev.push(this.statusEv(0,0));
    ev.push({ type:"options" });
    return [{ delay:0, events:ev }];
  };

  P.commit = function(){
    var def = this.def, s = this.state, self = this, fk = this.fk();
    if(this.ended) return null;
    var node = this.node();
    if(!node || !node.slots) return null;
    if(!node.slots.every(function(_, si){ return self.picks[si]!==undefined; })) return null;
    var chosen = node.slots.map(function(sl, si){ return sl.frags[self.picks[si]]; });

    this.snap();
    var p0 = [{ type:"clearOptions" }, { type:"timeline" },
              { type:"me", text:chosen.map(function(f){ return f.text; }).join(" ") }];

    var up=0, down=0, dc=0, dh=0, worst="good";
    chosen.forEach(function(f){
      var v = f.dw||0;
      if(v>0) up+=v; else down+=v;
      dc += f.dc||0; dh += f.heat||0;
      if(f.q==="bad") worst="bad";
      else if(f.q==="meh" && worst!=="bad") worst="meh";
    });
    // Найгірша частина визначає всю фразу
    var dw;
    if(worst==="bad"){ dw=up; dc=0; }
    else if(worst==="meh"){ dw=up+Math.round(down*0.5); dc=Math.floor(dc/2); }
    else { dw=up+down; }

    s.w[fk] = clamp(s.w[fk]+dw);
    s.w.you = clamp(s.w.you+dh);
    s.contact = clamp(s.contact+dc);
    E.sync(def, s);
    var phraseNo = this.trace.filter(function(t){ return t.kind==="phrase"; }).length+1;   // прелюдія не зсуває нумерацію
    var tag = this.t("phrase")+phraseNo;
    this.moveLog.push({ icon: worst==="good"?"✅":(worst==="meh"?"➖":"⚠️"), tag:tag, cls: worst==="good"?"good":(worst==="meh"?"meh":"bad") });
    var d = {}; d[fk] = dw; d.you = dh;
    this.trace.push({ kind:"phrase", tag:tag, icon:"🗣", cls:worst, d:d, dc:dc });
    this.picks = {};

    var p1 = [];
    var script = [{ delay:0, events:p0 }, { delay:"npcReply", events:p1 }];
    var reactKey = worst==="meh" ? "mixed" : worst;   // ключі react: good/mixed/bad
    p1.push({ type:"npc", text:node.react[reactKey](s), name:this.speaker(s.node) });
    p1.push(this.statusEv(0,0));
    p1.push({ type:"notes", items:chosen.map(function(f){ return { q:f.q, note:f.note }; }) });
    var failed = this.failCheck();
    if(failed){ push(p1, this.endEvs(failed)); return script; }
    var nextKey = val(node.next, s);
    if(!nextKey){ push(p1, this.endEvs(def.resolve(s))); return script; }
    s.node = nextKey;
    script.push({ delay:"nextNode", events:[this.announceEv(s.node), { type:"options" }] });
    return script;
  };

  /* ---------- відмотка ---------- */

  P.rewindTo = function(i){
    var sn = this.snapshots[i];
    if(!sn) return null;
    this.state = copy(sn.state);
    this.moveLog = sn.moves.slice();
    this.trace = sn.trace.slice();
    this.snapshots = this.snapshots.slice(0, i);
    this.picks = {};
    this.rewinds++;
    this.ended = null;
    return [{ delay:0, events:[{ type:"restore", ui:sn.ui }, this.statusEv(0,0), { type:"options" }, { type:"timeline" }] }];
  };
  P.rewindLast = function(){ return this.rewindTo(this.snapshots.length-1); };

  function push(arr, items){ for(var i=0;i<items.length;i++) arr.push(items[i]); }

  E.Session = Session;
  E.createSession = function(def, opts){ return new Session(def, opts); };
})(globalThis.Amedi);
