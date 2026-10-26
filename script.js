(() => {
  const links = [...document.querySelectorAll('.nav a')];
  const sections = links.map(a => document.querySelector(a.getAttribute('href')));
  const setActive = id => links.forEach(a => {
    const on = a.getAttribute('href') === '#' + id;
    a.classList.toggle('active', on);
    on ? a.setAttribute('aria-current', 'true') : a.removeAttribute('aria-current');
  });

  // Scroll-spy: a section is "current" when it crosses the middle band of the viewport
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id); });
  }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });
  sections.forEach(s => s && io.observe(s));
  setActive('intro');

  // Mobile menu
  const toggle = document.querySelector('.menu-toggle'), nav = document.getElementById('nav');
  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open);
  });
  links.forEach(a => a.addEventListener('click', () => {
    nav.classList.remove('open'); toggle.setAttribute('aria-expanded', 'false');
  }));

  // Works filter
  const buttons = document.querySelectorAll('.filters button');
  const cards = document.querySelectorAll('.work-card');
  buttons.forEach(b => b.addEventListener('click', () => {
    buttons.forEach(x => x.setAttribute('aria-pressed', x === b));
    cards.forEach(c => c.hidden = b.dataset.filter !== 'all' && c.dataset.category !== b.dataset.filter);
  }));
})();