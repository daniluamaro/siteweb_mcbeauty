/* Mayara Cabral Beauty Clinic — interações
   Vanilla, sem dependências. ~2KB minificado. */
(function () {
  'use strict';

  /* ---------- Menu mobile ---------- */
  var burger = document.querySelector('.burger');
  var drawer = document.querySelector('.drawer');
  var backdrop = document.querySelector('.drawer-backdrop');

  function setDrawer(open) {
    if (!drawer) return;
    drawer.classList.toggle('open', open);
    backdrop.classList.toggle('open', open);
    burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    document.body.style.overflow = open ? 'hidden' : '';
    if (open) {
      var first = drawer.querySelector('.drawer__close');
      if (first) first.focus();
    } else {
      burger.focus();
    }
  }

  if (burger) {
    burger.addEventListener('click', function () {
      setDrawer(!drawer.classList.contains('open'));
    });
    backdrop.addEventListener('click', function () { setDrawer(false); });
    drawer.querySelector('.drawer__close').addEventListener('click', function () { setDrawer(false); });
    drawer.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') setDrawer(false);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && drawer.classList.contains('open')) setDrawer(false);
    });
  }

  /* ---------- Reveal ao rolar ---------- */
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var targets = document.querySelectorAll('.rv');

  if (reduced || !('IntersectionObserver' in window)) {
    targets.forEach(function (el) { el.classList.add('in'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    targets.forEach(function (el) { io.observe(el); });
  }

  /* ---------- Sliders horizontais ---------- */
  document.querySelectorAll('.slider').forEach(function (slider) {
    var track = slider.querySelector('.slider__track');
    var prev = slider.querySelector('[data-dir="prev"]');
    var next = slider.querySelector('[data-dir="next"]');
    if (!track) return;

    function step() {
      var card = track.firstElementChild;
      if (!card) return 320;
      var gap = parseFloat(getComputedStyle(track).columnGap || 18) || 18;
      return card.getBoundingClientRect().width + gap;
    }
    function scrollBy(dir) {
      track.scrollBy({ left: dir * step(), behavior: reduced ? 'auto' : 'smooth' });
    }
    function sync() {
      var max = track.scrollWidth - track.clientWidth - 2;
      if (prev) prev.disabled = track.scrollLeft <= 2;
      if (next) next.disabled = track.scrollLeft >= max;
      [prev, next].forEach(function (b) {
        if (b) b.style.opacity = b.disabled ? '.35' : '1';
      });
    }
    if (prev) prev.addEventListener('click', function () { scrollBy(-1); });
    if (next) next.addEventListener('click', function () { scrollBy(1); });
    track.addEventListener('scroll', sync, { passive: true });
    window.addEventListener('resize', sync);
    sync();
  });

  /* ---------- Filtro de categorias (página de procedimentos) ---------- */
  var filters = document.querySelectorAll('.filter');
  var cards = document.querySelectorAll('[data-cat]');

  if (filters.length && cards.length) {
    filters.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var cat = btn.dataset.filter;
        filters.forEach(function (b) {
          b.setAttribute('aria-pressed', b === btn ? 'true' : 'false');
        });
        cards.forEach(function (card) {
          var show = cat === 'todos' || card.dataset.cat === cat;
          card.hidden = !show;
        });
      });
    });
  }

  /* ---------- Ano no rodapé ---------- */
  var y = document.querySelector('[data-year]');
  if (y) y.textContent = new Date().getFullYear();
})();
