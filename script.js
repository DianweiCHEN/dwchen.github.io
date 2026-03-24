(function () {
  /* ---------- Tab switching ---------- */
  const navLinks = document.querySelectorAll('.nav-link[data-tab]');
  const logo     = document.querySelector('.logo-wrap[data-tab]');
  const panels   = document.querySelectorAll('.panel');

  function setActiveTab(tabId) {
    navLinks.forEach(function (link) {
      const active = link.getAttribute('data-tab') === tabId;
      link.classList.toggle('active', active);
      link.setAttribute('aria-selected', active);
    });
    panels.forEach(function (panel) {
      const active = panel.id === 'panel-' + tabId;
      panel.classList.toggle('active', active);
      panel.hidden = !active;
    });
    // Re-run count-up when switching to Home
    if (tabId === 'home') startCounters();
  }

  navLinks.forEach(function (link) {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      const tab = e.currentTarget.getAttribute('data-tab');
      if (tab) setActiveTab(tab);
    });
  });
  if (logo) {
    logo.addEventListener('click', function (e) {
      e.preventDefault();
      setActiveTab('home');
    });
  }

  document.querySelectorAll('.nav-inline[data-tab]').forEach(function (el) {
    el.addEventListener('click', function (e) {
      e.preventDefault();
      var tab = el.getAttribute('data-tab');
      if (tab) setActiveTab(tab);
    });
  });

  setActiveTab('home');

  /* ---------- Count-up animation for stat cards ---------- */
  function easeOutCubic(t) { return 1 - Math.pow(1 - t, 3); }

  function animateCount(el, target, duration) {
    const start = performance.now();
    function tick(now) {
      const elapsed  = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const value    = Math.round(easeOutCubic(progress) * target);
      el.textContent = value;
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  function startCounters() {
    document.querySelectorAll('.stat-number[data-count]').forEach(function (el) {
      const target = parseInt(el.getAttribute('data-count'), 10);
      if (!isNaN(target)) animateCount(el, target, 1200);
    });
  }

  /* ---------- Intersection Observer: fade-in on scroll ---------- */
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });

    document.querySelectorAll('.pub-item, .service-list li, .tag-list li, .timeline-item, .news-item').forEach(function (el) {
      el.style.opacity = '0';
      el.style.transform = 'translateY(14px)';
      el.style.transition = 'opacity 0.45s ease, transform 0.45s ease';
      observer.observe(el);
    });
  }

  /* ---------- Magnetic hover effect on stat cards ---------- */
  document.querySelectorAll('.stat-card').forEach(function (card) {
    card.addEventListener('mousemove', function (e) {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width  - 0.5) * 12;
      const y = ((e.clientY - rect.top)  / rect.height - 0.5) * 12;
      card.style.transform = 'perspective(400px) rotateY(' + x + 'deg) rotateX(' + (-y) + 'deg) translateY(-4px) scale(1.04)';
    });
    card.addEventListener('mouseleave', function () {
      card.style.transform = '';
    });
  });

  /* ---------- Page view counter (CountAPI) ---------- */
  var viewEl = document.getElementById('page-view-count');
  if (viewEl) {
    fetch('https://api.countapi.xyz/hit/dianweichen.github.io/home')
      .then(function (r) { return r.json(); })
      .then(function (d) {
        if (d && typeof d.value === 'number') viewEl.textContent = d.value.toLocaleString();
      })
      .catch(function () { viewEl.textContent = '—'; });
  }

  /* ---------- Rotating research tips ---------- */
  var tips = [
    'Digital twins let you stress-test AVs in winter or rare scenarios without leaving the lab.',
    'CARLA + SUMO co-simulation is a powerful way to model mixed traffic and pedestrians.',
    'Edge cases in autonomy often show up in bad weather or unusual pedestrian behavior.',
    'Physics-informed models (e.g. PRGP) can improve prediction when data is scarce.',
    'Reinforcement learning can train adversarial agents to find AV failure modes.',
    'Vision–language models are opening new ways to evaluate scene understanding in driving.'
  ];
  var tipEl = document.getElementById('research-tip-text');
  var tipIndex = 0;
  if (tipEl && tips.length) {
    function showTip() {
      tipEl.textContent = tips[tipIndex];
      tipIndex = (tipIndex + 1) % tips.length;
    }
    showTip();
    setInterval(showTip, 6000);
  }

  /* ---------- Local time (College Park, MD) ---------- */
  var timeEl = document.getElementById('local-time');
  if (timeEl) {
    function updateTime() {
      var now = new Date();
      try {
        var str = now.toLocaleTimeString('en-US', { timeZone: 'America/New_York', hour: '2-digit', minute: '2-digit', second: '2-digit' });
        timeEl.textContent = str;
        timeEl.setAttribute('datetime', now.toISOString());
      } catch (e) {
        timeEl.textContent = now.toLocaleTimeString();
      }
    }
    updateTime();
    setInterval(updateTime, 1000);
  }

})();
