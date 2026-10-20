"use strict";
/* Чисті правила гри без DOM: обличчя, межі шкал, провал, перемішування варіантів. */
(function(A){
  var E = A.engine;

  E.clamp = function(v){ return Math.max(0, Math.min(100, v)); };

  // Поле історії може бути значенням або функцією від стану
  E.val = function(v, state){ return typeof v === "function" ? v(state) : v; };

  E.deepCopy = function(o){ return JSON.parse(JSON.stringify(o)); };

  E.firstKey = function(def){ return def.cast[0].key; };

  // Історії з однією дійовою особою читають стан як s.wall — тримаємо дзеркало синхронним
  E.sync = function(def, state){ state.wall = state.w[E.firstKey(def)]; };

  E.LEGACY_FACES = function(s){
    if(s.wall>=75) return "😤";
    if(s.wall>=58) return "😒";
    if(s.contact>=70) return "🥹";
    if(s.contact>=45) return "🙂";
    if(s.wall>=42) return "😔";
    return "😐";
  };

  E.faceFor = function(c, state){
    if(c.legacy) return E.LEGACY_FACES({ wall:state.w[c.key], contact:state.contact });
    var v = state.w[c.key], faces = c.faces || [];
    for(var i=0;i<faces.length;i++){ if(v>=faces[i][0]) return faces[i][1]; }
    return "😐";
  };

  E.faces = function(def, state){
    var out = {};
    def.cast.forEach(function(c){ out[c.key] = E.faceFor(c, state); });
    return out;
  };

  E.failCheck = function(def, state){
    if(def.checkFail) return def.checkFail(state);
    if(state.aggro>=2) return "fight";
    if(state.w[E.firstKey(def)]>=85) return "wall";
    return null;
  };

  // Порядок варіантів перемішується один раз на вузол (Фішер–Єйтс, як у легасі) і живе в state.ord,
  // тож відмотка до знімка зберігає порядок уже показаного вузла.
  E.orderFor = function(state, key, n, rng){
    state.ord = state.ord || {};
    if(!state.ord[key]){
      var a = [];
      for(var k=0;k<n;k++) a.push(k);
      for(var i=a.length-1;i>0;i--){ var j=Math.floor(rng()*(i+1)); var tmp=a[i]; a[i]=a[j]; a[j]=tmp; }
      state.ord[key] = a;
    }
    return state.ord[key];
  };

  // Детермінований генератор для тестів (mulberry32)
  E.seededRng = function(seed){
    var s = seed >>> 0;
    return function(){
      s = (s + 0x6D2B79F5) >>> 0;
      var t = s;
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  };
})(globalThis.Amedi);
