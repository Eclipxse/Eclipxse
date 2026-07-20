(function () {
  "use strict";

  var root = document.documentElement;
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var finePointer = window.matchMedia("(pointer: fine)").matches;

  function init() {
    var gsap = window.gsap;
    var Lenis = window.Lenis;
    var lenis = null;
    var lenisFrame = 0;
    var pointerFrame = 0;
    var scrollFrame = 0;
    var revealObserver = null;

    root.classList.add("has-js");

    if (!reduceMotion && Lenis) {
      lenis = new Lenis({ lerp: 0.06, smoothWheel: true });

      function runLenis(time) {
        lenis.raf(time);
        lenisFrame = window.requestAnimationFrame(runLenis);
      }

      lenisFrame = window.requestAnimationFrame(runLenis);
    }

    if (!reduceMotion && gsap) {
      var titleWords = gsap.utils.toArray(".hero-word-inner");

      gsap.set(".site-nav", { opacity: 0, y: -20 });
      gsap.set(".hero-kicker", { opacity: 0, y: 18 });
      gsap.set(titleWords, { opacity: 0, yPercent: 112, filter: "blur(12px)" });
      gsap.set(".hero-footer", { opacity: 0, y: 28 });
      gsap.set(".hero-field", { opacity: 0, scale: 1.06 });

      gsap.timeline({ delay: 0.08 })
        .to(".hero-field", { opacity: 1, scale: 1, duration: 1.35, ease: "power3.out" }, 0)
        .to(".site-nav", { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" }, 0.08)
        .to(".hero-kicker", { opacity: 1, y: 0, duration: 0.65, ease: "power3.out" }, 0.24)
        .to(titleWords, {
          opacity: 1,
          yPercent: 0,
          filter: "blur(0px)",
          duration: 1,
          stagger: 0.1,
          ease: "power3.out"
        }, 0.3)
        .to(".hero-footer", { opacity: 1, y: 0, duration: 0.75, ease: "power3.out" }, 0.68);
    }

    var revealItems = Array.prototype.slice.call(document.querySelectorAll(".reveal"));

    if (reduceMotion || !("IntersectionObserver" in window)) {
      revealItems.forEach(function (item) { item.classList.add("is-visible"); });
    } else {
      root.classList.add("motion-ready");
      revealObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        });
      }, {
        rootMargin: "0px 0px -10% 0px",
        threshold: 0.06
      });

      revealItems.forEach(function (item) { revealObserver.observe(item); });
    }

    var progress = document.querySelector(".page-progress span");

    function updateProgress() {
      scrollFrame = 0;
      if (!progress) return;
      var range = document.documentElement.scrollHeight - window.innerHeight;
      var value = range > 0 ? window.scrollY / range : 0;
      progress.style.transform = "scaleX(" + Math.min(1, Math.max(0, value)).toFixed(4) + ")";
    }

    window.addEventListener("scroll", function () {
      if (!scrollFrame) scrollFrame = window.requestAnimationFrame(updateProgress);
    }, { passive: true });
    updateProgress();

    Array.prototype.slice.call(document.querySelectorAll('a[href^="#"]')).forEach(function (link) {
      link.addEventListener("click", function (event) {
        var selector = link.getAttribute("href");
        var target = selector ? document.querySelector(selector) : null;
        if (!target) return;

        event.preventDefault();
        if (lenis) {
          lenis.scrollTo(target, { duration: 1.1, offset: -18 });
        } else {
          target.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
        }
      });
    });

    if (!reduceMotion && finePointer) {
      var pointerX = window.innerWidth * 0.65;
      var pointerY = window.innerHeight * 0.24;
      var targetX = pointerX;
      var targetY = pointerY;

      function renderPointer() {
        pointerX += (targetX - pointerX) * 0.075;
        pointerY += (targetY - pointerY) * 0.075;
        root.style.setProperty("--pointer-x", pointerX.toFixed(1) + "px");
        root.style.setProperty("--pointer-y", pointerY.toFixed(1) + "px");
        pointerFrame = window.requestAnimationFrame(renderPointer);
      }

      window.addEventListener("pointermove", function (event) {
        targetX = event.clientX;
        targetY = event.clientY;
      }, { passive: true });

      pointerFrame = window.requestAnimationFrame(renderPointer);

      if (gsap) {
        Array.prototype.slice.call(document.querySelectorAll(".magnetic")).forEach(function (link) {
          link.addEventListener("pointermove", function (event) {
            var rect = link.getBoundingClientRect();
            gsap.to(link, {
              x: (event.clientX - rect.left - rect.width / 2) * 0.08,
              y: (event.clientY - rect.top - rect.height / 2) * 0.08,
              duration: 0.45,
              ease: "power3.out",
              overwrite: true
            });
          });

          link.addEventListener("pointerleave", function () {
            gsap.to(link, {
              x: 0,
              y: 0,
              duration: 0.65,
              ease: "power3.out",
              overwrite: true
            });
          });
        });
      }
    }

    window.addEventListener("pagehide", function () {
      if (lenis && typeof lenis.destroy === "function") lenis.destroy();
      if (revealObserver) revealObserver.disconnect();
      if (lenisFrame) window.cancelAnimationFrame(lenisFrame);
      if (pointerFrame) window.cancelAnimationFrame(pointerFrame);
      if (scrollFrame) window.cancelAnimationFrame(scrollFrame);
    }, { once: true });
  }

  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(init);
  } else {
    init();
  }
}());
