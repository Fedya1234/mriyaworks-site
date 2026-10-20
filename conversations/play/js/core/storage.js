"use strict";
/* Безпечна обгортка над localStorage: приватні вікна / file:// / jsc не ламають гру. */
(function(A){
  function ls(){
    try{ return globalThis.localStorage || null; }catch(e){ return null; }
  }
  A.storage = {
    get:function(key){ try{ var s=ls(); return s ? s.getItem(key) : null; }catch(e){ return null; } },
    set:function(key,val){ try{ var s=ls(); if(s) s.setItem(key,String(val)); }catch(e){} },
    getJSON:function(key,fallback){
      try{ var raw=A.storage.get(key); return raw==null ? fallback : JSON.parse(raw); }catch(e){ return fallback; }
    },
    setJSON:function(key,val){ A.storage.set(key, JSON.stringify(val)); },
    // Прогрес фіналів: той самий формат і ті самі ключі (storageKey історії), що й у легасі
    endingsGot:function(key){
      var v=A.storage.getJSON(key,[]);
      return Array.isArray(v) ? v : [];
    },
    saveEnding:function(key,id){
      var got=A.storage.endingsGot(key);
      if(got.indexOf(id)<0){ got.push(id); A.storage.setJSON(key,got); }
      return got;
    }
  };
})(globalThis.Amedi);
