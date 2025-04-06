// DOM Elements
const header = document.querySelector('.header');
const navbar = document.querySelector('.navbar');
const menuBar = document.querySelector('#menu-bar');
const navLinks = document.querySelector('.nav-links');
const links = document.querySelectorAll('.nav-links a');
const contactForm = document.querySelector('.form');

// Scroll handling
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Add/remove scrolled class for navbar background
    if (navbar) {
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    // Hide/Show navbar on scroll
    if (header) {
        if (currentScroll > lastScroll && currentScroll > 100) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
    }
    lastScroll = currentScroll;
});

// Mobile Menu Functionality
if (menuBar) {
    menuBar.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        menuBar.classList.toggle('bx-x');
    });
}

// Close menu when clicking outside
if (navLinks) {
    document.addEventListener('click', (e) => {
        if (!menuBar?.contains(e.target) && !navLinks.contains(e.target)) {
            navLinks.classList.remove('active');
            menuBar?.classList.remove('bx-x');
        }
    });

    // Close menu when clicking on a link
    links.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            menuBar?.classList.remove('bx-x');
        });
    });
}

// Close menu on scroll
if (navLinks) {
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > lastScroll) {
            navLinks.classList.remove('active');
            menuBar?.classList.remove('bx-x');
        }
        lastScroll = window.pageYOffset;
    });
}

// Smooth scrolling with offset
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Image handling
const lazyImages = document.querySelectorAll('img[data-src]');
const imageOptions = {
    threshold: 0.1,
    rootMargin: '50px'
};

const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.add('loaded');
            observer.unobserve(img);
        }
    });
}, imageOptions);

lazyImages.forEach(img => imageObserver.observe(img));

// Background image preloading
const preloadBackgroundImage = () => {
    const homeSection = document.querySelector('.home');
    if (homeSection) {
        const bgUrl = window.getComputedStyle(homeSection).backgroundImage.slice(4, -1).replace(/"/g, "");
        const img = new Image();
        img.src = bgUrl;
        img.onload = () => {
            homeSection.style.opacity = '1';
        };
    }
};

window.addEventListener('load', preloadBackgroundImage);

// Typed.js initialization
const typed = new Typed('.text', {
    strings: ['Frontend Developer', 'Web Designer', 'UI/UX Designer'],
    typeSpeed: 100,
    backSpeed: 100,
    backDelay: 1000,
    loop: true
});

// Animation handling
const observerOptions = {
    threshold: 0.2,
    rootMargin: '50px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements with animation classes
document.querySelectorAll('.home-content > *, .about-content > *, .home-social a, .portfolio-content .row').forEach(el => observer.observe(el));

// Form handling
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = contactForm.querySelector('input[name="name"]');
        const email = contactForm.querySelector('input[name="email"]');
        const message = contactForm.querySelector('textarea[name="message"]');
        
        // Validation with better feedback
        const showMessage = (type, text) => {
            const messageDiv = document.createElement('div');
            messageDiv.className = `message ${type}-message`;
            messageDiv.textContent = text;
            contactForm.appendChild(messageDiv);
            
            setTimeout(() => {
                messageDiv.classList.add('fade-out');
                setTimeout(() => messageDiv.remove(), 300);
            }, 3000);
        };

        if (name.value.trim() && email.value.trim() && message.value.trim()) {
            // Add your form submission logic here
            console.log('Form submitted successfully');
            contactForm.reset();
            showMessage('success', 'Message sent successfully!');
        } else {
            showMessage('error', 'Please fill in all fields');
        }
    });
}

// Resize handler for mobile menu
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        if (window.innerWidth > 768) {
            navLinks.classList.remove('active');
            menuBar.classList.remove('bx-x');
        }
    }, 250);
});