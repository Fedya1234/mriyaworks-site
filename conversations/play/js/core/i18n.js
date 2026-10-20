"use strict";
/* Рядки інтерфейсу. Словники реєструють файли locales/<code>.js. */
(function(A){
  var I = A.i18n;
  I.dicts = I.dicts || {};
  I.lang = I.lang || A.config.defaultLang;

  I.register = function(code, dict){
    I.dicts[code] = Object.assign(I.dicts[code] || {}, dict);
  };
  I.has = function(code){
    var ls = A.config.languages;
    if(ls && ls.length) return ls.some(function(l){ return l.code===code; });
    return !!I.dicts[code];
  };
  I.setLang = function(code){
    if(I.has(code)) I.lang = code;
    return I.lang;
  };
  // Фолбек: активна мова → мова-джерело (uk) → сам ключ
  I.t = function(key){
    var d = I.dicts[I.lang], src = I.dicts[A.config.sourceLang];
    if(d && d[key] != null) return d[key];
    if(src && src[key] != null) return src[key];
    return key;
  };
  A.t = I.t;
})(globalThis.Amedi);
