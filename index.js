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
     const portfolioItems = document.querySelectorAll('.portfolio-item');
    portfolioItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
            this.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.2)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
        });
    });

    // Job application buttons
    const applyButtons = document.querySelectorAll('.apply-btn');
    applyButtons.forEach(button => {
        button.addEventListener('click', function() {
            const jobTitle = this.parentElement.querySelector('h4').textContent;
            alert(`Thank you for your interest in the ${jobTitle} position! Our team will contact you shortly.`);
            
            // In a real implementation, this would open a modal or redirect to an application form
        });
    });

    // Contact form validation and submission
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic form validation
            const nameInput = this.querySelector('input[type="text"]');
            const emailInput = this.querySelector('input[type="email"]');
            const messageInput = this.querySelector('textarea');
            
            let isValid = true;
            
            if (!nameInput.value.trim()) {
                highlightError(nameInput);
                isValid = false;
            } else {
                removeErrorHighlight(nameInput);
            }
            
            if (!emailInput.value.trim() || !isValidEmail(emailInput.value)) {
                highlightError(emailInput);
                isValid = false;
            } else {
                removeErrorHighlight(emailInput);
            }
            
            if (!messageInput.value.trim()) {
                highlightError(messageInput);
                isValid = false;
            } else {
                removeErrorHighlight(messageInput);
            }
            
            if (isValid) {
                // Simulate form submission
                const submitBtn = this.querySelector('button');
                submitBtn.textContent = 'Sending...';
                submitBtn.disabled = true;
                
                setTimeout(() => {
                    alert('Thank you for your message! We will get back to you within 24 hours.');
                    this.reset();
                    submitBtn.textContent = 'Send Message';
                    submitBtn.disabled = false;
                }, 1500);
            }
        });
    }

    // Industry cards animation
    const industryCards = document.querySelectorAll('.industry-card');
    industryCards.forEach((card, index) => {
        // Add delay for staggered animation
        card.style.animationDelay = `${index * 0.2}s`;
    });

    // Helper functions
    function isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    function highlightError(element) {
        element.style.borderColor = '#ef4444';
        element.style.boxShadow = '0 0 0 3px rgba(239, 68, 68, 0.1)';
    }
    
    function removeErrorHighlight(element) {
        element.style.borderColor = '#e5e7eb';
        element.style.boxShadow = 'none';
    }

// for services
    document.addEventListener('DOMContentLoaded', () => {
    const viewBtn = document.getElementById("viewAllBtn");
    viewBtn.addEventListener("click", () => {
        const hiddenCards = document.querySelectorAll(".service-card.hidden");
        hiddenCards.forEach((card, index) => {
            setTimeout(() => {
                card.classList.add("show");
                card.classList.remove("hidden");
            }, index * 150); // stagger animation
        });
        viewBtn.style.display = "none"; // hide button
    });
});

// for industry
document.addEventListener('DOMContentLoaded', () => {
    const viewBtn = document.getElementById("viewAllIndustriesBtn");
    viewBtn.addEventListener("click", () => {
        const hiddenCards = document.querySelectorAll(".industry-card.hidden");
        hiddenCards.forEach((card, index) => {
            setTimeout(() => {
                card.classList.add("show");
                card.classList.remove("hidden");
            }, index * 150); // stagger animation
        });
        viewBtn.style.display = "none"; // hide button
    });
});

// for jobs opening section
document.addEventListener('DOMContentLoaded', () => {
    const viewBtn = document.getElementById("viewAllJobsBtn");
    viewBtn.addEventListener("click", () => {
        const hiddenCards = document.querySelectorAll(".job-card.hidden");
        hiddenCards.forEach((card, index) => {
            setTimeout(() => {
                card.classList.add("show");
                card.classList.remove("hidden");
            }, index * 150); // stagger animation
        });
        viewBtn.style.display = "none"; // hide button
    });
});

// portfolio section
  document.addEventListener('DOMContentLoaded', function() {
            const btn = document.querySelector('.view-all-btn');
            
            btn.addEventListener('click', function() {
                alert('View All Projects clicked!');
            });
        });

// service section 
document.addEventListener('DOMContentLoaded', function() {
      const viewMoreButtons = document.querySelectorAll('.view-more-btn');
      viewMoreButtons.forEach(btn => {
        btn.addEventListener('click', function() {
          const serviceTitle = this.parentElement.querySelector('.service-title').textContent;
          alert(`View More clicked for: ${serviceTitle}`);
        });
      });

      const viewAllBtn = document.querySelector('.view-all-btn');
      viewAllBtn.addEventListener('click', function() {
        alert('View All Services clicked!');
      });

      const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
      const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
          }
        });
      }, observerOptions);

      const serviceCards = document.querySelectorAll('.service-card');
      serviceCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
      });
    });        