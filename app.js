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

});
