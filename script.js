(function () {
  const navLinks = document.querySelectorAll('.nav-link[data-tab]');
  const logo = document.querySelector('.logo-wrap[data-tab]');
  const panels = document.querySelectorAll('.panel');

  function setActiveTab(tabId) {
    navLinks.forEach(function (link) {
      const isActive = link.getAttribute('data-tab') === tabId;
      link.classList.toggle('active', isActive);
      link.setAttribute('aria-selected', isActive);
    });
    panels.forEach(function (panel) {
      const isActive = panel.id === 'panel-' + tabId;
      panel.classList.toggle('active', isActive);
      panel.hidden = !isActive;
    });
  }

  function handleClick(e) {
    e.preventDefault();
    const tab = e.currentTarget.getAttribute('data-tab');
    if (tab) setActiveTab(tab);
  }

  navLinks.forEach(function (link) {
    link.addEventListener('click', handleClick);
  });
  if (logo) {
    logo.addEventListener('click', function (e) {
      e.preventDefault();
      setActiveTab('home');
    });
  }

  setActiveTab('home');
})();
