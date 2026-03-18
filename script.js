/* ==========================================
   UBONGO SIMULATIONS — script.js
   ========================================== */

(function () {
  'use strict';

  /* ===== NAVBAR: scroll shadow + mobile toggle ===== */
  const navbar    = document.getElementById('navbar');
  const navToggle = document.getElementById('navToggle');
  const navLinks  = document.getElementById('navLinks');

  window.addEventListener('scroll', function () {
    if (window.scrollY > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }, { passive: true });

  navToggle.addEventListener('click', function () {
    const isOpen = navLinks.classList.toggle('open');
    navToggle.classList.toggle('open', isOpen);
    navToggle.setAttribute('aria-expanded', isOpen);
  });

  // Close mobile menu when a link is clicked
  navLinks.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      navLinks.classList.remove('open');
      navToggle.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });

  /* ===== SCROLL-IN ANIMATION ===== */
  const animEls = document.querySelectorAll(
    '.feature-card, .process-card, .team-card, .mission-card, .why-text, .why-image'
  );

  if ('IntersectionObserver' in window) {
    // Add initial hidden state via JS (avoids flash when JS is slow)
    animEls.forEach(function (el) {
      el.style.opacity = '0';
      el.style.transform = 'translateY(24px)';
      el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });

    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          // Stagger siblings within the same parent
          const siblings = Array.from(entry.target.parentElement.children);
          const index = siblings.indexOf(entry.target);
          setTimeout(function () {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
          }, index * 80);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    animEls.forEach(function (el) { observer.observe(el); });
  }

  /* ===== BADGE DOT PULSE ===== */
  const dot = document.querySelector('.badge-dot');
  if (dot) {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes pulse {
        0%   { box-shadow: 0 0 0 0 rgba(100, 217, 144, 0.7); }
        70%  { box-shadow: 0 0 0 8px rgba(100, 217, 144, 0); }
        100% { box-shadow: 0 0 0 0 rgba(100, 217, 144, 0); }
      }
      .badge-dot { animation: pulse 2s infinite; }
    `;
    document.head.appendChild(style);
  }

})();
