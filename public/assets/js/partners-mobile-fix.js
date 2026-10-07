(function () {
  var MOBILE_MQ = window.matchMedia("(max-width: 809.98px)");

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
        img.loading = "lazy";
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
  }

  function restoreGallery(gallery) {
    delete gallery.dataset.partnersFixed;
    gallery.querySelectorAll(".partners-mobile-ticker").forEach(function (node) {
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

    if (gallery.dataset.partnersFixed === "true") return;

    buildTicker(gallery, urls);
    gallery.dataset.partnersFixed = "true";
  }

  function scheduleFix() {
    applyFix();
    window.setTimeout(applyFix, 400);
    window.setTimeout(applyFix, 1200);
    window.setTimeout(applyFix, 2500);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", scheduleFix);
  } else {
    scheduleFix();
  }

  window.addEventListener("load", scheduleFix, { once: true });
  MOBILE_MQ.addEventListener("change", applyFix);
})();
