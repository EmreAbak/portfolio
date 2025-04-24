// Mouse hareket animasyonu için
document.addEventListener('mousemove', (e) => {
    const animatedBg = document.querySelector('.animated-bg');
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;
    
    animatedBg.style.background = `radial-gradient(circle at ${x * 100}% ${y * 100}%, 
        rgba(255,255,255,0.1) 0%, 
        transparent 70%)`;
});

// Sayfa yüklendiğinde animasyonları başlat
document.addEventListener('DOMContentLoaded', () => {
    // Mouse movement animation for hero section
    const hero = document.querySelector('.hero');
    const animatedBg = document.querySelector('.animated-bg');

    hero.addEventListener('mousemove', (e) => {
        const { clientX, clientY } = e;
        const { width, height } = hero.getBoundingClientRect();
        const x = (clientX / width - 0.5) * 2;
        const y = (clientY / height - 0.5) * 2;

        animatedBg.style.transform = `translate(${x * 10}px, ${y * 10}px)`;
        animatedBg.style.background = `radial-gradient(circle at ${clientX}px ${clientY}px, rgba(255,255,255,0.15) 0%, transparent 70%)`;
    });

    // Initialize tilt effect for project cards
    VanillaTilt.init(document.querySelectorAll('.project-card'), {
        max: 10,
        speed: 400,
        glare: true,
        'max-glare': 0.2,
    });

    // Smooth scroll for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add fade-in animation to sections
    const sections = document.querySelectorAll('section');
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                sectionObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        section.classList.add('fade-in');
        sectionObserver.observe(section);
    });
}); 