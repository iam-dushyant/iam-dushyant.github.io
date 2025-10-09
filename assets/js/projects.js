(function() {
  const search = document.querySelector('#project-search');
  const techFilter = document.querySelector('#tech-filter');
  const cards = Array.from(document.querySelectorAll('.project-card'));

  function applyFilters() {
    const q = (search?.value || '').toLowerCase();
    const tech = (techFilter?.value || '');

    cards.forEach(card => {
      const hay = (card.dataset.search || '').toLowerCase();
      const hasTech = !tech || (card.dataset.tech || '').split(',').includes(tech);
      const show = hay.includes(q) && hasTech;
      card.style.display = show ? '' : 'none';
    });
  }

  search?.addEventListener('input', applyFilters);
  techFilter?.addEventListener('change', applyFilters);
  applyFilters();
})();
