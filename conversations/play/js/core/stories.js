"use strict";
/* Реєстр історій: A.stories.register(lang,id,def) викликають файли stories/<id>/<lang>.js. */
(function(A){
  var S = A.stories;
  S.registry = S.registry || {};
  S.manifest = S.manifest || [];
  S.DEFAULT_END_ORDER = ["contact","truce","wall","fight"];

  // Те саме, що легасі normalizePack: історія без cast має одного «легасі»-персонажа з ключем "a"
  S.normalize = function(def){
    if(!def.cast) def.cast = [{ key:"a", name:def.who, legacy:true }];
    if(!def.endOrder) def.endOrder = S.DEFAULT_END_ORDER;
    return def;
  };

  S.register = function(lang, id, def){
    S.registry[lang] = S.registry[lang] || {};
    def.id = id;
    def.lang = lang;
    S.registry[lang][id] = S.normalize(def);
    return def;
  };

  // Якщо перекладу немає — фолбек на мову-джерело
  S.get = function(lang, id){
    var r = S.registry[lang], src = S.registry[A.config.sourceLang];
    return (r && r[id]) || (src && src[id]) || null;
  };

  // Порядок меню — з маніфесту; відсутні історії пропускаються
  S.list = function(lang){
    var out = [];
    S.manifest.forEach(function(id){
      var def = S.get(lang, id);
      if(def) out.push(def);
    });
    return out;
  };
})(globalThis.Amedi);
