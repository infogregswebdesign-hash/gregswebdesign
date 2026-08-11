(() => {
  'use strict';

  /* ---------- Decorative icons: hide from assistive tech ---------- */
  document.querySelectorAll('svg').forEach((svg) => {
    svg.setAttribute('aria-hidden', 'true');
    svg.setAttribute('focusable', 'false');
  });

  /* ---------- Footer year ---------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Sticky header ---------- */
  const header = document.getElementById('siteHeader');
  const onScroll = () => {
    if (!header) return;
    header.classList.toggle('is-scrolled', window.scrollY > 12);
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

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

  /* ---------- Close mobile nav / details on outside interactions handled natively ---------- */

  /* ---------- Contact form validation + submission ---------- */
  const form = document.getElementById('contactForm');
  const status = document.getElementById('formStatus');

  const showStatus = (message, type) => {
    if (!status) return;
    status.textContent = message;
    status.className = 'form-status visible ' + type;
  };

  const clearFieldError = (field) => {
    const errorEl = form.querySelector(`[data-error-for="${field.name}"]`);
    if (errorEl) errorEl.textContent = '';
    field.style.borderColor = '';
  };

  const setFieldError = (field, message) => {
    const errorEl = form.querySelector(`[data-error-for="${field.name}"]`);
    if (errorEl) errorEl.textContent = message;
    field.style.borderColor = '#FF8080';
  };

  const validateForm = () => {
    let valid = true;
    const requiredFields = form.querySelectorAll('[required]');

    requiredFields.forEach((field) => {
      clearFieldError(field);
      const value = field.value.trim();

      if (!value) {
        setFieldError(field, 'Dieses Feld wird benötigt.');
        valid = false;
        return;
      }

      if (field.type === 'email') {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(value)) {
          setFieldError(field, 'Bitte eine gültige E-Mail-Adresse eingeben.');
          valid = false;
        }
      }
    });

    return valid;
  };

  if (form) {
    form.querySelectorAll('[required]').forEach((field) => {
      field.addEventListener('input', () => clearFieldError(field));
    });

    form.addEventListener('submit', async (event) => {
      event.preventDefault();

      if (!validateForm()) {
        showStatus('Bitte überprüfe die markierten Felder.', 'error');
        return;
      }

      const submitBtn = form.querySelector('button[type="submit"]');
      const originalLabel = submitBtn.textContent;
      submitBtn.disabled = true;
      submitBtn.textContent = 'Wird gesendet …';

      const endpoint = form.getAttribute('action') || '';
      const isConfigured = endpoint.includes('formspree.io') && !endpoint.includes('DEINE-FORMSPREE-ID');

      if (!isConfigured) {
        // Formspree-Endpoint noch nicht eingetragen: Formular wird nur simuliert.
        setTimeout(() => {
          showStatus('Formular ist noch nicht mit Formspree verbunden. Bitte Endpoint in index.html eintragen.', 'error');
          submitBtn.disabled = false;
          submitBtn.textContent = originalLabel;
        }, 400);
        return;
      }

      try {
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: { Accept: 'application/json' },
          body: new FormData(form),
        });

        if (response.ok) {
          showStatus('Danke für deine Anfrage! Ich melde mich so schnell wie möglich bei dir.', 'success');
          form.reset();
        } else {
          showStatus('Da ist etwas schiefgelaufen. Bitte versuche es erneut oder schreib mir direkt per E-Mail.', 'error');
        }
      } catch (err) {
        showStatus('Da ist etwas schiefgelaufen. Bitte versuche es erneut oder schreib mir direkt per E-Mail.', 'error');
      } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = originalLabel;
      }
    });
  }
})();
