
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle mobile menu
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when clicking on a link (mobile)
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Handle active link highlighting
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            // Remove active class from all links
            navLinks.forEach(l => l.classList.remove('active'));
            // Add active class to clicked link
            e.target.classList.add('active');
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });

    // Add scroll effect to navbar
    let lastScrollTop = 0;
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', () => {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (scrollTop > lastScrollTop) {
            // Scrolling down
            navbar.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            navbar.style.transform = 'translateY(0)';
        }

        lastScrollTop = scrollTop;
    }); // <-- Missing closing bracket added here

    class ServicesCarousel {
        constructor() {
            this.wrapper = document.getElementById('servicesWrapper');
            this.dotsContainer = document.getElementById('dotsIndicator');
            this.prevButton = document.querySelector('.nav-button.prev');
            this.nextButton = document.querySelector('.nav-button.next');

            this.currentIndex = 0;
            this.cardWidth = 0;
            this.visibleCards = 1;
            this.totalCards = document.querySelectorAll('.service-card').length;

            this.init();
            this.createDots();
            this.updateCarousel();

            // Add event listeners
            window.addEventListener('resize', () => this.handleResize());

            // Touch events for mobile
            this.setupTouchEvents();
        }

        init() {
            this.calculateDimensions();
        }

        calculateDimensions() {
            const card = document.querySelector('.service-card');
            if (card) {
                this.cardWidth = card.offsetWidth;
                const containerWidth = this.wrapper.parentElement.offsetWidth;
                const gap = 32; // 2rem in pixels

                // Calculate how many cards can fit
                if (window.innerWidth >= 1200) {
                    this.visibleCards = Math.min(3, this.totalCards);
                } else if (window.innerWidth >= 768) {
                    this.visibleCards = Math.min(2, this.totalCards);
                } else {
                    this.visibleCards = 1;
                }

                this.maxIndex = Math.max(0, this.totalCards - this.visibleCards);
            }
        }

        createDots() {
            this.dotsContainer.innerHTML = '';
            const dotsNeeded = this.maxIndex + 1;

            for (let i = 0; i < dotsNeeded; i++) {
                const dot = document.createElement('div');
                dot.className = 'dot';
                if (i === 0) dot.classList.add('active');
                dot.addEventListener('click', () => this.goToSlide(i));
                this.dotsContainer.appendChild(dot);
            }
        }

        updateCarousel() {
            const translateX = -this.currentIndex * (this.cardWidth + 32); // 32px for gap
            this.wrapper.style.transform = `translateX(${translateX}px)`;

            // Update navigation buttons
            this.prevButton.disabled = this.currentIndex === 0;
            this.nextButton.disabled = this.currentIndex >= this.maxIndex;

            // Update dots
            const dots = this.dotsContainer.querySelectorAll('.dot');
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === this.currentIndex);
            });
        }

        scrollServices(direction) {
            if (direction === -1 && this.currentIndex > 0) {
                this.currentIndex--;
            } else if (direction === 1 && this.currentIndex < this.maxIndex) {
                this.currentIndex++;
            }
            this.updateCarousel();
        }

        goToSlide(index) {
            this.currentIndex = Math.max(0, Math.min(index, this.maxIndex));
            this.updateCarousel();
        }

        handleResize() {
            this.calculateDimensions();
            this.currentIndex = Math.min(this.currentIndex, this.maxIndex);
            this.createDots();
            this.updateCarousel();
        }

        setupTouchEvents() {
            let startX = 0;
            let currentX = 0;
            let isDragging = false;

            this.wrapper.addEventListener('touchstart', (e) => {
                startX = e.touches[0].clientX;
                isDragging = true;
            });

            this.wrapper.addEventListener('touchmove', (e) => {
                if (!isDragging) return;
                currentX = e.touches[0].clientX;
                e.preventDefault();
            });

            this.wrapper.addEventListener('touchend', () => {
                if (!isDragging) return;
                isDragging = false;

                const diff = startX - currentX;
                const threshold = 50;

                if (Math.abs(diff) > threshold) {
                    if (diff > 0) {
                        this.scrollServices(1); // Swipe left - next
                    } else {
                        this.scrollServices(-1); // Swipe right - prev
                    }
                }
            });
        }
    }

    // Global functions for button clicks
    let carousel;

    function scrollServices(direction) {
        if (carousel) {
            carousel.scrollServices(direction);
        }
    }

    // Initialize carousel when DOM is loaded
    document.addEventListener('DOMContentLoaded', () => {
        carousel = new ServicesCarousel();
    });

    // Auto-scroll functionality (optional)
    let autoScrollInterval;

    function startAutoScroll() {
        autoScrollInterval = setInterval(() => {
            if (carousel) {
                if (carousel.currentIndex >= carousel.maxIndex) {
                    carousel.goToSlide(0);
                } else {
                    carousel.scrollServices(1);
                }
            }
        }, 5000);
    }

    function stopAutoScroll() {
        clearInterval(autoScrollInterval);
    }

    // Start auto-scroll and pause on hover
    document.addEventListener('DOMContentLoaded', () => {
        const servicesContainer = document.querySelector('.services-carousel');
        servicesContainer.addEventListener('mouseenter', stopAutoScroll);
        servicesContainer.addEventListener('mouseleave', startAutoScroll);
        startAutoScroll();
    });
