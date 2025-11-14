// Scroll-triggered animations for Pine Valley Tree Services

// Intersection Observer for scroll animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

// Create observer
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            // Optional: stop observing after animation
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', () => {
    // Add animation classes to elements
    const animateElements = [
        // Service cards
        '.service-card',
        '.service-item',

        // Timeline items
        '.timeline-item',

        // Review cards
        '.review-card',

        // Benefit cards
        '.benefit-card',

        // Value cards
        '.value-card',

        // Stats
        '.stat-item',

        // Contact page sections
        '.contact-info-wrapper',
        '.hours-wrapper',
        '.quote-wrapper',
        '.firewood-wrapper',

        // About sections
        '.about-story',
        '.qualifications',
        '.team-section',

        // CTA sections
        '.cta-section'
    ];

    // Observe all elements with stagger effect
    animateElements.forEach((selector, index) => {
        const elements = document.querySelectorAll(selector);
        elements.forEach((el, i) => {
            // Add different animation types based on element
            if (selector.includes('timeline')) {
                el.classList.add('fade-slide-left');
            } else if (selector.includes('benefit') || selector.includes('value')) {
                el.classList.add('fade-scale');
            } else if (selector.includes('review')) {
                el.classList.add('fade-slide-up');
            } else if (selector.includes('stat')) {
                el.classList.add('fade-pop');
            } else {
                el.classList.add('fade-slide-up');
            }

            // Add stagger delay
            el.style.transitionDelay = `${i * 0.1}s`;

            // Observe the element
            observer.observe(el);
        });
    });

    // Add parallax effect to hero sections
    const heroSections = document.querySelectorAll('.hero-split, .page-header');

    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;

        heroSections.forEach(hero => {
            const heroOffset = hero.offsetTop;
            const heroHeight = hero.offsetHeight;

            if (scrolled >= heroOffset - window.innerHeight && scrolled <= heroOffset + heroHeight) {
                const parallaxAmount = (scrolled - heroOffset) * 0.3;
                hero.style.transform = `translateY(${parallaxAmount}px)`;
            }
        });
    });

    // Add smooth counting animation for stats
    const statNumbers = document.querySelectorAll('.stat-number');

    statNumbers.forEach(stat => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = entry.target;
                    const finalValue = target.textContent;
                    const isNumeric = /^\d+$/.test(finalValue);

                    if (isNumeric) {
                        const duration = 2000; // 2 seconds
                        const steps = 60;
                        const increment = parseInt(finalValue) / steps;
                        let current = 0;
                        let step = 0;

                        const counter = setInterval(() => {
                            step++;
                            current += increment;

                            if (step >= steps) {
                                target.textContent = finalValue;
                                clearInterval(counter);
                            } else {
                                target.textContent = Math.floor(current);
                            }
                        }, duration / steps);
                    }

                    observer.unobserve(target);
                }
            });
        }, { threshold: 0.5 });

        observer.observe(stat);
    });

    // Add hover tilt effect to cards
    const cards = document.querySelectorAll('.service-card, .review-card, .benefit-card, .value-card');

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
        });
    });
});
