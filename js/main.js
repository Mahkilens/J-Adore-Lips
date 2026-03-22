(function () {
  'use strict';

  /* ─── MOBILE MENU ─── */
  let hamburger = document.getElementById('hamburger');
  let mobileMenu = document.getElementById('mobile-menu');
  let closeBtn = document.getElementById('mobile-menu-close');

  function openMenu() {
    if (!mobileMenu) return;
    mobileMenu.classList.add('open');
    document.body.style.overflow = 'hidden';
    if (hamburger) hamburger.setAttribute('aria-expanded', 'true');
  }

  function closeMenu() {
    if (!mobileMenu) return;
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
    if (hamburger) hamburger.setAttribute('aria-expanded', 'false');
  }

  if (hamburger) hamburger.addEventListener('click', openMenu);
  if (closeBtn) closeBtn.addEventListener('click', closeMenu);

  if (mobileMenu) {
    mobileMenu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', closeMenu);
    });
  }

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeMenu();
  });

  window.addEventListener('resize', function () {
    if (window.innerWidth >= 768) closeMenu();
  });

  /* ─── FAQ ACCORDION ─── */
  let faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(function (item) {
    let btn = item.querySelector('.faq-question');
    let answer = item.querySelector('.faq-answer');
    if (!btn || !answer) return;

    btn.addEventListener('click', function () {
      let isOpen = item.classList.contains('open');

      // Close all others
      faqItems.forEach(function (other) {
        if (other !== item) {
          other.classList.remove('open');
          let otherBtn = other.querySelector('.faq-question');
          if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
        }
      });

      if (isOpen) {
        item.classList.remove('open');
        btn.setAttribute('aria-expanded', 'false');
      } else {
        item.classList.add('open');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });

  /* ─── STICKY HEADER SCROLL EFFECT ─── */
  let header = document.getElementById('site-header');
  if (header) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 60) {
        header.style.borderBottomColor = 'rgba(255,255,255,0.14)';
      } else {
        header.style.borderBottomColor = 'rgba(255,255,255,0.1)';
      }
    }, { passive: true });
  }

})();
