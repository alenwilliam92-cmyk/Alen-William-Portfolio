document.addEventListener('DOMContentLoaded', () => {
    /* Custom Cursor */
    const cursorDot = document.querySelector('.cursor-dot');

    if (cursorDot && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
        document.body.classList.add('custom-cursor-enabled');

        window.addEventListener('mousemove', (e) => {
            cursorDot.style.left = `${e.clientX}px`;
            cursorDot.style.top = `${e.clientY}px`;
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
    }

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
    const skillCards = document.querySelectorAll('.masonry-item');
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
        const frameCache = new Map();
        const missingFrames = new Set();
        const callouts = [
            { el: document.getElementById('callout-1'), start: 0.20 },
            { el: document.getElementById('callout-2'), start: 0.40 },
            { el: document.getElementById('callout-3'), start: 0.60 },
            { el: document.getElementById('callout-4'), start: 0.78 },
            { el: document.getElementById('callout-5'), start: 0.88 },
            { el: document.getElementById('callout-6'), start: 0.92 },
        ];

        let currentFrameIndex = -1;
        let lastDrawnImage = null;
        let rafPending = false;
        let preloadRadius = window.matchMedia('(max-width: 768px)').matches ? 3 : 8;

        const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

        const getFrameSrc = (frameIndex) => {
            const imageNumber = String(frameIndex + 1).padStart(3, '0');
            return `public/images/aboutsection/ezgif-frame-${imageNumber}.png`;
        };

        const paintFallback = () => {
            if (aboutCanvas.width === 0 || aboutCanvas.height === 0) {
                aboutCanvas.width = 1280;
                aboutCanvas.height = 720;
            }
            ctx.fillStyle = '#141414';
            ctx.fillRect(0, 0, aboutCanvas.width, aboutCanvas.height);
        };

        const resizeBackingStore = (img) => {
            if (!img || img.naturalWidth === 0 || img.naturalHeight === 0) return false;
            if (aboutCanvas.width !== img.naturalWidth || aboutCanvas.height !== img.naturalHeight) {
                aboutCanvas.width = img.naturalWidth;
                aboutCanvas.height = img.naturalHeight;
            }
            return true;
        };

        const drawImageFrame = (img, requestedFrameIndex, isExactFrame) => {
            if (!resizeBackingStore(img)) return false;
            ctx.drawImage(img, 0, 0);
            lastDrawnImage = img;
            if (isExactFrame) currentFrameIndex = requestedFrameIndex;
            return true;
        };

        const scheduleCanvasUpdate = () => {
            if (rafPending) return;
            rafPending = true;
            requestAnimationFrame(() => {
                rafPending = false;
                updateCanvas();
            });
        };

        const requestFrame = (frameIndex, priority = false) => {
            if (frameIndex < 0 || frameIndex >= frameCount) return null;
            if (frameCache.has(frameIndex)) return frameCache.get(frameIndex);

            const img = new Image();
            const src = getFrameSrc(frameIndex);
            const record = { img, src, status: 'loading' };
            frameCache.set(frameIndex, record);

            img.decoding = 'async';
            img.loading = priority ? 'eager' : 'lazy';

            img.onload = () => {
                record.status = 'loaded';
                scheduleCanvasUpdate();
            };

            img.onerror = () => {
                record.status = 'error';
                if (!missingFrames.has(frameIndex)) {
                    missingFrames.add(frameIndex);
                    console.error(`Canvas frame failed to load: ${src}`);
                }
                scheduleCanvasUpdate();
            };

            img.src = src;

            if (img.complete && img.naturalWidth > 0) {
                record.status = 'loaded';
            }

            return record;
        };

        const preloadNearbyFrames = (centerIndex) => {
            const start = clamp(centerIndex - preloadRadius, 0, frameCount - 1);
            const end = clamp(centerIndex + preloadRadius, 0, frameCount - 1);

            requestFrame(centerIndex, true);

            for (let offset = 1; offset <= preloadRadius; offset++) {
                requestFrame(centerIndex + offset);
                requestFrame(centerIndex - offset);
            }

            for (const [frameIndex, record] of frameCache) {
                const isOutsideWindow = frameIndex < start - preloadRadius || frameIndex > end + preloadRadius;
                if (isOutsideWindow && record.status !== 'loading' && frameIndex !== currentFrameIndex) {
                    frameCache.delete(frameIndex);
                }
            }
        };

        const findNearestLoadedFrame = (targetIndex) => {
            const exact = frameCache.get(targetIndex);
            if (exact?.status === 'loaded') return { img: exact.img, index: targetIndex, exact: true };

            for (let offset = 1; offset < frameCount; offset++) {
                const beforeIndex = targetIndex - offset;
                const afterIndex = targetIndex + offset;
                const before = frameCache.get(beforeIndex);
                const after = frameCache.get(afterIndex);

                if (before?.status === 'loaded') return { img: before.img, index: beforeIndex, exact: false };
                if (after?.status === 'loaded') return { img: after.img, index: afterIndex, exact: false };
            }

            return lastDrawnImage ? { img: lastDrawnImage, index: currentFrameIndex, exact: false } : null;
        };

        const getScrollProgress = () => {
            const rect = canvasSequence.getBoundingClientRect();
            const scrollDistance = Math.max(1, rect.height - window.innerHeight);
            return clamp(-rect.top / scrollDistance, 0, 1);
        };

        const updateCallouts = (progress) => {
            callouts.forEach(({ el, start }) => {
                if (!el) return;
                el.classList.toggle('visible', progress >= start && progress < start + 0.18);
            });
        };

        const updateCanvas = () => {
            const progress = getScrollProgress();
            updateCallouts(progress);

            const frameIndex = clamp(Math.round(progress * (frameCount - 1)), 0, frameCount - 1);
            preloadNearbyFrames(frameIndex);

            const frame = findNearestLoadedFrame(frameIndex);
            if (!frame) {
                paintFallback();
                return;
            }

            if (frame.exact && frame.index === currentFrameIndex) return;
            drawImageFrame(frame.img, frameIndex, frame.exact);
        };

        const firstFrame = requestFrame(0, true);
        if (firstFrame?.status === 'loaded') {
            drawImageFrame(firstFrame.img, 0, true);
        } else {
            paintFallback();
        }

        preloadNearbyFrames(0);
        scheduleCanvasUpdate();

        window.addEventListener('scroll', scheduleCanvasUpdate, { passive: true });

        window.addEventListener('resize', () => {
            preloadRadius = window.matchMedia('(max-width: 768px)').matches ? 3 : 8;
            currentFrameIndex = -1;
            scheduleCanvasUpdate();
        }, { passive: true });

        window.addEventListener('load', scheduleCanvasUpdate, { once: true });
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
