
(function() {
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  const state = { projects: [], techs: [] };

  function handleHashChange() {
    const id = (location.hash || '#about').slice(1);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    document.querySelectorAll('.nav-link').forEach(a => {
      a.classList.toggle('active', a.getAttribute('href') === '#' + id);
    });
  }
  window.addEventListener('hashchange', handleHashChange);
  handleHashChange();

  const themeToggle = document.getElementById('theme-toggle');
  const storedTheme = localStorage.getItem('theme');
  if (storedTheme === 'light') document.documentElement.classList.add('light');
  themeToggle?.addEventListener('click', () => {
    document.documentElement.classList.toggle('light');
    localStorage.setItem('theme', document.documentElement.classList.contains('light') ? 'light' : 'dark');
  });

  Promise.all([
    fetch('data/profile.json').then(r => r.json()),
    fetch('data/projects.json').then(r => r.json())
  ]).then(([profile, projects]) => {
    renderProfile(profile);
    state.projects = projects;
    renderProjects(projects);
    populateTechFilter(projects);
  }).catch(err => console.error('Data load error', err));

  function renderProfile(p) {
    document.title = (p.name || 'Portfolio') + ' — Portfolio';
    const roleEl = document.getElementById('brand-role');
    if (roleEl) roleEl.textContent = [p.role, p.location].filter(Boolean).join(' • ');

    const about = document.getElementById('about-text');
    if (about) about.textContent = p.about || '';

    const chips = document.getElementById('skills');
    chips.innerHTML = '';
    (p.skills || []).forEach(skill => {
      const span = document.createElement('span');
      span.className = 'chip';
      span.textContent = skill;
      chips.appendChild(span);
    });

    const fName = document.getElementById('footer-name');
    if (fName) fName.textContent = p.name || '';

    const cl = document.getElementById('contact-list');
    cl.innerHTML = '';
    if (p.email) cl.insertAdjacentHTML('beforeend', `<li><strong>Email:</strong> <a href="mailto:${p.email}">${p.email}</a></li>`);
    if (p.github) cl.insertAdjacentHTML('beforeend', `<li><strong>GitHub:</strong> <a href="${p.github}" target="_blank" rel="noopener">${p.github}</a></li>`);
    if (p.linkedin) cl.insertAdjacentHTML('beforeend', `<li><strong>LinkedIn:</strong> <a href="${p.linkedin}" target="_blank" rel="noopener">${p.linkedin}</a></li>`);
  }

  function renderProjects(items) {
    const grid = document.getElementById('project-grid');
    grid.innerHTML = '';
    items.forEach(p => {
      const card = document.createElement('article');
      card.className = 'card project-card';
      card.dataset.search = [p.title, p.summary, (p.tech || []).join(' ')].join(' ').toLowerCase();
      card.dataset.tech = (p.tech || []).join(',');
      card.innerHTML = `
        <h3>${p.title}</h3>
        <p>${p.summary || ''}</p>
        <p>${(p.tech || []).map(t => `<span class='badge'>${t}</span>`).join(' ')}</p>
        <p>${p.demo ? `<a href='${p.demo}' target='_blank' rel='noopener'>Live</a> · ` : ""}${p.repo ? `<a href='${p.repo}' target='_blank' rel='noopener'>Code</a>` : ""}</p>
      `;
      grid.appendChild(card);
    });
  }

  function populateTechFilter(projects) {
    const set = new Set();
    projects.forEach(p => (p.tech || []).forEach(t => set.add(t)));
    const techs = Array.from(set).sort();
    const sel = document.getElementById('tech-filter');
    techs.forEach(t => {
      const opt = document.createElement('option');
      opt.value = t; opt.textContent = t;
      sel.appendChild(opt);
    });
    setupFilters();
  }

  function setupFilters() {
    const search = document.getElementById('search');
    const tech = document.getElementById('tech-filter');
    const grid = document.getElementById('project-grid');

    function apply() {
      const q = (search.value || '').toLowerCase();
      const tf = tech.value;
      Array.from(grid.children).forEach(card => {
        const hay = card.dataset.search || '';
        const hasTech = !tf || (card.dataset.tech || '').split(',').includes(tf);
        const show = hay.includes(q) && hasTech;
        card.style.display = show ? '' : 'none';
      });
    }
    search.addEventListener('input', apply);
    tech.addEventListener('change', apply);
    apply();
  }
})();
