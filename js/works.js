    

    var isEn = window.__I18N_LANG === 'en';

    var PROJECTS = [
      {
        id: 'cyberdiag',
        title: 'GamerTheorys',
        desc: isEn ? "A full-stack gaming product bringing esports, studio services, hosting and creator workflows into one focused platform." : "A full-stack gaming product bringing esports, studio services, hosting and creator workflows into one focused platform.",
        category: 'Full-stack Platform',
        year: '2026',
        tags: ['Full-stack', 'Gaming', 'Platform'],
        cover: '../assets/images/projects/EclipxseCovers/gamertheorys-polished.webp',
        links: [{ label: 'Case study', url: '/works/gamertheorys/' }]
      },
      {
        id: 'anima',
        title: 'Eclipxse.in',
        desc: isEn ? "An earlier Nuxt portfolio that turned my work into a game-like, exploratory web experience." : "An earlier Nuxt portfolio that turned my work into a game-like, exploratory web experience.",
        category: 'Interactive Portfolio',
        year: '2025',
        tags: ['Vue', 'Nuxt', 'TypeScript'],
        cover: '../assets/images/projects/EclipxseCovers/eclipxse-in-polished.webp',
        links: [
          { label: 'Case study', url: '/works/eclipxse-in/' },
          { label: 'Source', url: 'https://github.com/Eclipxse/Eclifolio' }
        ]
      },
      {
        id: 'cyberdiag-app',
        title: 'Lizziee',
        desc: isEn ? "An expressive React portfolio built from custom illustration, pastel surfaces and deliberately paced scrolling." : "An expressive React portfolio built from custom illustration, pastel surfaces and deliberately paced scrolling.",
        category: 'Creative Portfolio',
        year: '2026',
        tags: ['React', 'Vite', 'GSAP'],
        cover: '../assets/images/projects/EclipxseCovers/lizziee-polished.webp',
        links: [
          { label: 'Case study', url: '/works/lizziee/' },
          { label: 'Source', url: 'https://github.com/Eclipxse/Lizzie' }
        ]
      },
      {
        id: 'godot-farming',
        title: 'Godot Farming Prototype',
        desc: isEn ? "A 2D farming-game prototype built around layered TileMaps, reusable scenes, player movement and repeatable interactions." : "A 2D farming-game prototype built around layered TileMaps, reusable scenes, player movement and repeatable interactions.",
        category: 'Game Prototype',
        year: '2026',
        tags: ['Godot 4', 'GDScript', '2D Game'],
        cover: '../assets/images/projects/EclipxseCovers/godot-farming-real.webp',
        links: [{ label: 'Case study', url: '/works/godot-farming/' }]
      },
      {
        id: 'blunt38',
        title: 'blunt38',
        desc: isEn ? "A UI-first Discord platform with 26 command groups, moderation, AI, music, community systems, a Next.js dashboard and real-time Draw Party." : "A UI-first Discord platform with 26 command groups, moderation, AI, music, community systems, a Next.js dashboard and real-time Draw Party.",
        category: 'Discord Platform',
        year: '2026',
        tags: ['TypeScript', 'Discord.js', 'Next.js'],
        cover: '../assets/images/projects/EclipxseCovers/blunt38.webp',
        links: [
          { label: 'Case study', url: '/works/blunt38/' },
          { label: 'Source', url: 'https://github.com/Eclipxse/Blunt38' },
          { label: 'Privacy', url: '/privacy/' }
        ]
      },
      {
        id: 'game-research',
        title: 'Game Reverse Engineering',
        desc: isEn ? "A hands-on reverse-engineering study of a live game process using Cheat Engine to scan memory, trace changing values and understand runtime behavior." : "A hands-on reverse-engineering study of a live game process using Cheat Engine to scan memory, trace changing values and understand runtime behavior.",
        category: 'Technical Research',
        year: '2026',
        tags: ['Reverse Engineering', 'Cheat Engine', 'Debugging'],
        cover: '../assets/images/projects/EclipxseCovers/game-re-it-takes-two.webp',
        links: [{ label: 'Case study', url: '/works/game-research/' }]
      },
      {
        id: 'marishoku-os',
        title: 'MARISHOKU/OS',
        desc: isEn ? "An experimental Debian 13 and Plasma 6 remix with custom profiles, desktop tooling, package builds and a reproducible hybrid ISO pipeline." : "An experimental Debian 13 and Plasma 6 remix with custom profiles, desktop tooling, package builds and a reproducible hybrid ISO pipeline.",
        category: 'Debian Remix',
        year: 'V1.3',
        tags: ['Debian 13', 'KDE Plasma 6', 'Linux'],
        cover: '../assets/images/projects/EclipxseCovers/marishoku-os.webp',
        links: [
          { label: 'Case study', url: '/works/marishoku-os/' },
          { label: 'Source', url: 'https://github.com/Eclipxse/Eclipxse_OS' }
        ]
      },
      {
        id: 'eclipxse-beam',
        title: 'Eclipxse Beam',
        desc: isEn ? "A Rust desktop app and web companion for encrypted peer-to-peer file transfer with QR pairing and no account requirement." : "A Rust desktop app and web companion for encrypted peer-to-peer file transfer with QR pairing and no account requirement.",
        category: 'Native + Web App',
        year: '2026',
        tags: ['Rust', 'Slint', 'WebRTC'],
        cover: '../assets/images/projects/EclipxseCovers/eclipxse-beam.webp',
        links: [
          { label: 'Case study', url: '/works/eclipxse-beam/' },
          { label: 'Live app', url: 'https://eclipxse.github.io/Eclipxse_beam/' },
          { label: 'Source', url: 'https://github.com/Eclipxse/Eclipxse_beam' },
          { label: 'Download', url: 'https://github.com/Eclipxse/Eclipxse_beam/releases/latest/download/Eclipxse-Beam-Native-Windows-x64.exe' }
        ]
      }
    ];

    var TOTAL = PROJECTS.length;
    var cube = document.getElementById('cube');
    var faces = document.querySelectorAll('.cube-face');


    
    var BASE_ANGLES = [0, -90, -180, 90];
    var halfH = 0;

    function frontFace(r) {
      return (4 - (((r % 4) + 4) % 4)) % 4;
    }
    function wrapProject(r) {
      return ((r % TOTAL) + TOTAL) % TOTAL;
    }

    function measureCube() {
      var vp = document.getElementById('cube-viewport');
      halfH = vp.offsetHeight / 2;
      for (var i = 0; i < 4; i++) {
        faces[i].style.transform = 'rotateX(' + BASE_ANGLES[i] + 'deg) translateZ(' + halfH + 'px)';
      }
      setCubeAngle(displayAngle);
      layoutRulers();
    }

    function setCubeAngle(deg) {
      cube.style.transform = 'translateZ(' + (-halfH) + 'px) rotateX(' + deg + 'deg)';
    }


    
    var faceOwner = [-1, -1, -1, -1];

    function populateFace(fIdx, pIdx) {
      if (faceOwner[fIdx] === pIdx) return;
      faceOwner[fIdx] = pIdx;
      var proj = PROJECTS[pIdx];
      var isLeft = pIdx % 2 === 0;
      faces[fIdx].innerHTML =
        '<div class="face-content ' + (isLeft ? 'layout-left' : 'layout-right') + '">' +
          '<div class="face-cover">' +
            '<div class="face-name">' + proj.title + '</div>' +
            '<img src="' + proj.cover + '" alt="' + proj.title + '" decoding="async">' +
          '</div>' +
          '<div class="face-info">' +
            '<div class="face-info-bg"><img src="' + proj.cover + '" alt="" decoding="async"></div>' +
            '<div class="face-info-content">' +
              '<div class="face-category">' + proj.category + '</div>' +
              '<div class="face-year">' + proj.year + '</div>' +
              '<div class="face-desc">' + proj.desc + '</div>' +
              '<div class="face-tags">' + proj.tags.map(function(t) { return '<span class="face-tag">' + t + '</span>'; }).join('') + '</div>' +
              '<div class="face-links">' + (proj.links || []).map(function(link) {
                var externalAttrs = link.url.charAt(0) === '/' ? '' : ' target="_blank" rel="noopener noreferrer"';
                return '<a class="face-link" href="' + link.url + '"' + externalAttrs + '>' + link.label + '<span aria-hidden="true">↗</span></a>';
              }).join('') + '</div>' +
            '</div>' +
          '</div>' +
        '</div>';
    }

    function syncFaces(r) {
      for (var offset = -1; offset <= 2; offset++) {
        populateFace(frontFace(r + offset), wrapProject(r + offset));
      }
    }


    
    var RULER_SEG = 100;
    var RULER_TICKS_PER_SEG = 10;
    var RULER_TICK_SPACING = RULER_SEG / RULER_TICKS_PER_SEG;
    var RULER_BOW = 48;
    var RULER_W = 80;
    var RULER_PAD = 4;

    var rulerLeftCanvas = document.getElementById('ruler-left');
    var rulerRightCanvas = document.getElementById('ruler-right');
    var rulerLeftCtx = null;
    var rulerRightCtx = null;
    var rulerDPR = window.devicePixelRatio || 1;
    var rulerH = 0;

    function curveX(vy, h, bow) {
      var t = vy / h;
      return bow * 4 * t * (1 - t);
    }

    function setupRulerCanvases() {
      var vp = document.getElementById('cube-viewport');
      var vpRect = vp.getBoundingClientRect();
      var gap = 16;
      rulerH = vpRect.height;

      [rulerLeftCanvas, rulerRightCanvas].forEach(function(c) {
        c.style.width = RULER_W + 'px';
        c.style.height = rulerH + 'px';
        c.style.marginTop = (-rulerH / 2) + 'px';
        c.width = RULER_W * rulerDPR;
        c.height = rulerH * rulerDPR;
      });

      rulerLeftCanvas.style.left = (vpRect.left - gap - RULER_W) + 'px';
      rulerRightCanvas.style.left = (vpRect.right + gap) + 'px';

      rulerLeftCtx = rulerLeftCanvas.getContext('2d');
      rulerRightCtx = rulerRightCanvas.getContext('2d');
      rulerLeftCtx.setTransform(rulerDPR, 0, 0, rulerDPR, 0, 0);
      rulerRightCtx.setTransform(rulerDPR, 0, 0, rulerDPR, 0, 0);

      var cw = document.getElementById('counter-wrap');
      cw.style.left = (vpRect.right + gap + RULER_W + 12) + 'px';
      cw.style.top = '50%';
      cw.style.marginTop = '-1.2rem';
    }

    function drawRuler(ctx, w, h, side, angle) {
      ctx.clearRect(0, 0, w, h);

      var scrollPos = (angle / 90) * RULER_SEG;
      var margin = 20;
      var minTick = Math.floor((scrollPos - h / 2 - margin) / RULER_TICK_SPACING);
      var maxTick = Math.ceil((scrollPos + h / 2 + margin) / RULER_TICK_SPACING);

      ctx.lineWidth = 1;

      for (var i = minTick; i <= maxTick; i++) {
        var tickInSeg = ((i % RULER_TICKS_PER_SEG) + RULER_TICKS_PER_SEG) % RULER_TICKS_PER_SEG;
        var vy = h / 2 + i * RULER_TICK_SPACING - scrollPos;

        if (vy < -margin || vy > h + margin) continue;

        var tickLen, alpha;
        if (tickInSeg === 0) { tickLen = 16; alpha = 0.55; }
        else if (tickInSeg === 5) { tickLen = 10; alpha = 0.3; }
        else { tickLen = 6; alpha = 0.12; }

        var bowDisp = curveX(Math.max(0, Math.min(h, vy)), h, RULER_BOW);

        var edgeFade = 1;
        if (vy < 50) edgeFade = vy / 50;
        else if (vy > h - 50) edgeFade = (h - vy) / 50;
        edgeFade = Math.max(0, Math.min(1, edgeFade));

        ctx.strokeStyle = 'rgba(255,255,255,' + (alpha * edgeFade) + ')';
        ctx.beginPath();
        if (side === 'left') {
          var sx = (w - RULER_PAD) - bowDisp;
          ctx.moveTo(sx, vy);
          ctx.lineTo(sx - tickLen, vy);
        } else {
          var sx = RULER_PAD + bowDisp;
          ctx.moveTo(sx, vy);
          ctx.lineTo(sx + tickLen, vy);
        }
        ctx.stroke();
      }

      
      ctx.strokeStyle = 'rgba(255,255,255,0.1)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (var py = 0; py <= h; py += 2) {
        var bd = curveX(py, h, RULER_BOW);
        var x = (side === 'left') ? (w - RULER_PAD) - bd : RULER_PAD + bd;
        if (py === 0) ctx.moveTo(x, py);
        else ctx.lineTo(x, py);
      }
      ctx.stroke();
    }

    function layoutRulers() {
      setupRulerCanvases();
    }

    function updateRulers(angle) {
      if (!rulerLeftCtx || !rulerRightCtx) return;
      drawRuler(rulerLeftCtx, RULER_W, rulerH, 'left', angle);
      drawRuler(rulerRightCtx, RULER_W, rulerH, 'right', angle);
    }


    
    var NUM_H = 2.4 * parseFloat(getComputedStyle(document.documentElement).fontSize); 
    var counterStrip = document.getElementById('counter-strip');

    function buildCounter() {
      var html = '';
      for (var i = 0; i < TOTAL; i++) {
        var num = String(i + 1).padStart(2, '0');
        html += '<div class="counter-num"><span class="dim">/</span> ' + num + '</div>';
      }
      counterStrip.innerHTML = html;
      
      var firstNum = counterStrip.querySelector('.counter-num');
      if (firstNum) NUM_H = firstNum.offsetHeight;
    }

    function updateCounter(angle) {
      
      var frac = angle / 90;
      
      var wrapped = ((frac % TOTAL) + TOTAL) % TOTAL;
      counterStrip.style.transform = 'translateY(' + (-wrapped * NUM_H) + 'px)';
    }


    
    var rawAngle = 0;       
    var displayAngle = 0;   
    var rotStep = 0;        
    var snapTimer = null;
    var isSnapping = false;
    var snapTween = null;
    var snapProxy = { a: 0 };
    var introTl = null;
    var lastRenderTimestamp = 0;

    function snapToNearest() {
      var nearest = Math.round(rawAngle / 90) * 90;
      if (Math.abs(rawAngle - nearest) < 0.5) {
        rawAngle = nearest;
        return;
      }
      isSnapping = true;
      snapProxy.a = rawAngle;
      snapTween = gsap.to(snapProxy, {
        a: nearest,
        duration: 0.5,
        ease: 'power3.out',
        onUpdate: function() { rawAngle = snapProxy.a; },
        onComplete: function() { rawAngle = nearest; isSnapping = false; }
      });
    }

    function cancelSnap() {
      if (isSnapping && snapTween) {
        snapTween.kill();
        isSnapping = false;
      }
      if (snapTimer) clearTimeout(snapTimer);
    }

    
    function onWheel(e) {
      e.preventDefault();
      cancelSnap();
      rawAngle += e.deltaY * 0.22;
      snapTimer = setTimeout(snapToNearest, 180);
    }
    document.addEventListener('wheel', onWheel, { passive: false });

    
    var touchLastY = 0;
    document.addEventListener('touchstart', function(e) {
      touchLastY = e.touches[0].clientY;
      cancelSnap();
    }, { passive: true });
    document.addEventListener('touchmove', function(e) {
      e.preventDefault();
      var y = e.touches[0].clientY;
      var delta = touchLastY - y;
      touchLastY = y;
      rawAngle += delta * 0.6;
    }, { passive: false });
    document.addEventListener('touchend', function() {
      snapTimer = setTimeout(snapToNearest, 120);
    }, { passive: true });

    
    var isDragging = false;
    var dragLastY = 0;
    function stopDrag() {
      if (!isDragging) return;
      isDragging = false;
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
      snapTimer = setTimeout(snapToNearest, 120);
    }
    document.addEventListener('mousedown', function(e) {
      if (e.button !== 0) return;
      if (e.target.closest('a')) return;
      isDragging = true;
      dragLastY = e.clientY;
      cancelSnap();
      document.body.style.cursor = 'grabbing';
      document.body.style.userSelect = 'none';
    });
    document.addEventListener('mousemove', function(e) {
      if (!isDragging) return;
      if (!(e.buttons & 1)) { stopDrag(); return; }
      var delta = dragLastY - e.clientY;
      dragLastY = e.clientY;
      rawAngle += delta * 0.5;
    });
    document.addEventListener('mouseup', stopDrag);
    document.addEventListener('mouseleave', stopDrag);
    window.addEventListener('blur', stopDrag);

    
    document.addEventListener('keydown', function(e) {
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        e.preventDefault(); cancelSnap();
        rawAngle = (Math.round(rawAngle / 90) + 1) * 90;
        snapToNearest();
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        e.preventDefault(); cancelSnap();
        rawAngle = (Math.round(rawAngle / 90) - 1) * 90;
        snapToNearest();
      }
    });


    
    function render(timestamp) {
      
      if (lastRenderTimestamp > 0 && timestamp - lastRenderTimestamp > 500) {
        displayAngle = rawAngle;
      }
      lastRenderTimestamp = timestamp;

      var lerp = isSnapping ? 0.07 : 0.035;
      displayAngle += (rawAngle - displayAngle) * lerp;

      
      if (Math.abs(rawAngle - displayAngle) < 0.05) displayAngle = rawAngle;

      setCubeAngle(displayAngle);

      
      var newStep = Math.round(-displayAngle / 90);
      if (newStep !== rotStep) {
        rotStep = newStep;
        syncFaces(rotStep);
      }

      updateRulers(displayAngle);
      updateCounter(displayAngle);

      requestAnimationFrame(render);
    }


    
    document.querySelectorAll('[data-chr]').forEach(function(el) {
      var text = el.dataset.chr;
      el.removeAttribute('data-chr');
      el.innerHTML = '';
      Array.from(text).forEach(function(ch, i) {
        if (ch === ' ') {
          el.insertAdjacentHTML('beforeend', '<span style="width:0.35em;display:inline-block">&nbsp;</span>');
          return;
        }
        var wrap = document.createElement('span');
        wrap.className = 'ch-wrap';
        wrap.style.setProperty('--i', i);
        var chHTML = window.getCharHTML ? window.getCharHTML(ch) : ch;
        wrap.innerHTML = '<span class="ch-top">' + chHTML + '</span><span class="ch-bot">' + chHTML + '</span>';
        el.appendChild(wrap);
      });
    });


    
    var fromIndexTransition = sessionStorage.getItem('work-transition') === '1';
    var backBtnEl = document.getElementById('back-btn');
    var isLeavingWithFade = false;

    function isOnBackTrapState() {
      return !!(window.history.state && window.history.state.__workBackTrap);
    }

    function ensureBackTrapState() {
      if (!fromIndexTransition) return;
      if (isOnBackTrapState()) return;
      if (!(window.history && window.history.pushState)) return;
      window.history.pushState({ __workBackTrap: true }, '', window.location.href);
    }

    ensureBackTrapState();

    function returnToIndexWithFade(historySteps) {
      if (isLeavingWithFade) return;
      isLeavingWithFade = true;

      var overlay = document.getElementById('intro-overlay');
      var title = document.getElementById('page-title');
      gsap.killTweensOf([overlay, title]);
      overlay.style.pointerEvents = 'auto';

      var tl = gsap.timeline({
        onComplete: function() {
          sessionStorage.setItem('index-return-fade', 'works');
          if (historySteps > 0 && window.history.length > historySteps) {
            window.history.go(-historySteps);
            return;
          }
          window.location.href = 'index.html';
        }
      });

      tl.to(title, { opacity: 0, duration: 0.4, ease: 'power2.inOut' }, 0);
      tl.to(overlay, { opacity: 1, duration: 0.5, ease: 'power2.inOut' }, 0.1);
    }

    backBtnEl.addEventListener('click', function(e) {
      e.preventDefault();
      var steps = fromIndexTransition ? (isOnBackTrapState() ? 2 : 1) : 0;
      returnToIndexWithFade(steps);
    });

    window.addEventListener('popstate', function() {
      if (!fromIndexTransition || isLeavingWithFade) return;
      returnToIndexWithFade(1);
    });


    
    function playIntro() {
      var overlay = document.getElementById('intro-overlay');
      var title = document.getElementById('page-title');
      var viewport = document.getElementById('cube-viewport');
      var backBtn = document.getElementById('back-btn');
      var rl = document.getElementById('ruler-left');
      var rr = document.getElementById('ruler-right');
      var cw = document.getElementById('counter-wrap');
      var hint = document.getElementById('scroll-hint');

      var fromIndex = fromIndexTransition;
      sessionStorage.removeItem('work-transition');

      var tl = gsap.timeline();
      introTl = tl;

      if (fromIndex) {
        gsap.set(overlay, { opacity: 1 });
        gsap.set(title, { opacity: 1 });
        tl.to(overlay, { opacity: 0, duration: 0.8, ease: 'power2.out' }, 0.1);
      } else {
        gsap.set(overlay, { opacity: 1 });
        gsap.set(title, { opacity: 0 });
        tl.to(overlay, { opacity: 0, duration: 0.6, ease: 'power2.out' }, 0);
        tl.to(title, { opacity: 1, duration: 0.8, ease: 'power2.out' }, 0.2);
      }

      var t0 = fromIndex ? 0.6 : 0.4;
      tl.to(viewport, { opacity: 1, duration: 1, ease: 'power2.out' }, t0);
      tl.to(backBtn, { opacity: 1, duration: 0.6, ease: 'power2.out' }, t0 + 0.2);
      tl.to([rl, rr], { opacity: 1, duration: 0.8, ease: 'power2.out' }, t0 + 0.3);
      tl.to(cw, { opacity: 1, duration: 0.6, ease: 'power2.out' }, t0 + 0.4);
      tl.set(hint, { display: 'none' });

      
      var chevron = document.getElementById('scroll-chevron');
      tl.to(chevron, { opacity: 1, duration: 0.6, ease: 'power2.out' }, t0 + 0.5);
      gsap.to(chevron, {
        y: 6, duration: 0.9, ease: 'power1.inOut', repeat: -1, yoyo: true, delay: t0 + 0.5
      });
      tl.to(chevron, { opacity: 0, duration: 0.8, ease: 'power2.in' }, t0 + 5);
    }


    
    buildCounter();
    measureCube();
    syncFaces(0);
    requestAnimationFrame(render);

    window.addEventListener('resize', measureCube);

    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(playIntro);
    } else {
      window.addEventListener('load', playIntro);
    }

    window.addEventListener('pageshow', function(e) {
      isLeavingWithFade = false;
      ensureBackTrapState();
      if (!e.persisted) return;
      var overlay = document.getElementById('intro-overlay');
      gsap.killTweensOf(overlay);
      gsap.set(overlay, { opacity: 0 });
      overlay.style.pointerEvents = 'none';
    });

    
    document.addEventListener('visibilitychange', function() {
      if (document.hidden) return;
      if (introTl && introTl.progress() < 1) introTl.progress(1);
      displayAngle = rawAngle;
    });
