(function () {
  'use strict';

  var pathEl = document.getElementById('requested-path');
  if (pathEl) pathEl.textContent = window.location.pathname;

  requestAnimationFrame(function () {
    requestAnimationFrame(function () { document.body.classList.add('is-ready'); });
  });

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var finePointer = window.matchMedia('(pointer: fine)').matches;
  if (reduceMotion || !finePointer) return;

  var targetX = 0;
  var targetY = 0;
  var currentX = 0;
  var currentY = 0;

  window.addEventListener('pointermove', function (event) {
    targetX = (event.clientX / window.innerWidth - 0.5) * 2;
    targetY = (event.clientY / window.innerHeight - 0.5) * 2;
  }, { passive: true });

  function renderParallax() {
    currentX += (targetX - currentX) * 0.06;
    currentY += (targetY - currentY) * 0.06;
    document.documentElement.style.setProperty('--mx', currentX.toFixed(3));
    document.documentElement.style.setProperty('--my', currentY.toFixed(3));
    requestAnimationFrame(renderParallax);
  }
  requestAnimationFrame(renderParallax);

  document.querySelectorAll('.magnetic').forEach(function (element) {
    element.addEventListener('pointermove', function (event) {
      var rect = element.getBoundingClientRect();
      var x = (event.clientX - rect.left - rect.width / 2) * 0.12;
      var y = (event.clientY - rect.top - rect.height / 2) * 0.12;
      element.style.transform = 'translate3d(' + x.toFixed(1) + 'px,' + y.toFixed(1) + 'px,0)';
    });
    element.addEventListener('pointerleave', function () {
      element.style.transform = '';
    });
  });
}());
