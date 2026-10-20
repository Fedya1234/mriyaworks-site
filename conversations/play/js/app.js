"use strict";
/* Точка входу: зв'язує рушій (Session) з UI (presenter + рендерери). */
(function(A){
  var D = A.ui.dom, $ = D.$;
  var app = A.app = { session:null, def:null, lang:A.config.defaultLang, hard:false };
  var triedByStory = {};   // позначки «вже було» живуть до перезавантаження сторінки (як у легасі)
  var loadToken = 0;
  var keys = A.config.storageKeys;

  function hintsOn(){ var h = $("hints"); return !h || h.checked; }

  /* ---------- рендер подій сценарію ---------- */

  app.render = function(ev){
    var C = A.ui.chat, t = A.t, s = app.session;
    switch(ev.type){
      case "reset":
        C.clear(); A.ui.controls.clear(); D.clear($("timeline")); D.removeOverlay(); break;
      case "backstory": C.backstory(ev.html); break;
      case "scene": C.scene(ev.html); break;
      case "npc": C.npc(ev.text, ev.name); break;
      case "me": C.me(ev.text); break;
      case "beat": C.beat(ev.you ? t("you") : ev.name, ev.textKey ? t(ev.textKey) : ev.text); break;
      case "coach":
        if(hintsOn()) C.coach((ev.text == null ? "" : String(ev.text)) + (ev.muted ? t("mutedSuffix") : ""));
        break;
      case "sys":
        C.sys(ev.dw == null ? ev.text : ev.text+" ("+t("wall")+" "+(ev.dw>0?"+":"")+ev.dw+")");
        break;
      case "moveBadge": C.moveBadge(ev); break;
      case "notes": if(hintsOn()) C.notes(ev.items); break;
      case "status": A.ui.status.update(app.def, ev); break;
      case "clearOptions": A.ui.controls.clear(); break;
      case "timeline": A.ui.controls.timeline(s); break;
      case "options": A.ui.controls.render(s.view()); break;
      case "end": A.storage.saveEnding(ev.storageKey, ev.id); break;
      case "restore": C.restore(ev.ui); D.removeOverlay(); C.flash(); break;
    }
  };

  // opts: {scroll:false} — без автоскролу; {top:true} — на початок сторінки; {fallback:fn} — якір, якщо хід нічого не додав у чат
  function play(script, opts){
    opts = opts || {};
    A.ui.chat.beginTurn();
    A.ui.presenter.play(script, {
      render: app.render,
      onDone: function(){
        A.ui.scroll.measure();
        if(opts.top){ A.ui.scroll.toTop(); return; }
        if(opts.scroll === false) return;
        A.ui.scroll.reveal(A.ui.chat.turnAnchor() || (opts.fallback && opts.fallback()));
      }
    });
  }

  function act(fn, opts){
    var s = app.session;
    if(!s) return;
    A.ui.presenter.flush();          // стан UI має бути дорендерений до знімка
    var script = fn(s);
    if(script) play(script, opts);
  }

  app.choose = function(idx){ act(function(s){ return s.choose(idx); }); };
  app.doAct = function(idx){ act(function(s){ return s.doAct(idx); }); };
  app.pick = function(si, fi){ act(function(s){ return s.pick(si, fi); }, { scroll:false }); };
  app.breathe = function(){ act(function(s){ return s.breathe(); }, { scroll:false }); };
  app.commit = function(){ act(function(s){ return s.commit(); }); };
  app.rewindTo = function(i){ act(function(s){ return s.rewindTo(i); }, { fallback:A.ui.chat.lastPrompt }); };
  app.rewindLast = function(){ act(function(s){ return s.rewindLast(); }, { fallback:A.ui.chat.lastPrompt }); };
  app.restart = function(){ act(function(s){ return s.restart(); }, { top:true }); };

  /* ---------- меню / історія ---------- */

  app.setHard = function(on){
    app.hard = !!on;
    A.storage.set(keys.hard, app.hard ? "1" : "0");
    var hm = $("hardMode"); if(hm) hm.checked = app.hard;
    // Перерендер конструктора лише коли безпечно: не посеред ходу, не після фіналу, без картки фіналу
    var s = app.session;
    if(s && !A.ui.presenter.pending && !s.ended && s.node() && s.node().slots && !D.overlay()){
      A.ui.controls.render(s.view());
    }
  };

  app.showMenu = function(){
    A.ui.presenter.cancel();
    app.session = null; app.def = null;
    $("game").classList.add("hidden");
    $("backBtn").classList.add("hidden");
    $("hardWrap").classList.add("hidden");
    D.removeOverlay();
    $("menu").classList.remove("hidden");
    var token = ++loadToken, lang = app.lang;
    A.ui.menu.showLoading();
    A.loader.ensureLang(lang).then(function(res){
      if(token !== loadToken) return;
      var list = A.stories.list(lang);
      if(!list.length){ A.ui.menu.showError(res.failed, app.showMenu); return; }
      A.ui.menu.show(list, { hard:app.hard, onHard:app.setHard, onStart:app.startStory });
    });
  };

  app.startStory = function(id){
    var def = A.stories.get(app.lang, id);
    if(!def) return;
    A.ui.presenter.cancel();
    app.def = def;
    app.session = A.engine.createSession(def, {
      rng: Math.random,
      t: A.t,
      tried: triedByStory[id] || (triedByStory[id] = {}),
      captureUi: function(){ return $("chat").innerHTML; }
    });
    $("menu").classList.add("hidden");
    $("game").classList.remove("hidden");
    $("backBtn").classList.remove("hidden");
    $("hardWrap").classList.toggle("hidden", def.mode !== "builder");
    A.ui.status.build(def);
    play(app.session.start(), { top:true });
  };

  app.applyLang = function(l){
    app.lang = A.i18n.setLang(l);
    A.storage.set(keys.lang, app.lang);
    A.ui.menu.applyHeader(app.lang);
    app.showMenu();
  };

  /* ---------- пропуск пауз: будь-який тап / клавіша під час ходу ---------- */

  function installSkip(){
    document.addEventListener("click", function(e){
      if(!A.ui.presenter.pending) return;
      A.ui.presenter.flush();
      // Тап, що пропустив паузу, не повинен ще й натиснути щось під пальцем (крім шапки)
      var inHeader = e.target && e.target.closest && e.target.closest("header.top");
      if(!inHeader){ e.preventDefault(); e.stopPropagation(); }
    }, true);
    document.addEventListener("keydown", function(e){
      if(!A.ui.presenter.pending || e.altKey || e.ctrlKey || e.metaKey) return;
      A.ui.presenter.flush();
      if(e.key === "Enter" || e.key === " ") e.preventDefault();
    }, true);
  }

  app.boot = function(){
    var saved = A.storage.get(keys.lang);
    var lang = A.i18n.has(saved) ? saved : A.config.defaultLang;
    app.hard = A.storage.get(keys.hard) === "1";
    $("hardMode").checked = app.hard;
    $("hardMode").onchange = function(){ app.setHard($("hardMode").checked); };
    $("backBtn").onclick = app.showMenu;
    installSkip();
    A.ui.scroll.init();
    A.ui.menu.buildSwitcher(app.applyLang);
    app.applyLang(lang);
    // Мови, чиї словники не підключені в index.html, догружаються й оновлюють підписи
    A.loader.ensureLocales().then(function(){
      A.ui.menu.buildSwitcher(app.applyLang);
      A.ui.menu.applyHeader(app.lang);
    });
  };

  app.boot();
})(globalThis.Amedi);
