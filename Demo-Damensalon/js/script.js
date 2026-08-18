(() => {
  'use strict';

  /* ---------- Decorative icons: hide from assistive tech ---------- */
  document.querySelectorAll('svg').forEach((svg) => {
    svg.setAttribute('aria-hidden', 'true');
    svg.setAttribute('focusable', 'false');
  });

  /* ---------- Sticky header ---------- */
  const header = document.getElementById('siteHeader');
  const onScroll = () => {
    if (!header) return;
    header.classList.toggle('is-scrolled', window.scrollY > 12);
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---------- Keep hero/page-head clear of the fixed header (banner height varies) ---------- */
  const heroEl = document.querySelector('.hero, .page-head');
  const syncHeroOffset = () => {
    if (!header || !heroEl) return;
    heroEl.style.paddingTop = header.offsetHeight + 48 + 'px';
  };
  const mobileNavEl = document.getElementById('mobileNav');
  const syncMobileNavOffset = () => {
    if (!header || !mobileNavEl) return;
    mobileNavEl.style.paddingTop = header.offsetHeight + 40 + 'px';
  };
  const syncOffsets = () => { syncHeroOffset(); syncMobileNavOffset(); };
  syncOffsets();
  window.addEventListener('resize', syncOffsets);
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(syncOffsets);
  }

  /* ---------- Mobile nav ---------- */
  const navToggle = document.getElementById('navToggle');
  const mobileNav = document.getElementById('mobileNav');
  if (navToggle && mobileNav) {
    const closeNav = () => {
      mobileNav.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    };
    const openNav = () => {
      mobileNav.classList.add('is-open');
      navToggle.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
    };
    navToggle.addEventListener('click', () => {
      mobileNav.classList.contains('is-open') ? closeNav() : openNav();
    });
    mobileNav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', closeNav);
    });
  }

  /* ---------- Scroll reveal animations ---------- */
  const revealTargets = document.querySelectorAll('.reveal, .reveal-stagger');
  if ('IntersectionObserver' in window && revealTargets.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
    );
    revealTargets.forEach((el) => observer.observe(el));
  } else {
    revealTargets.forEach((el) => el.classList.add('is-visible'));
  }
})();
