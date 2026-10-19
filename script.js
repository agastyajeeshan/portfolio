document.addEventListener('DOMContentLoaded', () => {
    // 1. Typewriter Animation Effect in Hero
    const typewriterElement = document.querySelector('.typewriter-text');
    if (typewriterElement) {
        const phrases = [
            "AI & Data Science Solutions.",
            "Modern Web Applications.",
            "Data Analytics & Dashboards.",
            "Interactive Web Experiences."
        ];
        let phraseIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingSpeed = 90;

        function type() {
            const currentPhrase = phrases[phraseIndex];

            if (isDeleting) {
                typewriterElement.textContent = currentPhrase.substring(0, charIndex - 1);
                charIndex--;
                typingSpeed = 45;
            } else {
                typewriterElement.textContent = currentPhrase.substring(0, charIndex + 1);
                charIndex++;
                typingSpeed = 90;
            }

            if (!isDeleting && charIndex === currentPhrase.length) {
                // Pause at complete word
                typingSpeed = 1800;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
                typingSpeed = 400;
            }

            setTimeout(type, typingSpeed);
        }

        setTimeout(type, 800);
    }

    // 2. Fade-in on Scroll Animation using Intersection Observer
    const fadeInElements = document.querySelectorAll('.fade-in');
    
    const fadeObserverOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const fadeObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Stop observing once faded in
            }
        });
    }, fadeObserverOptions);

    fadeInElements.forEach(el => fadeObserver.observe(el));

    // 3. Active Navbar Highlight (Scroll Spy)
    const sections = document.querySelectorAll('div[id]');
    const navLinks = document.querySelectorAll('.navbar li a');

    const navObserverOptions = {
        root: null,
        rootMargin: '-40% 0px -60% 0px' // Trigger active state when section occupies mid-screen
    };

    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, navObserverOptions);

    sections.forEach(section => navObserver.observe(section));

    // 4. Dynamic Navbar on Scroll (Transparent at top, glass dock when scrolled)
    const navbar = document.querySelector('.navbar');
    const handleNavbarScroll = () => {
        if (window.scrollY > 40) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    };
    window.addEventListener('scroll', handleNavbarScroll);
    handleNavbarScroll(); // Initial check

    // 5. Back to Top Button
    const backToTopBtn = document.getElementById('backToTop');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // 6. Contact Form Simulated Submit
    const contactForm = document.getElementById('contactForm');
    const formFeedback = document.getElementById('formFeedback');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            // Disable inputs and button during sending simulation
            submitBtn.disabled = true;
            submitBtn.innerHTML = 'Sending... <span class="spinner"></span>';
            
            // Simulating API loading state
            setTimeout(() => {
                contactForm.reset();
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalText;
                
                // Show feedback message card
                formFeedback.classList.add('success');
                formFeedback.innerHTML = '<h4>Success!</h4><p>Thank you for reaching out. I will get back to you shortly.</p>';
                formFeedback.style.display = 'block';
                
                // Fade out the feedback card after 5 seconds
                setTimeout(() => {
                    formFeedback.style.display = 'none';
                    formFeedback.classList.remove('success');
                }, 5000);
            }, 1500);
        });
    }
});
