"use strict";
/* Панель ходу під чатом (варіанти / дії / конструктор / «Далі») і таймлайн відмоток.
   Рендерить view-модель з session.view(); кліки йдуть у A.app. */
(function(A){
  var D = A.ui.dom;
  var K = A.ui.controls = {};

  function btn(cls, text, onclick){
    var b = D.el("button", cls, text);
    b.type = "button";
    if(onclick) b.onclick = onclick;
    return b;
  }

  function addRewind(box, view){
    if(!view.canRewind) return;
    box.appendChild(btn("opt rw", A.t("rewindBtn"), function(){ A.app.rewindLast(); }));
  }

  K.clear = function(){ D.clear(D.$("options")); };

  K.render = function(view){
    var box = D.$("options"), t = A.t;
    box.innerHTML = "";
    if(view.kind === "options"){
      view.items.forEach(function(it){
        var b = btn("opt", null, function(){ A.app.choose(it.idx); });
        b.appendChild(document.createTextNode(it.text));
        if(it.tried){
          b.classList.add("tried");
          b.appendChild(D.el("span", "was", t("tried")));
        }
        box.appendChild(b);
      });
      addRewind(box, view);
    }else if(view.kind === "acts"){
      view.items.forEach(function(it){
        var b = btn("opt act", null, function(){ A.app.doAct(it.idx); });
        b.appendChild(document.createTextNode(it.text));
        box.appendChild(b);
      });
      addRewind(box, view);
    }else if(view.kind === "builder"){
      renderBuilder(box, view);
    }else if(view.kind === "end"){
      box.appendChild(btn("opt next", t("next"), function(){ A.ui.ending.show(); }));
      addRewind(box, view);
    }
  };

  function renderBuilder(box, view){
    var t = A.t, hard = A.app.hard;
    var wrap = D.el("div", "builder");
    view.slots.forEach(function(slot, si){
      var sd = D.el("div", "slot");
      if(!hard){
        var h = D.el("div", "slot-h");
        h.innerHTML = "<b>"+slot.label+"</b> · <span>"+slot.hint+"</span>";
        sd.appendChild(h);
      }
      slot.frags.forEach(function(fr){
        var b = btn("frag", null, function(){ A.app.pick(si, fr.fi); });
        if(fr.on) b.classList.add("on");
        b.setAttribute("aria-pressed", fr.on ? "true" : "false");
        b.appendChild(document.createTextNode(fr.text));
        sd.appendChild(b);
      });
      wrap.appendChild(sd);
    });
    box.appendChild(wrap);

    if(view.hot) box.appendChild(D.el("div", "hothint", t("hotHint")));

    var pv = D.el("div", "preview");
    pv.innerHTML = view.done ? view.preview : '<span class="ph">'+t("pickHint")+"</span>";
    box.appendChild(pv);

    var acts = D.el("div", "bactions");
    var say = btn("btn primary", t("say"), function(){ A.app.commit(); });
    say.disabled = !view.done;
    acts.appendChild(say);
    var calm = btn("btn ghost", t("breathe")+" ("+view.calm+")", function(){ A.app.breathe(); });
    calm.disabled = !view.canBreathe;
    acts.appendChild(calm);
    box.appendChild(acts);

    var rw = D.el("div", "options");
    box.appendChild(rw);
    addRewind(rw, view);
  }

  K.timeline = function(session){
    var tl = D.$("timeline"), t = A.t;
    tl.innerHTML = "";
    tl.appendChild(D.el("span", "tl-label", t("timeLabel")));
    session.snapshots.forEach(function(sn, i){
      var label = t("rewindToMove") + (i+1);
      var b = btn("dot", String(i+1), function(){ A.app.rewindTo(i); });
      b.title = label;
      b.setAttribute("aria-label", label);
      tl.appendChild(b);
    });
    tl.appendChild(D.el("span", "rw-count", t("rewinds") + session.rewinds));
  };
})(globalThis.Amedi);
