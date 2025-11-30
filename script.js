// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add animation to skill bars on scroll into view
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // animate the visible card: expand bars from 0 to their data-percent
            entry.target.classList.add('animate');
            const bars = entry.target.querySelectorAll('.skill-bar');
            bars.forEach(bar => {
                const pct = bar.dataset.percent || bar.getAttribute('data-percent') || bar.style.width || '0%';
                // apply after a short delay so transition shows
                setTimeout(() => { bar.style.width = pct; }, 50);
            });
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe skill cards
document.querySelectorAll('.skill-card').forEach(card => {
    observer.observe(card);
    // toggle description on click / keyboard enter
    card.addEventListener('click', () => card.classList.toggle('expanded'));
    card.addEventListener('keypress', (e) => { if (e.key === 'Enter') card.classList.toggle('expanded'); });
});

// Observe project cards
document.querySelectorAll('.project-card').forEach(card => {
    observer.observe(card);
});

// Add active state to nav links based on scroll position
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
});

console.log('Portfolio loaded successfully!');
