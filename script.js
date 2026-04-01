// Carousel Functionality
let currentSlideIndex = 0;
function changeSlide(n) {
    showSlide(currentSlideIndex += n);
}
function currentSlide(n) {
    showSlide(currentSlideIndex = n);
}
function showSlide(n) {
    const slides = document.querySelectorAll('.carousel-slide');
    const indicators = document.querySelectorAll('.indicator');
    if (n >= slides.length) {
        currentSlideIndex = 0;
    }
    if (n < 0) {
        currentSlideIndex = slides.length - 1;
    }
    slides.forEach(slide => {
        slide.classList.remove('active');
    });
    indicators.forEach(indicator => {
        indicator.classList.remove('active');
    });
    slides[currentSlideIndex].classList.add('active');
    indicators[currentSlideIndex].classList.add('active');
}
// Auto-advance carousel every 5 seconds
setInterval(() => {
    changeSlide(1);
}, 5000);

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// Add scroll animation for elements
const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -100px 0px' };
const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.skill-card, .goal-item, .about-content').forEach(el => {
    observer.observe(el);
});

// Mobile menu toggle (if you add a mobile menu)
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});