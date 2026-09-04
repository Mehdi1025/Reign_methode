(function () {
  "use strict";

  var MOBILE_MAX = 809.98;

  function isMobile() {
    return window.innerWidth <= MOBILE_MAX;
  }

  function getLanding() {
    return document.querySelector('#main [data-framer-name="Landing 05"]');
  }

  function getFlowBlocks(landing) {
    var blocks = [];

    for (var i = 0; i < landing.children.length; i++) {
      var child = landing.children[i];

      if (child.classList.contains("ssr-variant")) {
        for (var j = 0; j < child.children.length; j++) {
          blocks.push(child.children[j]);
        }
      } else {
        blocks.push(child);
      }
    }

    return blocks;
  }

  function resetInlineLayout(el) {
    el.style.removeProperty("height");
    el.style.removeProperty("min-height");
    el.style.removeProperty("max-height");
    el.style.removeProperty("top");
    el.style.removeProperty("left");
    el.style.removeProperty("transform");
  }

  function compactMobileLayout() {
    var landing = getLanding();
    if (!landing) return;

    if (!isMobile()) {
      landing.style.removeProperty("height");
      landing.style.removeProperty("min-height");
      return;
    }

    resetInlineLayout(landing);

    var blocks = getFlowBlocks(landing);
    var maxBottom = 0;

    for (var i = 0; i < blocks.length; i++) {
      resetInlineLayout(blocks[i]);
    }

    // Force reflow so flex layout settles before measuring.
    void landing.offsetHeight;

    for (var k = 0; k < blocks.length; k++) {
      var rect = blocks[k].getBoundingClientRect();
      if (rect.height < 4) continue;
      maxBottom = Math.max(maxBottom, rect.bottom + window.scrollY);
    }

    if (maxBottom > 0) {
      var pageHeight = Math.ceil(maxBottom + 24);
      landing.style.height = pageHeight + "px";
      landing.style.minHeight = pageHeight + "px";

      var root = document.querySelector("[data-framer-root]");
      if (root) {
        root.style.height = "auto";
        root.style.minHeight = pageHeight + "px";
      }
    }
  }

  function scheduleCompact() {
    compactMobileLayout();
    window.setTimeout(compactMobileLayout, 100);
    window.setTimeout(compactMobileLayout, 400);
    window.setTimeout(compactMobileLayout, 1000);
    window.setTimeout(compactMobileLayout, 2500);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", scheduleCompact);
  } else {
    scheduleCompact();
  }

  window.addEventListener("load", scheduleCompact);
  window.addEventListener("resize", compactMobileLayout);
  document.addEventListener("framer:pageview", scheduleCompact);

  if ("ResizeObserver" in window) {
    var observer = new ResizeObserver(function () {
      if (isMobile()) compactMobileLayout();
    });

    function observeLanding() {
      var landing = getLanding();
      if (landing) observer.observe(landing);
    }

    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", observeLanding);
    } else {
      observeLanding();
    }
  }
})();
