'use strict';

// Side nav: highlight active section + fade in after hero
(function () {
  const sections = ['hero', 'adult-1', 'child', 'pricemob'];
  const nav = document.querySelector('.side-nav');
  const deco = document.querySelector('.side-deco');
  const links = document.querySelectorAll('.side-nav__link');

  if (!links.length || !nav) return;

  function updateActive() {
    const scrollY = window.scrollY + window.innerHeight / 2;
    const hero = document.getElementById('hero');
    const heroBottom = hero ? hero.offsetTop + hero.offsetHeight : 900;

    // показываем nav и deco только когда проскроллили за hero
    const pastHero = window.scrollY >= heroBottom - 100;
    nav.classList.toggle('side-nav--visible', pastHero);
    if (deco) deco.classList.toggle('side-deco--visible', pastHero);

    let current = 'hero';
    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el && el.offsetTop <= scrollY) current = id;
    });

    links.forEach(link => {
      const href = link.getAttribute('href').replace('#', '');
      const isChild = href === 'child';
      const isAdult = href === 'adult-1';

      if (current === 'child' || current === 'pricemob') {
        link.classList.toggle('side-nav__link--active', isChild);
      } else {
        link.classList.toggle('side-nav__link--active', isAdult);
      }
    });
  }

  window.addEventListener('scroll', updateActive, { passive: true });
  updateActive();
})();

// Popups: образование / обо мне
(function () {
  const triggers = document.querySelectorAll('[data-popup]');
  const overlays = document.querySelectorAll('.popup-overlay');

  function openPopup(id) {
    const overlay = document.getElementById(id);
    if (!overlay) return;
    document.documentElement.classList.add('popup-open');
    overlay.classList.add('is-open');
    overlay.focus();
  }

  function closeAll() {
    overlays.forEach(o => o.classList.remove('is-open'));
    document.documentElement.classList.remove('popup-open');
  }

  triggers.forEach(btn => {
    btn.addEventListener('click', () => openPopup(btn.dataset.popup));
  });

  overlays.forEach(overlay => {
    // close on backdrop click
    overlay.addEventListener('click', e => {
      if (e.target === overlay) closeAll();
    });
    // close button
    const closeBtn = overlay.querySelector('.popup-close');
    if (closeBtn) closeBtn.addEventListener('click', closeAll);
  });

  // close on Escape
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeAll();
  });
})();

// CTA accordion: как проходит работа / принципы и результат
(function () {
  const btns = document.querySelectorAll('.js-cta');

  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      const isOpen = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', isOpen ? 'false' : 'true');
    });
  });
})();
