(function () {
  var TITLE = "The Reign Method|MB By Reign";

  function applyTitle() {
    if (document.title !== TITLE) {
      document.title = TITLE;
    }
  }

  applyTitle();
  document.addEventListener("DOMContentLoaded", applyTitle);
  window.addEventListener("load", applyTitle);
  window.addEventListener("pageshow", applyTitle);

  window.setTimeout(applyTitle, 500);
  window.setTimeout(applyTitle, 1500);
  window.setTimeout(applyTitle, 3000);

  var titleEl = document.querySelector("title");
  if (titleEl) {
    new MutationObserver(applyTitle).observe(titleEl, {
      childList: true,
      characterData: true,
      subtree: true,
    });
  }
})();
