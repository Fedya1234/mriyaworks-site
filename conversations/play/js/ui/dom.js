"use strict";
/* Дрібні DOM-помічники. */
(function(A){
  var D = A.ui.dom = {};
  D.$ = function(id){ return document.getElementById(id); };
  D.el = function(tag, cls, text){
    var e = document.createElement(tag);
    if(cls) e.className = cls;
    if(text != null) e.textContent = text;
    return e;
  };
  D.clear = function(e){ if(e) e.innerHTML = ""; };
  D.overlay = function(){ return document.querySelector(".overlay"); };
  D.removeOverlay = function(){ var ov = D.overlay(); if(ov) ov.remove(); };
  D.reducedMotion = function(){
    try{ return !!(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches); }catch(e){ return false; }
  };
})(globalThis.Amedi);
