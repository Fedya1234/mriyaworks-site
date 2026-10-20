"use strict";
/* Єдиний глобальний простір імен гри. Завантажується першим (у браузері й у jsc). */
(function(G){
  var A = G.Amedi = G.Amedi || {};
  A.config = A.config || {};
  // Усі затримки ходу — тільки тут (мс). prefers-reduced-motion → 0 (див. js/ui/presenter.js).
  A.config.pacing = A.config.pacing || { npcReply:450, nextNode:350, act:350 };
  A.config.defaultLang = A.config.defaultLang || "en";
  A.config.sourceLang = A.config.sourceLang || "uk";
  A.config.storageKeys = A.config.storageKeys || { lang:"amedi_lang", hard:"amedi_hard" };
  A.i18n = A.i18n || {};
  A.stories = A.stories || {};
  A.engine = A.engine || {};
  A.ui = A.ui || {};
})(globalThis);
