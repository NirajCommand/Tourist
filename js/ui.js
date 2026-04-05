// UI Utilities
document.addEventListener('DOMContentLoaded', () => {
    const fadeIns = document.querySelectorAll('.fade-in');
    fadeIns.forEach((el, i) => {
        setTimeout(() => {
            el.classList.add('visible');
        }, i * 150);
    });

    const slideUps = document.querySelectorAll('.slide-up');
    slideUps.forEach((el, i) => {
        setTimeout(() => {
            el.classList.add('visible');
        }, i * 200);
    });
});
