'use strict';

document.addEventListener('DOMContentLoaded', () => {
    const carouselButtons = document.querySelectorAll('.carousel-btn');
    const heroSection = document.getElementById('hero-section');

    // Array of images
    const images = [
        'images/fitness_banner.png',
        'images/fitness_banner_2.png',
        'images/fitness_banner_3.png'
    ];

    let currentSlide = 0;
    const totalSlides = images.length;
    const slideIntervalTime = 5000;
    let slideInterval;


    const changeSlide = (index) => {
        currentSlide = index;
        heroSection.style.backgroundImage = `url('${images[currentSlide]}')`;

        // Update the active class on buttons
        carouselButtons.forEach(btn => btn.classList.remove('active'));
        carouselButtons[currentSlide].classList.add('active');
    };

    // Function to go to the next slide
    const nextSlide = () => {
        currentSlide = (currentSlide + 1) % totalSlides;
        changeSlide(currentSlide);
    };


    slideInterval = setInterval(nextSlide, slideIntervalTime);

    // Add click event listeners to each button
    carouselButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            clearInterval(slideInterval);
            changeSlide(index);
            slideInterval = setInterval(nextSlide, slideIntervalTime);
        });
    });

    //Pause on hover
    heroSection.addEventListener('mouseenter', () => {
        clearInterval(slideInterval);
    });

    heroSection.addEventListener('mouseleave', () => {
        slideInterval = setInterval(nextSlide, slideIntervalTime);
    });
});
