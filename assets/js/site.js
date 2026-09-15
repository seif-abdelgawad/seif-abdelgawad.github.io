(function () {
  "use strict";
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- year ---------- */
  document.getElementById('year').textContent = new Date().getFullYear();

  /* ---------- scroll progress bar ---------- */
  var progressEl = document.getElementById('scrollProgress');
  function updateProgress() {
    var h = document.documentElement;
    var scrolled = (h.scrollTop) / ((h.scrollHeight - h.clientHeight) || 1) * 100;
    progressEl.style.width = scrolled + '%';
  }
  document.addEventListener('scroll', updateProgress, { passive: true });
  updateProgress();

  /* ---------- back to top ---------- */
  var toTop = document.getElementById('toTop');
  document.addEventListener('scroll', function () {
    toTop.classList.toggle('show', window.scrollY > 480);
  }, { passive: true });
  toTop.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
  });

  /* ---------- mobile menu ---------- */
  var navToggle = document.getElementById('navToggle');
  var mobileMenu = document.getElementById('mobileMenu');
  navToggle.addEventListener('click', function () {
    var open = mobileMenu.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  document.querySelectorAll('[data-nav-mobile]').forEach(function (a) {
    a.addEventListener('click', function () {
      mobileMenu.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });

  /* ---------- scrollspy ---------- */
  var sections = ['top', 'certifications', 'projects', 'resume', 'contact'].map(function (id) {
    return document.getElementById(id);
  }).filter(Boolean);
  var navLinks = document.querySelectorAll('[data-nav]');
  var navLinksMobile = document.querySelectorAll('[data-nav-mobile]');

  function setActive(id) {
    navLinks.forEach(function (a) {
      a.classList.toggle('active', a.getAttribute('href') === '#' + id);
    });
    navLinksMobile.forEach(function (a) {
      a.classList.toggle('active', a.getAttribute('href') === '#' + id);
    });
  }

  if ('IntersectionObserver' in window) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) setActive(entry.target.id);
      });
    }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });
    sections.forEach(function (s) { spy.observe(s); });
  }

  /* ---------- reveal on scroll ---------- */
  var revealEls = document.querySelectorAll('.reveal, .reveal-stagger');
  if ('IntersectionObserver' in window && !reduceMotion) {
    var ro = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(function (el) { ro.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
  }

  /* ---------- stagger delays ---------- */
  document.querySelectorAll('.reveal-stagger').forEach(function (group) {
    Array.prototype.forEach.call(group.children, function (child, i) {
      child.style.transitionDelay = (i * 70) + 'ms';
    });
  });

  /* ---------- typewriter ---------- */
  var roles = ['Network Security Engineer', 'Firewall Engineer', 'Offensive Security Engineer'];
  var twEl = document.getElementById('typewriter');
  if (twEl) {
    if (reduceMotion) {
      twEl.textContent = roles[0];
    } else {
      (function typeLoop(roleIndex, charIndex, deleting) {
        var current = roles[roleIndex % roles.length];
        twEl.textContent = current.slice(0, charIndex);
        var delay = deleting ? 35 : 70;
        if (!deleting && charIndex === current.length) { delay = 1500; deleting = true; }
        else if (deleting && charIndex === 0) { deleting = false; roleIndex++; delay = 300; }
        var nextChar = charIndex + (deleting ? -1 : 1);
        setTimeout(function () { typeLoop(roleIndex, nextChar, deleting); }, delay);
      })(0, 0, false);
    }
  }

  /* ---------- counters ---------- */
  var counters = document.querySelectorAll('[data-count]');
  function animateCounter(el) {
    var target = parseInt(el.getAttribute('data-count'), 10);
    var suffix = el.getAttribute('data-suffix') || '';
    if (reduceMotion) { el.textContent = target + suffix; return; }
    var start = 0;
    var duration = 900;
    var startTime = null;
    function step(ts) {
      if (!startTime) startTime = ts;
      var progress = Math.min((ts - startTime) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(eased * target) + suffix;
      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = target + suffix;
    }
    requestAnimationFrame(step);
  }
  if ('IntersectionObserver' in window) {
    var statsObserved = false;
    var statsObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting && !statsObserved) {
          statsObserved = true;
          counters.forEach(animateCounter);
        }
      });
    }, { threshold: 0.4 });
    var statsRow = document.getElementById('statsRow');
    if (statsRow) statsObs.observe(statsRow);
  }

  /* ---------- card tilt + glow-follow ---------- */
  var tiltCards = document.querySelectorAll('.cert-card, .proj-card');
  tiltCards.forEach(function (card) {
    card.addEventListener('mousemove', function (e) {
      var rect = card.getBoundingClientRect();
      var x = e.clientX - rect.left;
      var y = e.clientY - rect.top;
      card.style.setProperty('--mx', x + 'px');
      card.style.setProperty('--my', y + 'px');
      if (!reduceMotion && card.classList.contains('cert-card')) {
        var cx = rect.width / 2, cy = rect.height / 2;
        var rx = ((y - cy) / cy) * -4;
        var ry = ((x - cx) / cx) * 4;
        card.style.transform = 'perspective(900px) rotateX(' + rx + 'deg) rotateY(' + ry + 'deg) translateY(-2px)';
      }
    });
    card.addEventListener('mouseleave', function () {
      card.style.transform = '';
    });
  });

  /* ---------- skills marquee ---------- */
  var skills = ['Nmap', 'Metasploit', 'Burp Suite', 'Wireshark', 'Kali Linux', 'Palo Alto PAN-OS', 'Fortinet FortiGate', 'Sophos XG', 'hping3', 'VMware', 'Python', 'Bash', 'OWASP Top 10', 'SIEM'];
  var track = document.getElementById('marqueeTrack');
  if (track) {
    var buildRow = function () {
      var frag = document.createDocumentFragment();
      skills.forEach(function (s) {
        var span = document.createElement('span');
        span.className = 'marquee-item';
        span.innerHTML = '<span class="sep">◆</span> ' + s;
        frag.appendChild(span);
      });
      return frag;
    };
    track.appendChild(buildRow());
    track.appendChild(buildRow());
    if (reduceMotion) track.style.animation = 'none';
  }

  /* ---------- matrix rain (hero background) ---------- */
  var canvas = document.getElementById('matrixCanvas');
  if (canvas && !reduceMotion && window.matchMedia('(min-width: 480px)').matches) {
    var ctx = canvas.getContext('2d');
    var chars = 'アイウエオカキクケコサシスセソ01ABCDEF#$%&';
    var fontSize = 15;
    var columns, drops, rafId;
    var visible = true;

    function resize() {
      var rect = canvas.parentElement.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height + 40;
      columns = Math.floor(canvas.width / fontSize);
      drops = new Array(columns).fill(0).map(function () { return Math.random() * -50; });
    }

    function draw() {
      if (!visible) { rafId = requestAnimationFrame(draw); return; }
      ctx.fillStyle = 'rgba(10,10,10,0.13)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#00ff41';
      ctx.font = fontSize + 'px monospace';
      for (var i = 0; i < columns; i++) {
        var text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      }
      rafId = requestAnimationFrame(draw);
    }

    resize();
    rafId = requestAnimationFrame(draw);
    window.addEventListener('resize', resize);

    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) { visible = entry.isIntersecting; });
      }).observe(canvas);
    }
  }
})();
