"use strict";
/* Картка фіналу поверх гри. */
(function(A){
  var D = A.ui.dom;
  var En = A.ui.ending = {};

  function num(v){
    if(!v) return '<span class="zero">0</span>';
    return '<span class="'+(v>0?"up":"down")+'">'+(v>0?"+":"")+v+"</span>";
  }

  function traceTable(def, trace){
    var t = A.t, cols = def.cast;
    return '<div class="trace-wrap"><table class="trace"><thead><tr><th>'+t("moveCol")+"</th>"+
      cols.map(function(c){ return '<th style="text-align:right">'+c.name+"</th>"; }).join("")+
      '<th style="text-align:right">'+t("contact")+"</th></tr></thead><tbody>"+
      trace.map(function(r){
        return "<tr><td>"+r.icon+" "+r.tag+"</td>"+
          cols.map(function(c){ return '<td class="n">'+num(r.d[c.key]||0)+"</td>"; }).join("")+
          '<td class="n">'+num(r.dc)+"</td></tr>";
      }).join("")+
      "</tbody></table></div>";
  }

  En.show = function(){
    var app = A.app, s = app.session, def = app.def;
    if(!s || !s.ended) return;
    D.removeOverlay();
    var t = A.t, e = def.endings[s.ended];
    var got = A.storage.endingsGot(def.storageKey);
    var mvs = s.moveLog.map(function(m){ return '<span class="mv '+m.cls+'">'+m.icon+" "+m.tag+"</span>"; }).join("");
    var coll = def.endOrder.map(function(k){
      return '<span class="coll '+(got.indexOf(k)>=0?"got":"")+'" title="'+def.endings[k].title+'">'+def.endings[k].emoji+"</span>";
    }).join("");
    var scars = s.state.scars;
    var ov = D.el("div", "overlay");
    ov.innerHTML =
      '<div class="end-card" role="dialog" aria-modal="true">'+
        '<div class="end-emoji">'+e.emoji+"</div>"+
        '<div class="end-title '+e.cls+'">'+e.title+"</div>"+
        '<div class="end-text">'+e.text+"</div>"+
        '<div class="end-stats">'+t("rewindStat")+s.rewinds+" · "+t("foundPre")+got.length+t("of")+def.endOrder.length+"</div>"+
        '<div class="collected">'+coll+"</div>"+
        '<div class="sec-h">'+t("yourMoves")+"</div>"+
        '<div class="movemap">'+mvs+"</div>"+
        (scars.length ? '<div class="sec-h">'+t("willRemember")+'</div><div class="scars">'+scars.map(function(x){ return '<div class="scar">'+x+"</div>"; }).join("")+"</div>" : "")+
        (def.hidden ? '<div class="sec-h">'+t("behindScales")+"</div>"+traceTable(def, s.trace) : "")+
        '<div class="sec-h">'+t("whatWorked")+"</div>"+
        '<div class="nvc">'+def.debrief+"</div>"+
        '<div class="end-actions">'+
          '<button type="button" class="btn primary" data-a="rewind">'+t("endRewind")+"</button>"+
          '<button type="button" class="btn ghost" data-a="restart">'+t("restart")+"</button>"+
          '<button type="button" class="btn ghost" data-a="menu">'+t("toStories")+"</button>"+
        "</div>"+
      "</div>";
    document.body.appendChild(ov);
    ov.querySelector('[data-a="rewind"]').onclick = function(){ if(s.canRewind()) app.rewindLast(); };
    ov.querySelector('[data-a="restart"]').onclick = function(){ app.restart(); };
    ov.querySelector('[data-a="menu"]').onclick = function(){ app.showMenu(); };
    var first = ov.querySelector('[data-a="rewind"]');
    try{ first.focus({ preventScroll:true }); }catch(err){}
  };
})(globalThis.Amedi);
