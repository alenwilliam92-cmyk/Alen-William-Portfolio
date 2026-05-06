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

    const hoverTargets = document.querySelectorAll('a, button, input, textarea, .project-card');
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

    /* Cyber Glitch Text Animation (Preserved) */
    const displayNames = document.querySelectorAll('.display-name');
    const CHARS = "!<>-_\\/[]{}—=+*^?#_";

    displayNames.forEach(nameEl => {
        const originalText = nameEl.innerText.trim();
        nameEl.innerHTML = '';
        
        const container = document.createElement('div');
        container.className = 'cyber-glitch-container';
        
        const mainSpan = document.createElement('span');
        mainSpan.className = 'cyber-text-main';
        mainSpan.innerText = originalText;
        
        const layer1 = document.createElement('span');
        layer1.className = 'cyber-text-layer red-layer';
        layer1.setAttribute('aria-hidden', 'true');
        layer1.style.display = 'none';
        
        const layer2 = document.createElement('span');
        layer2.className = 'cyber-text-layer blue-layer';
        layer2.setAttribute('aria-hidden', 'true');
        layer2.style.display = 'none';
        
        const scanline = document.createElement('div');
        scanline.className = 'cyber-scanline';
        scanline.style.display = 'none';
        
        container.appendChild(mainSpan);
        container.appendChild(layer1);
        container.appendChild(layer2);
        container.appendChild(scanline);
        nameEl.appendChild(container);
        
        const scrambleDuration = 40;
        let intervalRef = null;
        
        const updateText = (newText) => {
            mainSpan.innerText = newText;
            layer1.innerText = newText;
            layer2.innerText = newText;
        };
        
        const scramble = () => {
            let iteration = 0;
            clearInterval(intervalRef);
            
            intervalRef = setInterval(() => {
                const currentText = originalText
                    .split("")
                    .map((letter, index) => {
                        if (index < iteration) {
                            return originalText[index];
                        }
                        if (letter === " ") return " ";
                        return CHARS[Math.floor(Math.random() * CHARS.length)];
                    })
                    .join("");
                    
                updateText(currentText);
                    
                if (iteration >= originalText.length) {
                    clearInterval(intervalRef);
                    updateText(originalText);
                }
                
                iteration += 1 / 3;
            }, scrambleDuration);
        };
        
        scramble();
        
        nameEl.addEventListener('mouseenter', () => {
            layer1.style.display = 'block';
            layer2.style.display = 'block';
            scanline.style.display = 'block';
            nameEl.classList.add('is-hovered');
            scramble();
        });
        
        nameEl.addEventListener('mouseleave', () => {
            layer1.style.display = 'none';
            layer2.style.display = 'none';
            scanline.style.display = 'none';
            nameEl.classList.remove('is-hovered');
        });
    });

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
    const statValues = document.querySelectorAll('#about .stat-val');
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
                    } else if (text === '4Mo') {
                        animateCounter(el, 4, 'Mo', false);
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

    const projectCards = document.querySelectorAll('.project-card');
    applyStaggeredDelay(projectCards);

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

    /* 6. CANVAS SCROLL ANIMATION FOR ABOUT SECTION */
    const aboutCanvas = document.getElementById("about-canvas");
    const canvasSequence = document.getElementById("about-canvas-sequence");
    
    if (aboutCanvas && canvasSequence) {
        const ctx = aboutCanvas.getContext("2d", { alpha: false });
        const frameCount = 240;
        const images = [];
        let currentFrameIndex = -1;
        let canvasReady = false;

        // Initialise canvas dimensions and paint frame 0 — called exactly once
        const initCanvas = () => {
            if (canvasReady) return;
            const img = images[0];
            if (!img || !img.naturalWidth) return;
            aboutCanvas.width = img.naturalWidth;
            aboutCanvas.height = img.naturalHeight;
            ctx.drawImage(img, 0, 0);
            currentFrameIndex = 0;
            canvasReady = true;
        };

        // Preload frames (ezgif-frame-001.png to ezgif-frame-240.png)
        for (let i = 1; i <= frameCount; i++) {
            const img = new Image();
            const index = i.toString().padStart(3, '0');
            img.src = `public/images/aboutsection/ezgif-frame-${index}.png`;
            images.push(img);
        }

        // For frame 0: handle both cached (already complete) and fresh load
        if (images[0].complete && images[0].naturalWidth > 0) {
            // Image already in browser cache — onload will never fire
            initCanvas();
        } else {
            images[0].onload = initCanvas;
        }

        const updateCanvas = () => {
            // Don't attempt to draw before the canvas is initialised
            if (!canvasReady) return;

            const rect = canvasSequence.getBoundingClientRect();
            const maxScroll = rect.height - window.innerHeight;
            
            if (maxScroll <= 0) return;
            
            let progress = -rect.top / maxScroll;
            progress = Math.max(0, Math.min(1, progress));
            
            // Callout visibility: each appears at its start %, exits after 18% window
            const callouts = [
                { el: document.getElementById('callout-1'), start: 0.20 },
                { el: document.getElementById('callout-2'), start: 0.40 },
                { el: document.getElementById('callout-3'), start: 0.60 },
                { el: document.getElementById('callout-4'), start: 0.78 },
                { el: document.getElementById('callout-5'), start: 0.88 },
                { el: document.getElementById('callout-6'), start: 0.92 },
            ];
            callouts.forEach(({ el, start }) => {
                if (!el) return;
                const end = start + 0.18;
                if (progress >= start && progress < end) {
                    el.classList.add('visible');
                } else {
                    el.classList.remove('visible');
                }
            });
            
            const frameIndex = Math.min(frameCount - 1, Math.floor(progress * frameCount));
            
            // Only draw if the image is fully decoded and the frame has changed
            if (frameIndex !== currentFrameIndex && images[frameIndex] && images[frameIndex].complete && images[frameIndex].naturalWidth > 0) {
                ctx.drawImage(images[frameIndex], 0, 0);
                currentFrameIndex = frameIndex;
            }
        };

        let canvasTicking = false;
        window.addEventListener('scroll', () => {
            if (!canvasTicking) {
                requestAnimationFrame(() => {
                    updateCanvas();
                    canvasTicking = false;
                });
                canvasTicking = true;
            }
        });
        
        window.addEventListener('resize', () => {
            requestAnimationFrame(updateCanvas);
        });
    }
});


/* Contact Form Submission and Modal Logic */
document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contact-form');
    const successModal = document.getElementById('contact-success-modal');
    const closeModalBtn = document.getElementById('modal-close');

    if (contactForm && successModal) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const submitBtn = contactForm.querySelector('.submit-btn');
            const originalBtnText = submitBtn.innerText;
            
            // Visual feedback: Sending...
            submitBtn.innerText = 'EXECUTING...';
            submitBtn.style.opacity = '0.7';
            submitBtn.disabled = true;

            const formData = new FormData(contactForm);
            
            try {
                // Submit to Google Form
                // Note: mode 'no-cors' is required for Google Forms cross-origin POST
                await fetch(contactForm.action, {
                    method: 'POST',
                    body: formData,
                    mode: 'no-cors'
                });

                // Show success modal
                successModal.classList.add('active');
                
                // Reset form
                contactForm.reset();
            } catch (error) {
                console.error('Submission error:', error);
                alert('An error occurred. Please try again or email me directly.');
            } finally {
                // Restore button state
                submitBtn.innerText = originalBtnText;
                submitBtn.style.opacity = '1';
                submitBtn.disabled = false;
            }
        });
    }

    if (closeModalBtn && successModal) {
        closeModalBtn.addEventListener('click', () => {
            successModal.classList.remove('active');
        });

        // Close modal when clicking outside the terminal window
        successModal.addEventListener('click', (e) => {
            if (e.target === successModal) {
                successModal.classList.remove('active');
            }
        });
    }
});
