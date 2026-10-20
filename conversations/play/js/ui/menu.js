"use strict";
/* Шапка (тексти, перемикач мов із A.config.languages) і меню історій. */
(function(A){
  var D = A.ui.dom;
  var M = A.ui.menu = {};

  M.languages = function(){
    var ls = A.config.languages;
    if(ls && ls.length) return ls;
    return Object.keys(A.i18n.dicts).map(function(c){ return { code:c, label:c.toUpperCase() }; });
  };

  M.buildSwitcher = function(onPick){
    var sw = D.$("langSw");
    sw.innerHTML = "";
    M.languages().forEach(function(l){
      var b = D.el("button", null, l.label);
      b.type = "button";
      b.setAttribute("data-l", l.code);
      b.setAttribute("lang", l.code);
      var d = A.i18n.dicts[l.code];
      b.setAttribute("aria-label", (d && d.langName) || l.label);
      b.onclick = function(){ onPick(l.code); };
      sw.appendChild(b);
    });
  };

  M.applyHeader = function(lang){
    var t = A.t;
    D.$("pageTitle").textContent = t("title");
    D.$("pageSub").textContent = t("sub");
    D.$("hardTxt").textContent = t("hard");
    D.$("hintsTxt").textContent = t("hints");
    D.$("backBtn").textContent = t("back");
    D.$("footer").textContent = t("footer");
    document.title = t("title");
    document.documentElement.setAttribute("lang", lang);
    Array.prototype.forEach.call(document.querySelectorAll("#langSw button"), function(b){
      var on = b.getAttribute("data-l") === lang;
      b.classList.toggle("on", on);
      b.setAttribute("aria-pressed", on ? "true" : "false");
    });
  };

  M.showLoading = function(){
    var m = D.$("menu");
    m.innerHTML = "";
    m.appendChild(D.el("div", "menu-loading", A.t("loading")));
  };

  M.showError = function(failed, retry){
    var m = D.$("menu");
    m.innerHTML = "";
    var e = D.el("div", "menu-error", "⚠️ " + failed.map(function(id){ return "stories/"+id; }).join(", "));
    m.appendChild(e);
    var b = D.el("button", "btn ghost", "⟳");
    b.type = "button";
    b.onclick = retry;
    m.appendChild(b);
  };

  // stories: список def у порядку маніфесту
  M.show = function(stories, opts){
    var t = A.t, m = D.$("menu");
    m.innerHTML = "";
    m.appendChild(D.el("div", "menu-hello", t("hello")));

    var hardRow = D.el("label", "menu-hard");
    var cbx = document.createElement("input");
    cbx.type = "checkbox"; cbx.checked = opts.hard;
    cbx.onchange = function(){ opts.onHard(cbx.checked); };
    var htx = document.createElement("span");
    htx.innerHTML = "<b>"+t("hard")+"</b> — "+t("hardDesc");
    hardRow.appendChild(cbx); hardRow.appendChild(htx);
    m.appendChild(hardRow);

    stories.forEach(function(st){
      var got = A.storage.endingsGot(st.storageKey).length;
      var b = D.el("button", "story" + (st.hidden ? " blind" : ""));
      b.type = "button";
      b.innerHTML = '<span class="st-top"><span class="st-em">'+st.em+'</span><span class="st-title">'+st.title+'</span><span class="st-diff">'+st.diff+"</span></span>"+
        '<span class="st-desc">'+st.desc+"</span>"+
        '<span class="st-prog">'+(got ? t("foundPre")+got+t("of")+st.endOrder.length : t("notPlayed"))+"</span>";
      b.onclick = function(){ opts.onStart(st.id); };
      m.appendChild(b);
    });
  };
})(globalThis.Amedi);
