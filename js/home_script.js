'use strict';

document.addEventListener('DOMContentLoaded', () => {
    const heroSection = document.getElementById('hero-section');
    const slides = heroSection.querySelectorAll('.hero-slide');
    const carouselButtons = document.querySelectorAll('.carousel-btn');

    let currentSlide = 0;
    let slideInterval;

    const goToSlide = (index) => {
        if (index === currentSlide) return;

        // Drop old slide back (stays visible at z-index 1, no animation)
        slides[currentSlide].classList.remove('active');
        carouselButtons[currentSlide].classList.remove('active');

        currentSlide = index;

        // Force animation to restart by removing/re-adding class
        const slide = slides[currentSlide];
        slide.classList.remove('active');
        void slide.offsetWidth; // flush style so animation resets
        slide.classList.add('active');

        carouselButtons[currentSlide].classList.add('active');
    };

    const nextSlide = () => goToSlide((currentSlide + 1) % slides.length);

    slideInterval = setInterval(nextSlide, 5000);

    carouselButtons.forEach((btn, index) => {
        btn.addEventListener('click', () => {
            clearInterval(slideInterval);
            goToSlide(index);
            slideInterval = setInterval(nextSlide, 5000);
        });
    });

    heroSection.addEventListener('mouseenter', () => clearInterval(slideInterval));
    heroSection.addEventListener('mouseleave', () => {
        slideInterval = setInterval(nextSlide, 5000);
    });
});
