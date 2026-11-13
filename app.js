document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================
       1. EFECTO DE SCROLL EN NAVBAR
       ========================================== */
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    /* ==========================================
       2. MENÚ MÓVIL RESPONSIVE
       ========================================== */
    const menuToggle = document.getElementById('menuToggle');
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');

    if (menuToggle && navbar) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('open');
            navbar.classList.toggle('open');
        });

        // Cerrar menú al hacer clic en cualquier enlace
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('open');
                navbar.classList.remove('open');
                
                // Actualizar clase activa del enlace
                navLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
            });
        });
    }

    /* ==========================================
       3. HÉROE SLIDESHOW AUTOMÁTICO
       ========================================== */
    const slides = document.querySelectorAll('.hero-slide');
    const indicators = document.querySelectorAll('.hero-indicators .indicator');
    let currentSlide = 0;
    let slideInterval;

    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        indicators.forEach(ind => ind.classList.remove('active'));
        
        slides[index].classList.add('active');
        indicators[index].classList.add('active');
        currentSlide = index;
    }

    function nextSlide() {
        let next = (currentSlide + 1) % slides.length;
        showSlide(next);
    }

    function startSlideShow() {
        slideInterval = setInterval(nextSlide, 5000); // Cambia cada 5 segundos
    }

    function stopSlideShow() {
        clearInterval(slideInterval);
    }

    // Inicializar slideshow si existen elementos
    if (slides.length > 0) {
        startSlideShow();

        // Control con los indicadores
        indicators.forEach(indicator => {
            indicator.addEventListener('click', (e) => {
                stopSlideShow();
                const index = parseInt(e.target.getAttribute('data-slide'));
                showSlide(index);
                startSlideShow();
            });
        });
    }

    /* ==========================================
       4. FILTRO DE CATÁLOGO / GALERÍA
       ========================================== */
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item-wrapper');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remover clase active de todos los botones y añadirla al seleccionado
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            portfolioItems.forEach(item => {
                if (filterValue === 'all' || item.classList.contains(filterValue)) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300); // Coincide con la transición CSS
                }
            });
        });
    });

    /* ==========================================
       5. MODAL DE GALERÍA (LIGHTBOX)
       ========================================== */
    const lightboxModal = document.getElementById('lightboxModal');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxTitle = document.getElementById('lightboxTitle');
    const lightboxClose = document.getElementById('lightboxClose');
    const viewButtons = document.querySelectorAll('.view-gallery-btn');

    if (lightboxModal && lightboxImg && lightboxTitle && lightboxClose) {
        viewButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const imgSrc = btn.getAttribute('data-img');
                const titleText = btn.getAttribute('data-title');
                
                lightboxImg.src = imgSrc;
                lightboxTitle.textContent = titleText;
                lightboxModal.style.display = 'flex';
                document.body.style.overflow = 'hidden'; // Bloquear scroll de fondo
            });
        });

        // Cerrar modal
        lightboxClose.addEventListener('click', () => {
            lightboxModal.style.display = 'none';
            document.body.style.overflow = 'auto'; // Restaurar scroll
        });

        // Cerrar modal al hacer clic fuera de la imagen
        lightboxModal.addEventListener('click', (e) => {
            if (e.target === lightboxModal) {
                lightboxModal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    }

    /* ==========================================
       6. TEMÁTICA DE NOVIEMBRE (Cempasúchil y Otoño)
       ========================================== */
    const novemberToggle = document.getElementById('novemberToggle');
    const novemberParticles = document.getElementById('novemberParticles');
    const heroBadgeText = document.querySelector('.hero-badge-text');

    // SVGs de pétalos de cempasúchil, flor de cempasúchil y hojas de otoño
    const particleSVGs = [
        // Pétalo de cempasúchil naranja intenso
        `<svg viewBox="0 0 24 24" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C8 6 6 12 8 17C9.5 20.5 14.5 20.5 16 17C18 12 16 6 12 2Z" fill="#ff7b00" opacity="0.9"/><path d="M12 4C10 8 9.5 12 10.5 16" stroke="#ffb703" stroke-width="1.2" stroke-linecap="round" fill="none"/></svg>`,
        // Pétalo de cempasúchil dorado/ámbar
        `<svg viewBox="0 0 24 24" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C7.5 6.5 6.5 13 9 18C10.5 21 13.5 21 15 18C17.5 13 16.5 6.5 12 2Z" fill="#ffa200" opacity="0.9"/></svg>`,
        // Flor de cempasúchil pequeña
        `<svg viewBox="0 0 28 28" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg"><g fill="#ff8800"><circle cx="14" cy="7" r="4.5"/><circle cx="21" cy="14" r="4.5"/><circle cx="14" cy="21" r="4.5"/><circle cx="7" cy="14" r="4.5"/><circle cx="9" cy="9" r="4.2" fill="#ff6a00"/><circle cx="19" cy="9" r="4.2" fill="#ff6a00"/><circle cx="19" cy="19" r="4.2" fill="#ff6a00"/><circle cx="9" cy="19" r="4.2" fill="#ff6a00"/><circle cx="14" cy="14" r="3.5" fill="#ffb703"/></g></svg>`,
        // Hoja de otoño terracota / maple
        `<svg viewBox="0 0 24 24" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg"><path d="M12 2L14.5 7.5L20 6L17 11.5L21 15L15 16.5L13 22H11L9 16.5L3 15L7 11.5L4 6L9.5 7.5L12 2Z" fill="#d94e1f" opacity="0.85"/></svg>`
    ];

    function createNovemberParticles() {
        if (!novemberParticles) return;
        novemberParticles.innerHTML = '';
        const count = window.innerWidth < 768 ? 12 : 20;

        for (let i = 0; i < count; i++) {
            const particle = document.createElement('div');
            particle.className = 'november-particle';
            const size = Math.floor(Math.random() * 12) + 14; // 14px a 25px
            const left = Math.random() * 100;
            const duration = (Math.random() * 9 + 11).toFixed(2); // 11s a 20s
            const delay = (Math.random() * -20).toFixed(2);
            const swayMid = `${Math.floor(Math.random() * 80 - 40)}px`;
            const swayEnd = `${Math.floor(Math.random() * 90 - 45)}px`;

            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.left = `${left}%`;
            particle.style.animationDuration = `${duration}s`;
            particle.style.animationDelay = `${delay}s`;
            particle.style.setProperty('--sway-mid', swayMid);
            particle.style.setProperty('--sway-end', swayEnd);

            particle.innerHTML = particleSVGs[i % particleSVGs.length];
            novemberParticles.appendChild(particle);
        }
    }

    function applyNovemberThemeState(isActive) {
        document.body.classList.toggle('november-theme', isActive);
        if (novemberToggle) {
            novemberToggle.classList.toggle('active', isActive);
            novemberToggle.setAttribute('aria-pressed', isActive ? 'true' : 'false');
        }
        if (heroBadgeText) {
            heroBadgeText.textContent = isActive
                ? heroBadgeText.getAttribute('data-november')
                : heroBadgeText.getAttribute('data-default');
        }
    }

    createNovemberParticles();

    // Recuperar preferencia guardada (por defecto activa en noviembre)
    const savedTheme = localStorage.getItem('cocinasMonicaNovemberTheme');
    const initialActive = savedTheme === null ? true : savedTheme === 'true';
    applyNovemberThemeState(initialActive);

    if (novemberToggle) {
        novemberToggle.addEventListener('click', () => {
            const isNowActive = !document.body.classList.contains('november-theme');
            applyNovemberThemeState(isNowActive);
            localStorage.setItem('cocinasMonicaNovemberTheme', String(isNowActive));
        });
    }

    /* ==========================================
       7. TEMA OSCURO / CLARO (Dark / Light Mode)
       ========================================== */
    const darkModeToggle = document.getElementById('darkModeToggle');
    const darkModeIcon = document.getElementById('darkModeIcon');

    function applyDarkModeState(isDark) {
        document.body.classList.toggle('dark-theme', isDark);
        if (darkModeToggle) {
            darkModeToggle.setAttribute('aria-pressed', isDark ? 'true' : 'false');
        }
        if (darkModeIcon) {
            darkModeIcon.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
        }
    }

    const savedDarkMode = localStorage.getItem('cocinasMonicaDarkMode');
    const initialDark = savedDarkMode === 'true';
    applyDarkModeState(initialDark);

    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', () => {
            const isNowDark = !document.body.classList.contains('dark-theme');
            applyDarkModeState(isNowDark);
            localStorage.setItem('cocinasMonicaDarkMode', String(isNowDark));
        });
    }

});
