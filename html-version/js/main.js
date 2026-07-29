/* Tudobom — interações da versão HTML/PHP */
(function () {
  "use strict";

  /* ---------- Menu mobile ---------- */
  var drawer = document.getElementById("drawer");

  function openDrawer() {
    if (drawer) drawer.classList.add("is-open");
  }
  function closeDrawer() {
    if (drawer) drawer.classList.remove("is-open");
  }

  document.querySelectorAll("[data-open-drawer]").forEach(function (el) {
    el.addEventListener("click", openDrawer);
  });
  document.querySelectorAll("[data-close-drawer]").forEach(function (el) {
    el.addEventListener("click", closeDrawer);
  });

  /* ---------- Modal (Portal da Transparência) ---------- */
  document.querySelectorAll("[data-open-modal]").forEach(function (el) {
    el.addEventListener("click", function () {
      var modal = document.getElementById(el.getAttribute("data-open-modal"));
      if (modal) modal.classList.add("is-open");
    });
  });

  document.querySelectorAll("[data-close-modal]").forEach(function (el) {
    el.addEventListener("click", function () {
      var modal = el.closest(".modal");
      if (modal) modal.classList.remove("is-open");
    });
  });

  document.addEventListener("keydown", function (ev) {
    if (ev.key !== "Escape") return;
    closeDrawer();
    document.querySelectorAll(".modal.is-open").forEach(function (m) {
      m.classList.remove("is-open");
    });
  });

  /* ---------- Carrossel do Hero ---------- */
  document.querySelectorAll("[data-carousel]").forEach(function (root) {
    var track = root.querySelector("[data-carousel-track]");
    var slides = Array.prototype.slice.call(root.querySelectorAll(".carousel__slide"));
    var dotsWrap = root.querySelector("[data-carousel-dots]");
    var prev = root.querySelector("[data-carousel-prev]");
    var next = root.querySelector("[data-carousel-next]");
    if (!track || slides.length === 0) return;

    var index = 0;
    var timer = null;
    var dots = [];

    slides.forEach(function (_, i) {
      var dot = document.createElement("button");
      dot.type = "button";
      dot.className = "carousel__dot";
      dot.setAttribute("aria-label", "Ir para o slide " + (i + 1));
      dot.addEventListener("click", function () {
        goTo(i);
        restart();
      });
      dotsWrap.appendChild(dot);
      dots.push(dot);
    });

    function syncMobileHeight() {
      // No mobile o slide acompanha a altura real da imagem (sem cortes).
      if (window.innerWidth >= 640) {
        track.style.height = "";
        return;
      }
      var img = slides[index].querySelector("img");
      if (img && img.getBoundingClientRect().height) {
        track.style.height = Math.ceil(img.getBoundingClientRect().height) + "px";
      }
    }

    function goTo(i) {
      index = (i + slides.length) % slides.length;
      track.style.transform = "translateX(" + -index * 100 + "%)";
      dots.forEach(function (d, di) {
        d.classList.toggle("is-active", di === index);
      });
      requestAnimationFrame(syncMobileHeight);
    }

    function restart() {
      if (timer) clearInterval(timer);
      timer = setInterval(function () {
        goTo(index + 1);
      }, 6000);
    }

    if (prev) prev.addEventListener("click", function () { goTo(index - 1); restart(); });
    if (next) next.addEventListener("click", function () { goTo(index + 1); restart(); });

    // Swipe no celular
    var startX = null;
    track.addEventListener("touchstart", function (ev) { startX = ev.touches[0].clientX; }, { passive: true });
    track.addEventListener("touchend", function (ev) {
      if (startX === null) return;
      var delta = ev.changedTouches[0].clientX - startX;
      if (Math.abs(delta) > 40) { goTo(delta < 0 ? index + 1 : index - 1); restart(); }
      startX = null;
    });

    root.querySelectorAll("img").forEach(function (img) {
      img.addEventListener("load", syncMobileHeight);
    });
    window.addEventListener("resize", syncMobileHeight);

    goTo(0);
    restart();
  });
})();
