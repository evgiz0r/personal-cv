// Client-side renderer: load data.json and populate the page
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});

function el(tag, opts = {}) {
    const n = document.createElement(tag);
    if (opts.cls) n.className = opts.cls;
    if (opts.text) n.textContent = opts.text;
    if (opts.html) n.innerHTML = opts.html;
    if (opts.attrs) for (const k in opts.attrs) n.setAttribute(k, opts.attrs[k]);
    return n;
}

// Load data and render. Try fetching data.json first; if it fails (file:// or CORS),
// fall back to the embedded JSON in the page (id="data-fallback").
function loadData() {
    return fetch('data.json').then(r => {
        if (!r.ok) throw new Error('Fetch failed: ' + r.status);
        return r.json();
    }).catch(fetchErr => {
        console.warn('fetch(data.json) failed, trying embedded fallback:', fetchErr);
        const fallback = document.getElementById('data-fallback');
        if (fallback) {
            try {
                return Promise.resolve(JSON.parse(fallback.textContent));
            } catch (e) {
                return Promise.reject(e);
            }
        }
        return Promise.reject(fetchErr);
    });
}

loadData().then(data => {
    renderAbout(data);
    renderSkills(data.skills || []);
    renderProjects(data.projects || []);
    renderLinks(data.links || {});
    setupObservers();
    setupNavActive();
}).catch(err => console.error('Failed to load data from data.json or fallback:', err));

function renderAbout(data) {
    const c = document.getElementById('about-container');
    c.innerHTML = '';
    c.appendChild(el('h1', { text: data.name }));
    c.appendChild(el('p', { cls: 'subtitle', text: data.title }));
    c.appendChild(el('p', { cls: 'bio', text: data.bio }));
}

function renderSkills(skills) {
    const container = document.getElementById('skills-container');
    container.innerHTML = '';
    skills.forEach(s => {
        const card = el('div', { cls: 'skill-card', attrs: { tabindex: 0 }});
        const header = el('div', { cls: 'skill-header' });
        header.appendChild(el('h3', { text: s.name }));
        header.appendChild(el('span', { cls: 'skill-score', text: `${s.level}/5` }));
        const level = el('div', { cls: 'skill-level' });
        const percent = Math.max(0, Math.min(5, Number(s.level))) * 20 + '%';
        level.appendChild(el('div', { cls: 'skill-bar', attrs: { 'data-percent': percent }}));
        card.appendChild(header);
        card.appendChild(level);
        card.appendChild(el('div', { cls: 'skill-desc', text: s.desc || '' }));
        container.appendChild(card);
    });
}

function renderProjects(projects) {
    const c = document.getElementById('projects-container');
    c.innerHTML = '';
    if (!projects || projects.length === 0) {
        c.appendChild(el('div', { cls: 'project-card', html: '<h3>More projects coming soon</h3><p class="project-description">New projects will appear here as I build them.</p>' }));
        return;
    }
    projects.forEach(p => {
        const card = el('div', { cls: 'project-card' });
        card.appendChild(el('h3', { text: p.title }));
        if (p.description) card.appendChild(el('p', { cls: 'project-description', text: p.description }));
        if (p.tech && p.tech.length) {
            const techWrap = el('div', { cls: 'project-tech' });
            p.tech.forEach(t => techWrap.appendChild(el('span', { cls: 'tech-tag', text: t })));
            card.appendChild(techWrap);
        }
        if (p.github) card.appendChild(el('a', { cls: 'project-link', text: 'View on GitHub →', attrs: { href: p.github, target: '_blank', rel: 'noopener' }}));
        c.appendChild(card);
    });
}

function renderLinks(links) {
    const c = document.getElementById('links-container');
    c.innerHTML = '';
    function add(href, title, desc) {
        if (!href) return;
        const a = el('a', { cls: 'link-card', attrs: { href, target: '_blank', rel: 'noopener' } });
        a.appendChild(el('h3', { text: title }));
        if (desc) a.appendChild(el('p', { text: desc }));
        c.appendChild(a);
    }
    add(links.linkedin, 'LinkedIn', 'Professional profile');
    add(links.thingiverse, 'Thingiverse', '3D designs & models');
    add(links.chess, 'Chess.com', 'Chess profile');
    add(links.github, 'GitHub', 'All my repositories');
}

function setupObservers() {
    const options = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
    const skillObs = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const card = entry.target;
                card.classList.add('animate');
                card.querySelectorAll('.skill-bar').forEach(bar => {
                    const pct = bar.getAttribute('data-percent') || '0%';
                    setTimeout(() => bar.style.width = pct, 50);
                });
                obs.unobserve(card);
            }
        });
    }, options);
    document.querySelectorAll('.skill-card').forEach(card => {
        skillObs.observe(card);
        card.addEventListener('click', () => card.classList.toggle('expanded'));
        card.addEventListener('keypress', e => { if (e.key === 'Enter') card.classList.toggle('expanded'); });
    });

    const projObs = new IntersectionObserver((entries, obs) => {
        entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add('animate'); obs.unobserve(en.target); } });
    }, options);
    document.querySelectorAll('.project-card').forEach(c => projObs.observe(c));
}

function setupNavActive() {
    const navLinks = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('section');
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(s => { if (pageYOffset >= s.offsetTop - 200) current = s.getAttribute('id'); });
        navLinks.forEach(link => link.classList.toggle('active', link.getAttribute('href') === '#' + current));
    });
}

console.log('Portfolio renderer loaded');
