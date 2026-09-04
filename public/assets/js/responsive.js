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
    el.style.removeProperty("width");
    el.style.removeProperty("max-width");
  }

  function fixNestedHeadingTypography() {
    if (!isMobile()) return;

    var main = document.getElementById("main");
    if (!main) return;

    var headings = main.querySelectorAll("h1.framer-text, h2.framer-text, h3.framer-text");
    for (var i = 0; i < headings.length; i++) {
      var heading = headings[i];
      var size = window.getComputedStyle(heading).fontSize;
      var nested = heading.querySelectorAll("span, em, .framer-text");
      for (var j = 0; j < nested.length; j++) {
        nested[j].style.setProperty("font-size", size, "important");
        nested[j].style.setProperty("line-height", "inherit", "important");
        nested[j].style.setProperty("max-width", "100%", "important");
      }
    }
  }

  function fixOverflowElements() {
    if (!isMobile()) return;

    var vw = window.innerWidth;
    var main = document.getElementById("main");
    if (!main) return;

    var all = main.querySelectorAll("*");
    for (var i = 0; i < all.length; i++) {
      var el = all[i];
      if (el.closest("nav.framer-s9oXE")) continue;
      if (el.classList.contains("framer-vrf80x-container")) continue;

      var rect = el.getBoundingClientRect();
      if (rect.width < 20) continue;
      if (rect.right <= vw + 1) continue;

      var tag = el.tagName;
      if (tag === "SCRIPT" || tag === "STYLE" || tag === "LINK") continue;

      el.style.setProperty("max-width", "100%", "important");
      if (rect.width > vw - 1) {
        el.style.setProperty("width", "100%", "important");
        el.style.setProperty("min-width", "0", "important");
      }
      el.style.setProperty("box-sizing", "border-box", "important");

      if (getComputedStyle(el).position === "absolute") {
        el.style.setProperty("position", "relative", "important");
        el.style.setProperty("top", "auto", "important");
        el.style.setProperty("left", "auto", "important");
      }
    }
  }

  function compactMobileLayout() {
    var landing = getLanding();
    if (!landing) return;

    if (!isMobile()) {
      resetInlineLayout(landing);
      var root = document.querySelector("[data-framer-root]");
      if (root) resetInlineLayout(root);
      return;
    }

    resetInlineLayout(landing);

    var blocks = getFlowBlocks(landing);
    for (var i = 0; i < blocks.length; i++) {
      resetInlineLayout(blocks[i]);
    }

    fixNestedHeadingTypography();
    fixOverflowElements();

    void landing.offsetHeight;

    var maxBottom = 0;
    for (var k = 0; k < blocks.length; k++) {
      var rect = blocks[k].getBoundingClientRect();
      if (rect.height < 4) continue;
      maxBottom = Math.max(maxBottom, rect.bottom + window.scrollY);
    }

    if (maxBottom > 0) {
      var pageHeight = Math.ceil(maxBottom + 24);
      landing.style.height = pageHeight + "px";
      landing.style.minHeight = pageHeight + "px";
    }
  }

  function scheduleCompact() {
    compactMobileLayout();
    window.setTimeout(compactMobileLayout, 150);
    window.setTimeout(compactMobileLayout, 600);
    window.setTimeout(compactMobileLayout, 1500);
    window.setTimeout(compactMobileLayout, 3000);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", scheduleCompact);
  } else {
    scheduleCompact();
  }

  window.addEventListener("load", scheduleCompact);
  window.addEventListener("resize", compactMobileLayout);
  document.addEventListener("framer:pageview", scheduleCompact);
})();
