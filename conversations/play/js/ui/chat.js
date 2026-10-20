"use strict";
/* Рендер повідомлень чату. Запам'ятовує перший новий елемент ходу — якір для автоскролу. */
(function(A){
  var D = A.ui.dom;
  var C = A.ui.chat = {};
  var anchor = null;

  C.beginTurn = function(){ anchor = null; };
  C.turnAnchor = function(){ return anchor; };

  function box(){ return D.$("chat"); }
  function append(e){
    box().appendChild(e);
    if(!anchor) anchor = e;
    return e;
  }

  C.backstory = function(html){
    var d = D.el("details", "back");
    var s = D.el("summary", null, A.t("backstory"));
    d.appendChild(s);
    d.insertAdjacentHTML("beforeend", html);
    return append(d);
  };
  C.scene = function(html){ var d = D.el("div", "scene"); d.innerHTML = html; return append(d); };
  C.npc = function(text, name){
    var d = D.el("div", "msg npc");
    d.appendChild(D.el("span", "name", name));
    d.appendChild(document.createTextNode(text));
    return append(d);
  };
  C.me = function(text){ return append(D.el("div", "msg me", text)); };
  C.coach = function(text){ return append(D.el("div", "coach", text)); };
  C.sys = function(text){ return append(D.el("div", "sys", text)); };
  C.beat = function(name, text){
    var d = D.el("div", "beat");
    d.appendChild(D.el("b", null, name + " — "));
    d.appendChild(document.createTextNode(text));
    return append(d);
  };
  C.moveBadge = function(ev){
    var t = A.t, parts = [];
    if(!ev.hidden){
      if(ev.dw) parts.push('<span class="'+(ev.dw>0?"dW":"dWn")+'">'+t("wall")+" "+(ev.dw>0?"+":"")+ev.dw+"</span>");
      if(ev.dc) parts.push('<span class="'+(ev.dc>0?"dC":"dCn")+'">'+t("contact")+" "+(ev.dc>0?"+":"")+ev.dc+"</span>");
    }
    var d = D.el("div", "movecard");
    d.innerHTML = '<span class="mi">'+ev.icon+"</span><b>"+ev.tag+"</b>"+(parts.length ? "<span>"+parts.join(" · ")+"</span>" : "");
    return append(d);
  };
  C.notes = function(items){
    var nb = D.el("div", "notes");
    items.forEach(function(f){ nb.appendChild(D.el("div", "note "+f.q, f.note)); });
    return append(nb);
  };
  C.restore = function(html){ box().innerHTML = html || ""; };
  C.clear = function(){ box().innerHTML = ""; };

  // Остання репліка/сцена — те, на що гравець відповідає (якір після відмотки)
  C.lastPrompt = function(){
    var els = box().querySelectorAll(".msg.npc, .scene");
    return els.length ? els[els.length-1] : null;
  };

  C.flash = function(){
    var fl = D.el("div", "flash");
    document.body.appendChild(fl);
    setTimeout(function(){ fl.remove(); }, 550);
  };
})(globalThis.Amedi);
