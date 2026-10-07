(function () {
  var MOBILE_MQ = window.matchMedia("(max-width: 809.98px)");
  var SCROLL_DURATION = 32000;
  var rafIds = new WeakMap();

  function getGallery() {
    return document.querySelector('.framer-cmem87[data-framer-name="Gallery"]');
  }

  function collectPartnerUrls(gallery) {
    var seen = {};
    var urls = [];

    gallery.querySelectorAll('img[src*="/assets/images/"]').forEach(function (img) {
      var src = (img.getAttribute("src") || img.src || "").split("?")[0];
      if (!src || seen[src]) return;
      seen[src] = true;
      urls.push(src);
    });

    return urls;
  }

  function stopJsScroll(track) {
    var id = rafIds.get(track);
    if (id) {
      cancelAnimationFrame(id);
      rafIds.delete(track);
    }
    track.classList.remove("is-js-scroll");
  }

  function startJsScroll(track, distance) {
    stopJsScroll(track);
    track.classList.add("is-js-scroll");

    var start = null;
    function step(ts) {
      if (!track.isConnected) {
        stopJsScroll(track);
        return;
      }
      if (!start) start = ts;
      var elapsed = (ts - start) % SCROLL_DURATION;
      var pos = (elapsed / SCROLL_DURATION) * distance;
      track.style.transform = "translate3d(" + -pos + "px,0,0)";
      rafIds.set(track, requestAnimationFrame(step));
    }

    rafIds.set(track, requestAnimationFrame(step));
  }

  function updateScrollDistance(track) {
    var halfWidth = track.scrollWidth / 2;
    if (!halfWidth) return false;

    track.style.setProperty("--partners-scroll-distance", "-" + halfWidth + "px");

    track.style.animation = "none";
    track.style.webkitAnimation = "none";
    void track.offsetWidth;
    track.style.removeProperty("animation");
    track.style.removeProperty("-webkit-animation");

    return true;
  }

  function waitForImages(track, callback) {
    var imgs = track.querySelectorAll("img");
    if (!imgs.length) {
      callback();
      return;
    }

    var pending = 0;
    imgs.forEach(function (img) {
      if (img.complete && img.naturalWidth) return;
      pending += 1;
      img.addEventListener(
        "load",
        function () {
          pending -= 1;
          if (pending <= 0) callback();
        },
        { once: true }
      );
      img.addEventListener(
        "error",
        function () {
          pending -= 1;
          if (pending <= 0) callback();
        },
        { once: true }
      );
    });

    if (pending === 0) callback();
  }

  function ensureAnimation(track) {
    waitForImages(track, function () {
      if (!updateScrollDistance(track)) return;

      var halfWidth = track.scrollWidth / 2;
      var initial = track.style.transform || "";
      window.setTimeout(function () {
        if (!track.isConnected) return;
        var computed = window.getComputedStyle(track);
        var animName = computed.animationName || computed.webkitAnimationName || "";
        var unchanged =
          track.style.transform === initial &&
          !track.classList.contains("is-js-scroll");

        if (
          unchanged ||
          animName === "none" ||
          /iPhone|iPad|iPod/.test(navigator.userAgent)
        ) {
          startJsScroll(track, halfWidth);
        }
      }, 1200);
    });
  }

  function buildTicker(gallery, urls) {
    gallery.querySelectorAll(".partners-mobile-ticker").forEach(function (node) {
      node.remove();
    });

    var ticker = document.createElement("div");
    ticker.className = "partners-mobile-ticker";
    ticker.setAttribute("aria-label", "Partenaires à Dubaï");

    var track = document.createElement("div");
    track.className = "partners-mobile-track";

    function appendItems(list) {
      list.forEach(function (url) {
        var item = document.createElement("div");
        item.className = "partners-mobile-item";

        var img = document.createElement("img");
        img.src = url + "?width=280&height=350";
        img.alt = "Partenaire à Dubaï";
        img.loading = "eager";
        img.decoding = "async";
        img.width = 280;
        img.height = 350;

        item.appendChild(img);
        track.appendChild(item);
      });
    }

    appendItems(urls);
    appendItems(urls);
    ticker.appendChild(track);
    gallery.appendChild(ticker);

    gallery.style.opacity = "1";
    gallery.style.transform = "none";
    ensureAnimation(track);
  }

  function restoreGallery(gallery) {
    delete gallery.dataset.partnersFixed;
    gallery.querySelectorAll(".partners-mobile-ticker").forEach(function (node) {
      node.querySelectorAll(".partners-mobile-track").forEach(stopJsScroll);
      node.remove();
    });

    var original = gallery.querySelector(".framer-w0jqcn-container");
    if (original) original.style.display = "";
  }

  function applyFix() {
    var gallery = getGallery();
    if (!gallery) return;

    if (!MOBILE_MQ.matches) {
      restoreGallery(gallery);
      return;
    }

    var urls = collectPartnerUrls(gallery);
    if (!urls.length) return;

    var original = gallery.querySelector(".framer-w0jqcn-container");
    if (original) original.style.display = "none";

    gallery.style.opacity = "1";
    gallery.style.transform = "none";

    if (gallery.dataset.partnersFixed === "true") {
      var track = gallery.querySelector(".partners-mobile-track");
      if (track) ensureAnimation(track);
      return;
    }

    buildTicker(gallery, urls);
    gallery.dataset.partnersFixed = "true";
  }

  function scheduleFix() {
    applyFix();
    window.setTimeout(applyFix, 400);
    window.setTimeout(applyFix, 1200);
    window.setTimeout(applyFix, 2500);
    window.setTimeout(applyFix, 5000);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", scheduleFix);
  } else {
    scheduleFix();
  }

  window.addEventListener("load", scheduleFix, { once: true });
  MOBILE_MQ.addEventListener("change", applyFix);
  window.addEventListener("pageshow", scheduleFix);
})();
