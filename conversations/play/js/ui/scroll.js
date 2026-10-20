"use strict";
/* Єдиний планувальник автоскролу.
   Замість smooth-скролу «в самий низ» після кожного повідомлення (5–7 перезапусків анімації за хід,
   повільно на iOS, репліка співрозмовника вилітала за верх екрана) — один скрол наприкінці ходу:
   перше нове повідомлення ходу стає одразу під липкий статус (CSS scroll-margin-top = --stick).
   Скролимо лише вниз; smooth — тільки якщо відстань менша за висоту екрана. */
(function(A){
  var D = A.ui.dom;
  var S = A.ui.scroll = {};
  var target = null, raf = 0;

  function frame(fn){
    return (window.requestAnimationFrame || function(f){ return setTimeout(f,16); })(fn);
  }

  // Висота липкого статусу → CSS-змінна --stick (на неї спирається scroll-margin-top)
  S.measure = function(){
    var st = D.$("statusBox"), game = D.$("game");
    if(!st || !game || game.classList.contains("hidden")) return;
    var top = parseFloat(getComputedStyle(st).top) || 0;
    document.documentElement.style.setProperty("--stick", Math.round(top + st.offsetHeight + 10) + "px");
  };

  // Попросити показати елемент; кілька запитів за кадр зливаються в один (перемагає перший)
  S.reveal = function(el){
    if(!el) return;
    if(!target) target = el;
    if(!raf) raf = frame(run);
  };

  S.cancel = function(){ target = null; };

  function run(){
    raf = 0;
    var el = target; target = null;
    if(!el || !el.isConnected) return;
    S.measure();
    var margin = parseFloat(getComputedStyle(el).scrollMarginTop) || 0;
    var dist = el.getBoundingClientRect().top - margin;
    if(dist <= 1) return;                       // уже на лінії або вище — вгору не скролимо
    var vh = window.innerHeight || document.documentElement.clientHeight;
    var smooth = dist < vh && !D.reducedMotion();
    var y = (window.pageYOffset || document.documentElement.scrollTop) + dist;
    try{ window.scrollTo({ top:y, behavior: smooth ? "smooth" : "auto" }); }
    catch(e){ window.scrollTo(0, y); }
  }

  S.toTop = function(){ target = null; window.scrollTo(0, 0); };

  S.init = function(){
    var pending = false;
    window.addEventListener("resize", function(){
      if(pending) return; pending = true;
      frame(function(){ pending = false; S.measure(); });
    });
  };
})(globalThis.Amedi);
