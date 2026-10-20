"use strict";
/* Програвач сценаріїв ходу: єдине місце з таймерами.
   Фаза з delay>0 показує «•••», чекає A.config.pacing[delay] мс (0 при prefers-reduced-motion),
   потім рендерить свої події. flush() — пропуск: решта фаз рендериться негайно. */
(function(A){
  var D = A.ui.dom;
  var P = A.ui.presenter = { pending:false };
  var queue = [], waiting = false, timer = null, typingEl = null, ctx = null;

  function delayMs(d){
    if(!d) return 0;
    if(D.reducedMotion()) return 0;
    var ms = (A.config.pacing || {})[d];
    return typeof ms === "number" ? ms : 0;
  }

  function showTyping(){
    if(typingEl) return;
    typingEl = D.el("div", "typing", "•••");
    var chat = D.$("chat"); if(chat) chat.appendChild(typingEl);
  }
  function hideTyping(){ if(typingEl){ typingEl.remove(); typingEl = null; } }

  // phases: [{delay, events}], c: {render(ev), onDone()}
  P.play = function(phases, c){
    if(P.pending) P.flush();
    queue = (phases || []).slice();
    ctx = c || {};
    waiting = false;
    P.pending = true;
    step(false);
  };

  function step(skip){
    while(queue.length){
      var ph = queue[0];
      if(!waiting && !skip){
        var ms = delayMs(ph.delay);
        if(ms > 0){
          waiting = true;
          showTyping();
          timer = setTimeout(function(){ timer = null; step(false); }, ms);
          return;
        }
      }
      if(timer){ clearTimeout(timer); timer = null; }
      waiting = false;
      queue.shift();
      hideTyping();
      var c = ctx;
      for(var i=0;i<ph.events.length;i++) c.render(ph.events[i]);
      if(ctx !== c) return;   // рендер запустив новий сценарій / скасування
    }
    finish();
  }

  function finish(){
    var c = ctx;
    P.pending = false;
    ctx = null;
    if(c && c.onDone) c.onDone();
  }

  // Пропуск: дорендерити все, що лишилось, синхронно
  P.flush = function(){
    if(!P.pending) return;
    step(true);
  };

  // Скасувати без рендеру (напр., зміна мови); стан рушія вже узгоджений
  P.cancel = function(){
    if(timer){ clearTimeout(timer); timer = null; }
    hideTyping();
    queue = []; waiting = false; ctx = null; P.pending = false;
  };
})(globalThis.Amedi);
