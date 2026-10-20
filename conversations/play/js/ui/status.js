"use strict";
/* Липкий статус: обличчя, шкали Стіна/Контакт (для відкритих історій), дельти. */
(function(A){
  var D = A.ui.dom;
  var St = A.ui.status = {};
  var timers = {};

  St.build = function(def){
    var t = A.t, box = D.$("statusBox");
    box.className = "status " + (def.hidden ? "duo" : "solo");
    if(def.hidden){
      box.innerHTML = def.cast.map(function(c){
        return '<div class="pc"><div class="face" id="face-'+c.key+'">😐</div><div class="pcname">'+c.name+"</div></div>";
      }).join("");
    }else{
      var c = def.cast[0];
      box.innerHTML = '<div class="face" id="face-'+c.key+'">😐</div>'+
        '<div class="meters">'+
          '<div class="who">'+c.name+"</div>"+
          '<div class="meter"><label>'+t("wall")+'</label><div class="bar"><div class="fill wall" id="wallBar"></div></div><span class="delta" id="wallDelta"></span></div>'+
          '<div class="meter"><label>'+t("contact")+'</label><div class="bar"><div class="fill sea" id="seaBar"></div></div><span class="delta" id="seaDelta"></span></div>'+
        "</div>";
    }
  };

  function later(key, ms, fn){
    if(timers[key]) clearTimeout(timers[key]);
    timers[key] = setTimeout(function(){ timers[key] = null; fn(); }, ms);
  }

  function showDelta(id, v, kind){
    var el = D.$(id); if(!el) return;
    if(!v){ el.classList.remove("show"); el.textContent = ""; return; }
    el.textContent = (v>0?"+":"") + v;
    el.className = "delta show " + (v>0 ? ("up-"+kind) : ("down-"+kind));
    later(id, 2200, function(){ el.classList.remove("show"); });
  }

  // ev: {faces:{key:emoji}, wall, contact, dw, dc}
  St.update = function(def, ev){
    def.cast.forEach(function(c){
      var f = D.$("face-"+c.key); if(!f) return;
      var nf = ev.faces[c.key];
      if(f.textContent !== nf){
        f.textContent = nf;
        f.classList.add("bump");
        later("face-"+c.key, 260, function(){ f.classList.remove("bump"); });
      }
    });
    if(def.hidden) return;
    var wb = D.$("wallBar"), sb = D.$("seaBar");
    if(wb) wb.style.width = Math.max(0, Math.min(100, ev.wall)) + "%";
    if(sb) sb.style.width = Math.max(0, Math.min(100, ev.contact)) + "%";
    showDelta("wallDelta", ev.dw, "wall");
    showDelta("seaDelta", ev.dc, "sea");
  };
})(globalThis.Amedi);
