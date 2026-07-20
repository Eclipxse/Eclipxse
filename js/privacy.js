(function () {
  "use strict";

  var root = document.documentElement;
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  root.classList.add("has-js");

  function init() {
    var gsap = window.gsap;
    var ScrollTrigger = window.ScrollTrigger;
    var Lenis = window.Lenis;

    if (!gsap || !ScrollTrigger) return;

    gsap.registerPlugin(ScrollTrigger);

    var field = document.querySelector(".motion-field");
    var progress = document.querySelector(".page-progress span");
    var titleWords = gsap.utils.toArray(".title-word-inner");
    var introLabels = document.querySelector(".intro-labels");
    var introSummary = document.querySelector(".intro-summary");
    var topbar = document.querySelector(".topbar");
    var sections = gsap.utils.toArray(".policy-section");
    var navLinks = gsap.utils.toArray('.contents nav a[href^="#"]');
    var lenis = null;

    if (!reduceMotion && Lenis) {
      lenis = new Lenis({ lerp: 0.06, smoothWheel: true });
      lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add(function (time) {
        lenis.raf(time * 1000);
      });
      gsap.ticker.lagSmoothing(0);
    }

    if (!reduceMotion) {
      gsap.set(topbar, { opacity: 0, y: -18 });
      gsap.set(introLabels, { opacity: 0, y: 18 });
      gsap.set(titleWords, { opacity: 0, yPercent: 112, filter: "blur(12px)" });
      gsap.set(introSummary, { opacity: 0, y: 42, filter: "blur(8px)" });
      gsap.set(field, { opacity: 0, scale: 1.08 });

      gsap.timeline({ delay: 0.08 })
        .to(field, { opacity: 1, scale: 1, duration: 1.25, ease: "power3.out" }, 0)
        .to(topbar, { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" }, 0.12)
        .to(introLabels, { opacity: 1, y: 0, duration: 0.65, ease: "power3.out" }, 0.28)
        .to(titleWords, {
          opacity: 1,
          yPercent: 0,
          filter: "blur(0px)",
          duration: 0.95,
          ease: "power3.out",
          stagger: 0.1
        }, 0.34)
        .to(introSummary, {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.9,
          ease: "power3.out"
        }, 0.62);

      gsap.to(".intro h1", {
        yPercent: -12,
        ease: "none",
        scrollTrigger: {
          trigger: ".intro",
          start: "top top",
          end: "bottom top",
          scrub: 0.55
        }
      });

      gsap.to(".motion-blob-red", {
        yPercent: 26,
        xPercent: -8,
        scale: 1.13,
        ease: "none",
        scrollTrigger: {
          trigger: ".intro",
          start: "top top",
          end: "bottom top",
          scrub: 0.7
        }
      });

      gsap.to(".motion-blob-cyan", {
        yPercent: -20,
        xPercent: 18,
        ease: "none",
        scrollTrigger: {
          trigger: ".intro",
          start: "top top",
          end: "bottom top",
          scrub: 0.9
        }
      });

      sections.forEach(function (section) {
        var number = section.querySelector(".section-number");
        var content = section.querySelector(".section-content");
        var rows = section.querySelectorAll(".data-list > div, .provider-list > div, .retention-list > div");

        gsap.fromTo([number, content],
          { opacity: 0.16, y: 72, filter: "blur(10px)" },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            ease: "none",
            stagger: 0.08,
            scrollTrigger: {
              trigger: section,
              start: "top 88%",
              end: "top 48%",
              scrub: 0.65
            }
          }
        );

        if (rows.length) {
          gsap.fromTo(rows,
            { opacity: 0, x: 28 },
            {
              opacity: 1,
              x: 0,
              duration: 0.65,
              ease: "power3.out",
              stagger: 0.055,
              scrollTrigger: {
                trigger: rows[0],
                start: "top 86%",
                toggleActions: "play none none reverse"
              }
            }
          );
        }
      });

      gsap.fromTo("footer > *",
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.08,
          scrollTrigger: {
            trigger: "footer",
            start: "top 92%"
          }
        }
      );
    }

    function activateSection(id) {
      navLinks.forEach(function (link) {
        link.classList.toggle("is-active", link.getAttribute("href") === "#" + id);
      });
      sections.forEach(function (section) {
        section.classList.toggle("is-active", section.id === id);
      });
    }

    sections.forEach(function (section) {
      ScrollTrigger.create({
        trigger: section,
        start: "top 58%",
        end: "bottom 42%",
        onEnter: function () { activateSection(section.id); },
        onEnterBack: function () { activateSection(section.id); }
      });
    });

    if (progress) {
      ScrollTrigger.create({
        start: 0,
        end: "max",
        onUpdate: function (self) {
          progress.style.transform = "scaleX(" + self.progress.toFixed(4) + ")";
        }
      });
    }

    navLinks.concat(gsap.utils.toArray('footer a[href^="#"]')).forEach(function (link) {
      link.addEventListener("click", function (event) {
        var selector = link.getAttribute("href");
        var target = selector ? document.querySelector(selector) : null;
        if (!target) return;

        event.preventDefault();
        if (lenis) {
          lenis.scrollTo(target, { duration: 1.2, offset: -20 });
        } else {
          target.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
        }
      });
    });

    if (!reduceMotion && window.matchMedia("(pointer: fine)").matches) {
      var pointerX = window.innerWidth * 0.72;
      var pointerY = window.innerHeight * 0.2;
      var targetX = pointerX;
      var targetY = pointerY;
      var pointerFrame = 0;

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

      gsap.utils.toArray(".topbar a, .contents nav a, .contact-link").forEach(function (link) {
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
          gsap.to(link, { x: 0, y: 0, duration: 0.65, ease: "power3.out", overwrite: true });
        });
      });

      window.addEventListener("pagehide", function () {
        window.cancelAnimationFrame(pointerFrame);
      }, { once: true });
    }

    window.addEventListener("pagehide", function () {
      if (lenis && typeof lenis.destroy === "function") lenis.destroy();
    }, { once: true });

    window.addEventListener("load", function () {
      ScrollTrigger.refresh();
    }, { once: true });
  }

  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(init);
  } else {
    init();
  }
}());
