(function () {
  var MOBILE_MAX = 809.98;
  var TARGET_TOP = 8;

  function fixMobileLayout() {
    if (window.innerWidth > MOBILE_MAX) {
      document.documentElement.style.removeProperty("--mobile-layout-offset");
      return;
    }

    var nav = document.querySelector("#main .framer-vrf80x-container");
    if (!nav) return;

    var currentOffset =
      parseFloat(
        getComputedStyle(document.documentElement).getPropertyValue(
          "--mobile-layout-offset",
        ),
      ) || 782;

    var navTop = nav.getBoundingClientRect().top;

    if (navTop < -5) {
      currentOffset = Math.ceil(currentOffset + Math.abs(navTop));
    } else if (navTop > TARGET_TOP + 2) {
      currentOffset = Math.max(0, Math.round(currentOffset - (navTop - TARGET_TOP)));
    }

    document.documentElement.style.setProperty(
      "--mobile-layout-offset",
      currentOffset + "px",
    );
  }

  function runFixLoop() {
    fixMobileLayout();
    window.setTimeout(fixMobileLayout, 300);
    window.setTimeout(fixMobileLayout, 900);
    window.setTimeout(fixMobileLayout, 1800);
    window.setTimeout(fixMobileLayout, 3500);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", runFixLoop);
  } else {
    runFixLoop();
  }

  window.addEventListener("resize", fixMobileLayout);
  window.addEventListener("load", runFixLoop);
  document.addEventListener("framer:pageview", fixMobileLayout);
})();
