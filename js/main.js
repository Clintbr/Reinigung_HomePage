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

    // 3. Form Handling (Inquiry & Contact Forms)
    const quoteForms = document.querySelectorAll('form.inquiry-form, form.contact-form');
    quoteForms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn ? submitBtn.innerHTML : 'Absenden';
            
            // Show loading state
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

            // Simulate server response
            setTimeout(() => {
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalText;
                }
                
                // Show success banner in form or toast
                const successBanner = form.parentElement.querySelector('.form-success-banner');
                if (successBanner) {
                    successBanner.classList.add('active');
                    form.reset();
                    successBanner.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                } else {
                    showToast('Vielen Dank! Ihre Anfrage wurde erfolgreich übermittelt. Wir melden uns innerhalb von 24 Stunden bei Ihnen.');
                    form.reset();
                }
            }, 800);
        });
    });

    // 4. Toast Notification helper
    function showToast(message) {
        let toastContainer = document.querySelector('.toast-container');
        if (!toastContainer) {
            toastContainer = document.createElement('div');
            toastContainer.className = 'toast-container';
            document.body.appendChild(toastContainer);
        }

        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.innerHTML = `
            <svg style="width:20px;height:20px;color:#22C55E;flex-shrink:0;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M20 6 9 17l-5-5"/>
            </svg>
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

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            galleryItems.forEach(item => {
                const category = item.getAttribute('data-category');
                if (filterValue === 'all' || category === filterValue) {
                    item.style.display = 'flex';
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

    // 7. Auto-select service in dropdown if URL parameter exists (e.g. ?service=fenster)
    const urlParams = new URLSearchParams(window.location.search);
    const serviceParam = urlParams.get('service');
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
            const isMobile = window.innerWidth <= 768;
            const isTablet = window.innerWidth <= 1024 && window.innerWidth > 768;

            const spacing = isMobile ? 180 : (isTablet ? 270 : 350);
            const farSpacing = isMobile ? 270 : (isTablet ? 430 : 580);
            const zDistance = isMobile ? -50 : -80;
            const zFarDistance = isMobile ? -120 : -180;
            const rotY = isMobile ? 22 : 28;
            const rotYFar = isMobile ? 36 : 45;

            cards.forEach((card, index) => {
                let offset = index - currentIndex;
                // Normalize offset into range [-2, 2] for 5 cards
                while (offset > Math.floor(total / 2)) offset -= total;
                while (offset < -Math.floor(total / 2)) offset += total;

                card.classList.remove('is-active');

                if (offset === 0) {
                    // Center Active Card - Maximum Brightness & Elevation
                    card.classList.add('is-active');
                    card.style.transform = `translateX(-50%) translateY(-50%) translateZ(80px) scale(${isMobile ? 1.0 : 1.06}) rotateY(0deg)`;
                    card.style.opacity = '1';
                    card.style.filter = 'brightness(1.04) contrast(1.02)';
                    card.style.zIndex = '30';
                    card.style.pointerEvents = 'auto';
                } else if (Math.abs(offset) === 1) {
                    // Immediate Neighbor Cards - Approaching Focus (Brightening up)
                    const x = offset * spacing;
                    const r = offset * -rotY;
                    card.style.transform = `translateX(calc(-50% + ${x}px)) translateY(-50%) translateZ(${zDistance}px) scale(${isMobile ? 0.86 : 0.92}) rotateY(${r}deg)`;
                    card.style.opacity = isMobile ? '0.7' : '0.85';
                    card.style.filter = 'brightness(0.85) contrast(0.96)';
                    card.style.zIndex = '20';
                    card.style.pointerEvents = 'auto';
                } else {
                    // Far Cards - Dimmed and angled back
                    const x = (offset > 0 ? 1 : -1) * farSpacing;
                    const r = (offset > 0 ? 1 : -1) * -rotYFar;
                    card.style.transform = `translateX(calc(-50% + ${x}px)) translateY(-50%) translateZ(${zFarDistance}px) scale(${isMobile ? 0.72 : 0.78}) rotateY(${r}deg)`;
                    card.style.opacity = isMobile ? '0.35' : '0.45';
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
