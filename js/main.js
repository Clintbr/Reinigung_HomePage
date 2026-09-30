import { EMAILJS_CONFIG } from './email-config.js';

document.addEventListener('DOMContentLoaded', () => {
    // 1. Sticky Header scroll effect
    const header = document.querySelector('.site-header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
            header?.classList.add('scrolled');
        } else {
            header?.classList.remove('scrolled');
        }
    }, { passive: true });

    // 2. Mobile Menu Drawer Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileDrawer = document.querySelector('.mobile-nav-drawer');
    const drawerBackdrop = document.querySelector('.drawer-backdrop');
    const drawerClose = document.querySelector('.drawer-close');

    function openDrawer() {
        mobileDrawer?.classList.add('active');
        drawerBackdrop?.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeDrawer() {
        mobileDrawer?.classList.remove('active');
        drawerBackdrop?.classList.remove('active');
        document.body.style.overflow = '';
    }

    menuToggle?.addEventListener('click', openDrawer);
    drawerClose?.addEventListener('click', closeDrawer);
    drawerBackdrop?.addEventListener('click', closeDrawer);

    // 3. EmailJS Form Handling (via import.meta.env)
    async function sendEmailJSForm(form) {
        if (!form) return false;

        const submitBtn = form.querySelector('button[type="submit"]');
        const originalBtnHtml = submitBtn ? submitBtn.innerHTML : 'Absenden';
        const formContainer = form.parentElement;
        const successBanner = formContainer?.querySelector('.form-success-banner');
        const errorBanner = formContainer?.querySelector('.form-error-banner');

        // Reset previous banners
        if (successBanner) successBanner.classList.remove('active');
        if (errorBanner) errorBanner.classList.remove('active');

        // Set loading state on button
        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.innerHTML = `
                <svg class="spin" style="width:18px;height:18px;animation:spin 1s linear infinite;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10" stroke-opacity="0.25"></circle>
                    <path d="M12 2a10 10 0 0 1 10 10"></path>
                </svg>
                Wird gesendet...
            `;
        }

        try {
            const publicKey = EMAILJS_CONFIG.PUBLIC_KEY;
            const serviceId = EMAILJS_CONFIG.SERVICE_ID;
            const templateId = EMAILJS_CONFIG.TEMPLATE_ID;

            const isConfigured = publicKey && publicKey !== 'YOUR_PUBLIC_KEY' &&
                                 serviceId && serviceId !== 'YOUR_SERVICE_ID' &&
                                 templateId && templateId !== 'YOUR_TEMPLATE_ID';

            if (!isConfigured) {
                console.warn('[EmailJS] Hinweis: Bitte tragen Sie Ihre EmailJS-Schlüssel in der .env Datei als VITE_EMAILJS_PUBLIC_KEY, VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID ein.');
                // Fallback simulation
                await new Promise(resolve => setTimeout(resolve, 800));
            } else {
                if (typeof emailjs === 'undefined') {
                    throw new Error('EmailJS SDK konnte nicht geladen werden.');
                }
                // Send form via EmailJS with secrets from import.meta.env
                await emailjs.sendForm(
                    serviceId,
                    templateId,
                    form,
                    publicKey
                );
            }

            // Success feedback
            if (successBanner) {
                successBanner.classList.add('active');
                successBanner.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            } else {
                showToast('Vielen Dank! Ihre Anfrage wurde erfolgreich übermittelt. Wir melden uns zeitnah bei Ihnen.', 'success');
            }

            form.reset();
            return true;

        } catch (error) {
            console.error('[EmailJS] Fehler beim Senden des Formulars:', error);
            
            if (errorBanner) {
                const errorMsgEl = errorBanner.querySelector('.error-msg-text');
                if (errorMsgEl && error?.text) {
                    errorMsgEl.textContent = `Fehler: ${error.text || error.message || 'Bitte versuchen Sie es erneut.'}`;
                }
                errorBanner.classList.add('active');
                errorBanner.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            } else {
                showToast('Es gab ein Problem beim Senden Ihrer Anfrage. Bitte versuchen Sie es erneut.', 'error');
            }
            return false;

        } finally {
            // Restore submit button state
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnHtml;
            }
        }
    }

    // Attach EmailJS handler to all inquiry and contact forms
    const quoteForms = document.querySelectorAll('form.inquiry-form, form.contact-form, form[data-emailjs]');
    quoteForms.forEach(form => {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            await sendEmailJSForm(form);
        });
    });

    // Expose functions globally for custom use
    window.sendEmailJSForm = sendEmailJSForm;
    window.showToast = showToast;

    // 4. Toast Notification helper
    function showToast(message, type = 'success') {
        let toastContainer = document.querySelector('.toast-container');
        if (!toastContainer) {
            toastContainer = document.createElement('div');
            toastContainer.className = 'toast-container';
            document.body.appendChild(toastContainer);
        }

        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        
        const icon = type === 'success' ? `
            <svg style="width:20px;height:20px;color:#22C55E;flex-shrink:0;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M20 6 9 17l-5-5"/>
            </svg>
        ` : `
            <svg style="width:20px;height:20px;color:#EF4444;flex-shrink:0;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
        `;

        toast.innerHTML = `
            ${icon}
            <span>${message}</span>
        `;

        toastContainer.appendChild(toast);

        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateY(10px)';
            toast.style.transition = 'all 0.3s ease';
            setTimeout(() => toast.remove(), 300);
        }, 5000);
    }

    // 5. Gallery Filter Logic
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    const galleryGrid = document.querySelector('.gallery-grid');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            if (galleryGrid) {
                galleryGrid.classList.toggle('is-filtered', filterValue !== 'all');
            }

            galleryItems.forEach(item => {
                const category = item.getAttribute('data-category');
                if (filterValue === 'all' || category === filterValue) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // 6. Gallery Lightbox Logic
    const lightboxModal = document.querySelector('.lightbox-modal');
    const lightboxImg = lightboxModal?.querySelector('.lightbox-img');
    const lightboxTitle = lightboxModal?.querySelector('.lightbox-title');
    const lightboxDesc = lightboxModal?.querySelector('.lightbox-desc');
    const lightboxClose = lightboxModal?.querySelector('.lightbox-close');

    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const img = item.querySelector('img');
            const title = item.querySelector('h3')?.textContent;
            const desc = item.querySelector('p')?.textContent;

            if (lightboxImg && img) lightboxImg.src = img.src;
            if (lightboxTitle && title) lightboxTitle.textContent = title;
            if (lightboxDesc && desc) lightboxDesc.textContent = desc;

            lightboxModal?.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    function closeLightbox() {
        lightboxModal?.classList.remove('active');
        document.body.style.overflow = '';
    }

    lightboxClose?.addEventListener('click', closeLightbox);
    lightboxModal?.addEventListener('click', (e) => {
        if (e.target === lightboxModal) {
            closeLightbox();
        }
    });

    // 7. Navbar Dropdown Interactions (Hover, Long Press, Mobile Submenu)
    const navDropdowns = document.querySelectorAll('.nav-item-dropdown');
    navDropdowns.forEach(dropdown => {
        const toggle = dropdown.querySelector('.dropdown-toggle, .dropdown-trigger');
        let longPressTimer = null;
        let isLongPress = false;
        let startX = 0;
        let startY = 0;

        // Long Press Handler for Mobile / Touch Devices
        toggle?.addEventListener('touchstart', (e) => {
            isLongPress = false;
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
            
            longPressTimer = setTimeout(() => {
                isLongPress = true;
                dropdown.classList.toggle('is-open');
                if (navigator.vibrate) {
                    navigator.vibrate(30);
                }
            }, 320); // 320ms hold triggers long-press menu
        }, { passive: true });

        toggle?.addEventListener('touchmove', (e) => {
            const moveX = Math.abs(e.touches[0].clientX - startX);
            const moveY = Math.abs(e.touches[0].clientY - startY);
            if (moveX > 10 || moveY > 10) {
                clearTimeout(longPressTimer);
            }
        }, { passive: true });

        toggle?.addEventListener('touchend', (e) => {
            clearTimeout(longPressTimer);
            if (isLongPress) {
                e.preventDefault();
            }
        });

        // Click on dropdown arrow icon specifically toggles menu on touch/desktop
        const arrow = dropdown.querySelector('.dropdown-arrow');
        arrow?.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            dropdown.classList.toggle('is-open');
        });
    });

    // Close desktop dropdown on outside click
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.nav-item-dropdown')) {
            navDropdowns.forEach(d => d.classList.remove('is-open'));
        }
    });

    // Mobile Drawer Submenu Accordion
    const drawerDropdowns = document.querySelectorAll('.drawer-dropdown');
    drawerDropdowns.forEach(drawerDrop => {
        const btn = drawerDrop.querySelector('.drawer-submenu-btn');
        btn?.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            drawerDrop.classList.toggle('is-open');
        });
    });

    // 8. Service Detail Sections Filtering & Single-Section Display (dienste.html)
    const serviceSections = document.querySelectorAll('.service-detail-section');
    const serviceFilterTabs = document.querySelectorAll('.services-tab-btn');
    const serviceFilterInfo = document.querySelector('.service-filter-info');
    const serviceFilterInfoText = document.querySelector('.service-filter-info-name');

    const serviceNames = {
        'gebaeudereinigung': 'Gebäudereinigung & Unterhalt',
        'fensterreinigung': 'Fenster- & Glasreinigung',
        'bueroreinigung': 'Büro- & Praxisreinigung',
        'grundreinigung': 'Grund- & Bauendreinigung',
        'hausmeisterservice': 'Hausmeisterservice & Objektbetreuung'
    };

    function showServiceSection(serviceId, updateUrl = true, smoothScroll = false) {
        if (!serviceSections || serviceSections.length === 0) return;

        // Clean serviceId (remove # or ? if present)
        const cleanId = (serviceId || '').replace(/^[#?]/, '').toLowerCase();

        const isValidService = cleanId && serviceNames[cleanId] && document.getElementById(cleanId);

        if (!isValidService || cleanId === 'all') {
            // Show all sections
            serviceSections.forEach(section => {
                section.classList.remove('is-hidden');
                section.classList.add('fade-in');
            });

            // Update Tab states
            serviceFilterTabs.forEach(tab => {
                tab.classList.toggle('active', tab.getAttribute('data-service') === 'all');
            });

            // Hide filter info
            if (serviceFilterInfo) {
                serviceFilterInfo.style.display = 'none';
            }

            if (updateUrl) {
                const url = new URL(window.location);
                url.searchParams.delete('service');
                window.history.pushState({ service: 'all' }, '', url.pathname + (url.search ? url.search : ''));
            }
        } else {
            // Show ONLY the clicked/selected section
            serviceSections.forEach(section => {
                if (section.id === cleanId) {
                    section.classList.remove('is-hidden');
                    section.classList.add('fade-in');
                } else {
                    section.classList.add('is-hidden');
                    section.classList.remove('fade-in');
                }
            });

            // Update Tab states
            serviceFilterTabs.forEach(tab => {
                tab.classList.toggle('active', tab.getAttribute('data-service') === cleanId);
            });

            // Show filter info
            if (serviceFilterInfo) {
                serviceFilterInfo.style.display = 'inline-flex';
                if (serviceFilterInfoText) {
                    serviceFilterInfoText.textContent = serviceNames[cleanId] || cleanId;
                }
            }

            if (updateUrl) {
                const url = new URL(window.location);
                url.searchParams.set('service', cleanId);
                window.history.pushState({ service: cleanId }, '', url.pathname + '?' + url.searchParams.toString());
            }

            if (smoothScroll) {
                const filterNav = document.querySelector('.services-filter-nav');
                if (filterNav) {
                    const topPos = filterNav.getBoundingClientRect().top + window.scrollY - 90;
                    window.scrollTo({ top: topPos, behavior: 'smooth' });
                }
            }
        }
    }

    // Tab buttons on dienste.html
    serviceFilterTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetService = tab.getAttribute('data-service');
            showServiceSection(targetService, true, true);
        });
    });

    // Reset button in filter info bar
    const filterResetBtn = document.querySelector('.service-filter-reset');
    filterResetBtn?.addEventListener('click', (e) => {
        e.preventDefault();
        showServiceSection('all', true, true);
    });

    // Intercept dropdown items when already on dienste.html
    const dropdownServiceLinks = document.querySelectorAll('[data-service-id]');
    dropdownServiceLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const serviceId = link.getAttribute('data-service-id');
            // If on dienste.html, perform in-page smooth single section filter
            if (window.location.pathname.endsWith('dienste.html') || window.location.pathname.endsWith('dienste')) {
                e.preventDefault();
                showServiceSection(serviceId, true, true);
                // Close dropdown & mobile drawer if open
                navDropdowns.forEach(d => d.classList.remove('is-open'));
                closeDrawer();
            }
        });
    });

    // Check URL parameter or hash on initial load (e.g. ?service=fensterreinigung or #fensterreinigung)
    const currentUrlParams = new URLSearchParams(window.location.search);
    const initialService = currentUrlParams.get('service') || window.location.hash.replace('#', '');
    if (initialService && serviceSections.length > 0) {
        showServiceSection(initialService, false, false);
    }

    // React to browser Back/Forward navigation
    window.addEventListener('popstate', (e) => {
        if (serviceSections.length > 0) {
            const stateService = e.state?.service || new URLSearchParams(window.location.search).get('service') || 'all';
            showServiceSection(stateService, false, false);
        }
    });

    // 9. Auto-select service in form dropdown if URL parameter exists (e.g. ?service=fenster)
    const serviceParam = currentUrlParams.get('service');
    if (serviceParam) {
        const serviceSelect = document.querySelector('#service-select, select[name="dienstleistung"]');
        if (serviceSelect) {
            for (let option of serviceSelect.options) {
                if (option.value.toLowerCase().includes(serviceParam.toLowerCase()) || 
                    option.text.toLowerCase().includes(serviceParam.toLowerCase())) {
                    option.selected = true;
                    break;
                }
            }
        }
    }

    // 8. Responsive 3D Carousel (Unsere Dienste)
    const carousel = document.getElementById('services-carousel');
    if (carousel) {
        const stage = carousel.querySelector('.carousel-3d-stage');
        const cards = Array.from(carousel.querySelectorAll('.carousel-3d-track .service-card'));
        const dots = Array.from(carousel.querySelectorAll('.carousel-dot'));
        const btnPrev = carousel.querySelector('.carousel-btn-prev');
        const btnNext = carousel.querySelector('.carousel-btn-next');
        const total = cards.length;
        let currentIndex = 0;

        function updateCarousel() {
            const width = window.innerWidth;
            const isTiny = width <= 420;
            const isMobile = width <= 768 && width > 420;
            const isTablet = width <= 1024 && width > 768;

            const spacing = isTiny ? 105 : (isMobile ? 160 : (isTablet ? 270 : 350));
            const farSpacing = isTiny ? 160 : (isMobile ? 240 : (isTablet ? 430 : 580));
            const zDistance = isTiny ? -35 : (isMobile ? -50 : -80);
            const zFarDistance = isTiny ? -80 : (isMobile ? -120 : -180);
            const rotY = isTiny ? 18 : (isMobile ? 22 : 28);
            const rotYFar = isTiny ? 30 : (isMobile ? 36 : 45);

            cards.forEach((card, index) => {
                let offset = index - currentIndex;
                // Normalize offset into range [-2, 2] for 5 cards
                while (offset > Math.floor(total / 2)) offset -= total;
                while (offset < -Math.floor(total / 2)) offset += total;

                card.classList.remove('is-active');

                if (offset === 0) {
                    // Center Active Card - Maximum Brightness & Elevation
                    card.classList.add('is-active');
                    card.style.transform = `translateX(-50%) translateY(-50%) translateZ(80px) scale(${isTiny ? 0.95 : (isMobile ? 1.0 : 1.06)}) rotateY(0deg)`;
                    card.style.opacity = '1';
                    card.style.filter = 'brightness(1.04) contrast(1.02)';
                    card.style.zIndex = '30';
                    card.style.pointerEvents = 'auto';
                } else if (Math.abs(offset) === 1) {
                    // Immediate Neighbor Cards - Approaching Focus (Brightening up)
                    const x = offset * spacing;
                    const r = offset * -rotY;
                    card.style.transform = `translateX(calc(-50% + ${x}px)) translateY(-50%) translateZ(${zDistance}px) scale(${isTiny ? 0.78 : (isMobile ? 0.84 : 0.92)}) rotateY(${r}deg)`;
                    card.style.opacity = isTiny ? '0.5' : (isMobile ? '0.7' : '0.85');
                    card.style.filter = 'brightness(0.85) contrast(0.96)';
                    card.style.zIndex = '20';
                    card.style.pointerEvents = 'auto';
                } else {
                    // Far Cards - Dimmed and angled back
                    const x = (offset > 0 ? 1 : -1) * farSpacing;
                    const r = (offset > 0 ? 1 : -1) * -rotYFar;
                    card.style.transform = `translateX(calc(-50% + ${x}px)) translateY(-50%) translateZ(${zFarDistance}px) scale(${isTiny ? 0.62 : (isMobile ? 0.70 : 0.78)}) rotateY(${r}deg)`;
                    card.style.opacity = isTiny ? '0.2' : (isMobile ? '0.35' : '0.45');
                    card.style.filter = 'brightness(0.65) contrast(0.92)';
                    card.style.zIndex = '10';
                    card.style.pointerEvents = 'auto';
                }
            });

            // Update Dots
            dots.forEach((dot, idx) => {
                dot.classList.toggle('active', idx === currentIndex);
            });
        }

        function goTo(index) {
            currentIndex = (index + total) % total;
            updateCarousel();
        }

        function next() {
            goTo(currentIndex + 1);
        }

        function prev() {
            goTo(currentIndex - 1);
        }

        // Switch Buttons (Left / Right)
        btnNext?.addEventListener('click', (e) => {
            e.stopPropagation();
            next();
        });
        btnPrev?.addEventListener('click', (e) => {
            e.stopPropagation();
            prev();
        });

        // Clicking on cards
        cards.forEach((card, index) => {
            card.addEventListener('click', (e) => {
                if (e.target.closest('a') && card.classList.contains('is-active')) {
                    return;
                }
                if (index !== currentIndex) {
                    e.preventDefault();
                    goTo(index);
                }
            });
        });

        // Indicator Dots
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => goTo(index));
        });

        // Mouse Wheel Scroll (Up / Down) to rotate
        let wheelTimeout = null;
        let wheelAccumulator = 0;
        carousel.addEventListener('wheel', (e) => {
            const delta = e.deltaY || e.deltaX;
            wheelAccumulator += delta;

            if (Math.abs(wheelAccumulator) >= 35) {
                e.preventDefault();
                if (wheelAccumulator > 0) {
                    next();
                } else {
                    prev();
                }
                wheelAccumulator = 0;
            }

            clearTimeout(wheelTimeout);
            wheelTimeout = setTimeout(() => {
                wheelAccumulator = 0;
            }, 200);
        }, { passive: false });

        // Touch Swipe (Left / Right)
        let touchStartX = 0;
        let touchDeltaX = 0;

        carousel.addEventListener('touchstart', (e) => {
            touchStartX = e.touches[0].clientX;
            touchDeltaX = 0;
        }, { passive: true });

        carousel.addEventListener('touchmove', (e) => {
            touchDeltaX = e.touches[0].clientX - touchStartX;
        }, { passive: true });

        carousel.addEventListener('touchend', () => {
            if (Math.abs(touchDeltaX) > 40) {
                if (touchDeltaX < 0) {
                    next();
                } else {
                    prev();
                }
            }
            touchDeltaX = 0;
        });

        // Mouse Drag (Left / Right)
        let isMouseDown = false;
        let mouseStartX = 0;
        let mouseDeltaX = 0;

        stage?.addEventListener('mousedown', (e) => {
            if (e.target.closest('button, a')) return;
            isMouseDown = true;
            mouseStartX = e.clientX;
            mouseDeltaX = 0;
        });

        window.addEventListener('mousemove', (e) => {
            if (!isMouseDown) return;
            mouseDeltaX = e.clientX - mouseStartX;
        });

        window.addEventListener('mouseup', () => {
            if (!isMouseDown) return;
            isMouseDown = false;
            if (Math.abs(mouseDeltaX) > 35) {
                if (mouseDeltaX < 0) {
                    next();
                } else {
                    prev();
                }
            }
            mouseDeltaX = 0;
        });

        // Keyboard Navigation (Left / Right / Up / Down)
        carousel.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
                e.preventDefault();
                next();
            } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
                e.preventDefault();
                prev();
            }
        });

        // Window resize listener
        window.addEventListener('resize', updateCarousel, { passive: true });

        // Initial setup
        updateCarousel();
    }
});
