"use strict";
/* Ліниве завантаження історій через <script> (працює й з file://, без fetch і ES-модулів). */
(function(A){
  var L = A.loader = {};
  var cache = {};          // src -> Promise
  var langs = {};          // lang -> Promise
  L.base = L.base || "";   // префікс шляху (для тестів)
  L.timeoutMs = 20000;

  L.loadScript = function(src){
    if(cache[src]) return cache[src];
    var p = new Promise(function(resolve, reject){
      var doc = globalThis.document;
      if(!doc){ reject(new Error("no document: "+src)); return; }
      var s = doc.createElement("script");
      var done = false;
      var timer = setTimeout(function(){ finish(new Error("timeout: "+src)); }, L.timeoutMs);
      function finish(err){
        if(done) return; done = true; clearTimeout(timer);
        if(err){ delete cache[src]; if(s.parentNode) s.parentNode.removeChild(s); reject(err); }
        else resolve(src);
      }
      s.src = L.base + src;
      s.async = false;
      s.onload = function(){ finish(null); };
      s.onerror = function(){ finish(new Error("failed: "+src)); };
      doc.head.appendChild(s);
    });
    cache[src] = p;
    return p;
  };

  // Словники мов із A.config.languages, яких ще немає (index.html підключає відомі статично;
  // нова мова запрацює і без правки index.html). Резолвиться завжди.
  L.ensureLocales = function(){
    var jobs = (A.config.languages || []).map(function(l){
      if(A.i18n.dicts[l.code]) return Promise.resolve(true);
      return L.loadScript("locales/"+l.code+".js").then(function(){ return true; }, function(){ return false; });
    });
    return Promise.all(jobs);
  };

  // Паралельно вантажить stories/<id>/<lang>.js для кожного id з маніфесту.
  // Якщо файл мови не завантажився — пробує stories/<id>/<sourceLang>.js (stories.get зробить фолбек).
  // Резолвиться завжди; повертає {ok:boolean, failed:[ids]}. ok=false лише якщо не вийшло взагалі нічого.
  L.ensureLang = function(lang){
    if(langs[lang]) return langs[lang];
    var src = A.config.sourceLang;
    var ids = A.stories.manifest || [];
    var jobs = ids.map(function(id){
      if(A.stories.registry[lang] && A.stories.registry[lang][id]) return Promise.resolve(true);
      return L.loadScript("stories/"+id+"/"+lang+".js").then(function(){ return true; }, function(){
        if(lang===src) return false;
        if(A.stories.registry[src] && A.stories.registry[src][id]) return true;
        return L.loadScript("stories/"+id+"/"+src+".js").then(function(){ return true; }, function(){ return false; });
      });
    });
    var p = Promise.all(jobs).then(function(res){
      var failed = ids.filter(function(id,i){ return !res[i]; });
      if(failed.length) delete langs[lang];   // наступна спроба перезавантажить відсутні
      return { ok: ids.length>0 && failed.length<ids.length, failed: failed };
    });
    langs[lang] = p;
    return p;
  };
})(globalThis.Amedi);
