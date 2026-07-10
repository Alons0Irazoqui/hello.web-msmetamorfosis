/* Metamorfosis Producciones y Eventos — interactions */
(function () {
  'use strict';

  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------------- Loading screen ---------------- */
  window.addEventListener('load', function () {
    var loader = document.getElementById('loading-screen');
    if (!loader) return;
    setTimeout(function () {
      loader.classList.add('loaded');
    }, 550);
  });

  /* ---------------- Header scroll state ---------------- */
  var header = document.getElementById('site-header');
  function updateHeader() {
    if (window.scrollY > 40) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
  }
  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });

  /* ---------------- Mobile nav toggle ---------------- */
  var toggle = document.getElementById('nav-toggle');
  var nav = document.getElementById('main-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      toggle.classList.toggle('active');
      nav.classList.toggle('open');
      document.body.style.overflow = nav.classList.contains('open') ? 'hidden' : '';
    });
    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        toggle.classList.remove('active');
        nav.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  /* ---------------- Scroll reveal (IntersectionObserver) ---------------- */
  var revealEls = document.querySelectorAll('[data-reveal], [data-reveal-stagger], [data-reveal-title]');
  if ('IntersectionObserver' in window && !prefersReducedMotion) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
  }

  /* ---------------- Hero typewriter + color words ---------------- */
  var typeTarget = document.getElementById('hero-typed');
  if (typeTarget) {
    var phrases = [
      'experiencias inolvidables.',
      'bodas de ensueño.',
      'XV años espectaculares.',
      'activaciones de marca.',
      'eventos masivos exitosos.'
    ];
    var prefixHTML = 'Transformamos tu evento en<br><span class="gradient-word">';
    var suffixHTML = '</span>';

    if (prefersReducedMotion) {
      typeTarget.innerHTML = prefixHTML + phrases[0] + suffixHTML;
    } else {
      (function typeLoop() {
        var phraseIndex = 0;
        var charIndex = 0;
        var deleting = false;

        function tick() {
          var current = phrases[phraseIndex];
          if (!deleting) {
            charIndex++;
            typeTarget.innerHTML = prefixHTML + current.slice(0, charIndex) + suffixHTML + '<span class="typed-cursor">&nbsp;</span>';
            if (charIndex === current.length) {
              deleting = true;
              return setTimeout(tick, 2200);
            }
            return setTimeout(tick, 55);
          } else {
            charIndex--;
            typeTarget.innerHTML = prefixHTML + current.slice(0, charIndex) + suffixHTML + '<span class="typed-cursor">&nbsp;</span>';
            if (charIndex === 0) {
              deleting = false;
              phraseIndex = (phraseIndex + 1) % phrases.length;
              return setTimeout(tick, 400);
            }
            return setTimeout(tick, 28);
          }
        }
        tick();
      })();
    }
  }

  /* ---------------- Hero particles canvas ---------------- */
  var canvas = document.getElementById('hero-particles');
  if (canvas && canvas.getContext && !prefersReducedMotion) {
    var ctx = canvas.getContext('2d');
    var particles = [];
    var width, height;
    var colors = ['rgba(216,178,107,0.55)', 'rgba(211,160,160,0.5)', 'rgba(255,255,255,0.35)'];

    function resize() {
      width = canvas.offsetWidth;
      height = canvas.offsetHeight;
      canvas.width = width * devicePixelRatio;
      canvas.height = height * devicePixelRatio;
      ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
    }

    function createParticles() {
      var count = width < 720 ? 34 : 70;
      particles = [];
      for (var i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          r: Math.random() * 2 + 0.6,
          vx: (Math.random() - 0.5) * 0.25,
          vy: (Math.random() - 0.5) * 0.25,
          color: colors[Math.floor(Math.random() * colors.length)]
        });
      }
    }

    function step() {
      ctx.clearRect(0, 0, width, height);
      for (var i = 0; i < particles.length; i++) {
        var p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = width; if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height; if (p.y > height) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
      }
      for (var a = 0; a < particles.length; a++) {
        for (var b = a + 1; b < particles.length; b++) {
          var dx = particles[a].x - particles[b].x;
          var dy = particles[a].y - particles[b].y;
          var dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.strokeStyle = 'rgba(216,178,107,' + (0.14 * (1 - dist / 120)) + ')';
            ctx.lineWidth = 1;
            ctx.moveTo(particles[a].x, particles[a].y);
            ctx.lineTo(particles[b].x, particles[b].y);
            ctx.stroke();
          }
        }
      }
      requestAnimationFrame(step);
    }

    resize();
    createParticles();
    step();
    window.addEventListener('resize', function () {
      resize();
      createParticles();
    });
  }

  /* ---------------- Fixed-style parallax backgrounds (hero + gallery) ----------------
     Native `background-attachment: fixed` is unreliable/janky on most mobile
     browsers, so the "stays in place" effect is done with a scroll-driven
     transform instead — this behaves the same on mobile and desktop. */
  var parallaxLayers = [];
  document.querySelectorAll('.hero-bg-image').forEach(function (el) {
    parallaxLayers.push({ el: el, container: el.closest('#hero'), speed: 0.2, maxOffsetRatio: 0.07 });
  });
  document.querySelectorAll('.parallax-bg').forEach(function (el) {
    parallaxLayers.push({ el: el, container: el.closest('.parallax-block'), speed: 0.25, maxOffsetRatio: 0.09 });
  });

  if (parallaxLayers.length && !prefersReducedMotion) {
    var parallaxTicking = false;

    function applyParallax() {
      var vh = window.innerHeight;
      parallaxLayers.forEach(function (layer) {
        var rect = layer.container.getBoundingClientRect();
        if (rect.bottom < 0 || rect.top > vh) return;
        var delta = (rect.top + rect.height / 2) - vh / 2;
        var maxOffset = rect.height * layer.maxOffsetRatio;
        var offset = Math.max(-maxOffset, Math.min(maxOffset, -delta * layer.speed));
        layer.el.style.transform = 'translate3d(0,' + offset.toFixed(1) + 'px,0)';
      });
      parallaxTicking = false;
    }

    function requestParallax() {
      if (!parallaxTicking) {
        requestAnimationFrame(applyParallax);
        parallaxTicking = true;
      }
    }

    applyParallax();
    window.addEventListener('scroll', requestParallax, { passive: true });
    window.addEventListener('resize', requestParallax, { passive: true });
  }

  /* ---------------- Contact form -> WhatsApp ---------------- */
  var form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = form.querySelector('#form-name').value.trim();
      var eventType = form.querySelector('#form-event').value;
      var date = form.querySelector('#form-date').value;
      var message = form.querySelector('#form-message').value.trim();

      var text = 'Hola Metamorfosis, soy ' + name + '. ' +
        'Me interesa cotizar un evento de tipo: ' + eventType + '. ' +
        (date ? 'Fecha tentativa: ' + date + '. ' : '') +
        (message ? 'Detalles: ' + message : '');

      var url = 'https://wa.me/525570061386?text=' + encodeURIComponent(text);
      window.open(url, '_blank', 'noopener');
    });
  }

  /* ---------------- Set current year in footer ---------------- */
  var yearEl = document.getElementById('current-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

})();
