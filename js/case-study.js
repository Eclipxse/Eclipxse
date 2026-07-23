(function () {
  'use strict';

  var body = document.body;
  var progress = document.getElementById('scroll-progress');
  var header = document.getElementById('case-header');
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var parallaxImages = [].slice.call(document.querySelectorAll('[data-parallax]'));
  var ticking = false;

  requestAnimationFrame(function () {
    requestAnimationFrame(function () {
      body.classList.add('is-ready');
    });
  });

  function updatePageMotion() {
    var max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    var ratio = Math.min(1, Math.max(0, window.scrollY / max));
    if (progress) progress.style.transform = 'scaleX(' + ratio.toFixed(4) + ')';
    if (header) header.classList.toggle('is-scrolled', window.scrollY > 24);

    if (!reduceMotion) {
      parallaxImages.forEach(function (image) {
        var rect = image.parentElement.getBoundingClientRect();
        if (rect.bottom < -120 || rect.top > window.innerHeight + 120) return;
        var centerDelta = (rect.top + rect.height / 2 - window.innerHeight / 2) / window.innerHeight;
        var offset = Math.max(-18, Math.min(18, centerDelta * -22));
        image.style.transform = 'translate3d(0,' + offset.toFixed(2) + 'px,0) scale(1.045)';
      });
    }

    ticking = false;
  }

  function requestPageMotion() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(updatePageMotion);
  }

  if ('IntersectionObserver' in window && !reduceMotion) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -12% 0px', threshold: 0.08 });

    document.querySelectorAll('.reveal').forEach(function (element) {
      observer.observe(element);
    });
  } else {
    document.querySelectorAll('.reveal').forEach(function (element) {
      element.classList.add('is-visible');
    });
  }

  window.addEventListener('scroll', requestPageMotion, { passive: true });
  window.addEventListener('resize', requestPageMotion, { passive: true });
  window.addEventListener('pageshow', function () {
    body.classList.add('is-ready');
    requestPageMotion();
  });

  updatePageMotion();
}());
