document.addEventListener('DOMContentLoaded', () => {
    /* Custom Cursor */
    const cursorDot = document.querySelector('.cursor-dot');
    
    // Disable default cursor
    document.body.style.cursor = 'none';

    window.addEventListener('mousemove', (e) => {
        const posX = e.clientX;
        const posY = e.clientY;

        cursorDot.style.left = `${posX}px`;
        cursorDot.style.top = `${posY}px`;
    });

    const hoverTargets = document.querySelectorAll('a, button, input, textarea, .project-row');
    hoverTargets.forEach(target => {
        target.addEventListener('mouseenter', () => {
            cursorDot.style.width = '30px';
            cursorDot.style.height = '30px';
            cursorDot.style.backgroundColor = 'transparent';
            cursorDot.style.border = '2px solid var(--accent-neon)';
        });
        target.addEventListener('mouseleave', () => {
            cursorDot.style.width = '12px';
            cursorDot.style.height = '12px';
            cursorDot.style.backgroundColor = 'var(--accent-neon)';
            cursorDot.style.border = 'none';
        });
    });

    /* Hero Text Animation */
    const heroName = document.getElementById('hero-name');
    if (heroName) {
        const nameText = heroName.innerText;
        heroName.innerText = '';
        
        const words = nameText.split(' ');
        words.forEach((word, index) => {
            const span = document.createElement('span');
            span.classList.add('word-span');
            span.innerText = word + ' ';
            heroName.appendChild(span);

            setTimeout(() => {
                span.classList.add('visible');
            }, 300 + (index * 150)); 
        });
    }

    /* Navbar Entrance Animation */
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        setTimeout(() => {
            navbar.classList.remove('hidden-nav');
        }, 800);
    }

    /* 1. SCROLL PROGRESS BAR */
    const scrollProgressBar = document.createElement('div');
    scrollProgressBar.style.position = 'fixed';
    scrollProgressBar.style.top = '0';
    scrollProgressBar.style.left = '0';
    scrollProgressBar.style.height = '2px';
    scrollProgressBar.style.backgroundColor = 'var(--accent-neon)';
    scrollProgressBar.style.boxShadow = '0 0 8px var(--accent-neon)';
    scrollProgressBar.style.zIndex = '9999';
    scrollProgressBar.style.pointerEvents = 'none';
    scrollProgressBar.style.width = '0%';
    document.body.appendChild(scrollProgressBar);

    /* Elements for unified scroll listener */
    const heroCenter = document.querySelector('.hero-center');
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    /* 4. COUNTER ANIMATION FOR STATS setup */
    const aboutSection = document.getElementById('about');
    const statValues = document.querySelectorAll('#about .stat-value');
    let countersTriggered = false;

    const animateCounter = (el, target, suffix, isFadeOnly) => {
        if (isFadeOnly) {
            el.style.opacity = '0';
            el.style.transition = 'opacity 0.5s ease-out 300ms';
            el.innerText = target;
            // Force reflow
            void el.offsetWidth;
            el.style.opacity = '1';
            return;
        }

        const duration = 1500;
        const startTime = performance.now();

        const updateCounter = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // ease-out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            
            const currentCount = Math.floor(eased * target);
            el.innerText = currentCount + suffix;

            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                el.innerText = target + suffix;
            }
        };

        requestAnimationFrame(updateCounter);
    };

    /* Unified Scroll Listener */
    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;

        /* Navbar Background Update */
        if (navbar) {
            if (scrollTop > 50) {
                navbar.style.background = 'rgba(8, 8, 8, 0.85)';
            } else {
                navbar.style.background = 'rgba(8, 8, 8, 0.6)';
            }
        }

        /* 1. PROGRESS BAR UPDATE */
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        scrollProgressBar.style.width = scrollPercent + '%';

        /* 2. HERO PARALLAX EFFECT */
        if (heroCenter) {
            const opacity = Math.max(0, 1 - scrollTop / 500);
            heroCenter.style.transform = `translateY(${scrollTop * 0.3}px)`;
            heroCenter.style.opacity = opacity.toString();
        }

        /* 3. ACTIVE NAV LINK */
        let currentId = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            const sectionHeight = section.offsetHeight;
            if (scrollTop >= sectionTop && scrollTop < sectionTop + sectionHeight) {
                currentId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active-link');
            if (link.getAttribute('href') === `#${currentId}`) {
                link.classList.add('active-link');
            }
        });

        /* 4. COUNTER ANIMATION TRIGGER */
        if (aboutSection && statValues.length > 0 && !countersTriggered) {
            const rect = aboutSection.getBoundingClientRect();
            if (rect.top < window.innerHeight * 0.7) {
                countersTriggered = true;
                statValues.forEach(el => {
                    const text = el.innerText.trim();
                    if (text === '2+') {
                        animateCounter(el, 2, '+', false);
                    } else if (text === '4 Mo') {
                        animateCounter(el, 4, ' Mo', false);
                    } else if (text === 'A+') {
                        animateCounter(el, 'A+', '', true);
                    }
                });
            }
        }
    });

    /* Intersection Observer for standard fade-ups */
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 
    };

    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                if (entry.target.classList.contains('section-heading')) {
                    const nextEl = entry.target.nextElementSibling;
                    if(nextEl && nextEl.classList.contains('fade-up')) {
                        setTimeout(() => {
                            nextEl.classList.add('visible');
                        }, 200); 
                    }
                }
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const fadeUpElements = document.querySelectorAll('.fade-up');
    const applyStaggeredDelay = (elements) => {
        elements.forEach((el, index) => {
            el.style.transitionDelay = `${index * 0.1}s`;
            scrollObserver.observe(el);
        });
    };

    const projectRows = document.querySelectorAll('.project-row');
    applyStaggeredDelay(projectRows);

    fadeUpElements.forEach(el => {
        scrollObserver.observe(el);
    });

    /* 5. STAGGERED SKILL CARD ANIMATION */
    const skillCards = document.querySelectorAll('.skill-card');
    const cardObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { root: null, threshold: 0.1 });

    skillCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.04}s`;
        cardObserver.observe(card);
    });
});
