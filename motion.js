(function () {
  const root = document.documentElement;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  root.classList.add('motion-enabled');
  document.body.classList.add('page-motion-enter');

  const siteHeader = document.querySelector('.site-header');
  const navLinks = document.querySelector('#nav-links');
  let lastScrollY = window.scrollY;
  let showHeaderTimer;

  siteHeader.classList.remove('nav-hidden');

  const showHeader = () => {
    siteHeader.classList.remove('nav-hidden');
    clearTimeout(showHeaderTimer);
  };

  const scheduleHeaderReveal = () => {
    clearTimeout(showHeaderTimer);
    showHeaderTimer = setTimeout(showHeader, 400);
  };

  const hideHeader = () => {
    siteHeader.classList.add('nav-hidden');
  };

  window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    const scrollDelta = currentScrollY - lastScrollY;

    siteHeader.classList.toggle('nav-scrolling', currentScrollY > 12);
    if (navLinks.classList.contains('open') || currentScrollY <= 12 || scrollDelta < 0) {
      showHeader();
    } else if (scrollDelta > 0) {
      hideHeader();
    }

    if (!navLinks.classList.contains('open') && currentScrollY > 12) {
      scheduleHeaderReveal();
    }

    lastScrollY = currentScrollY;
  }, { passive: true });

  window.addEventListener('scrollend', showHeader, { passive: true });

  const autoRevealSelectors = [
    '.about-intro', '.about-method-grid', '.about-course-list', '.contact-panel',
    '.catalogue-toolbar', '.catalogue-grid', '.course-promise',
    '.details-intro', '.course-list', '.details-cta',
    '.story-feature', '.proof-grid', '.story-grid-section', '.stories-cta',
    '.contact-reassurance'
  ];

  autoRevealSelectors.forEach((selector) => {
    document.querySelectorAll(selector).forEach((element) => {
      if (!element.classList.contains('reveal')) element.classList.add('reveal');
    });
  });

  document.querySelectorAll('.about-method-grid,.about-course-list,.catalogue-grid,.proof-grid').forEach((group) => {
    group.classList.add('reveal-group');
  });

  const revealItems = document.querySelectorAll('.reveal');
  if (reducedMotion || !('IntersectionObserver' in window)) {
    revealItems.forEach((item) => item.classList.add('is-visible'));
    document.querySelectorAll('.reveal-group').forEach((group) => group.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver((entries, revealObserver) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -7% 0px' });

  revealItems.forEach((item) => observer.observe(item));
  document.querySelectorAll('.reveal-group').forEach((group) => observer.observe(group));
})();