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

    document.querySelectorAll('.pub-item, .service-list li, .tag-list li').forEach(function (el) {
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

})();
