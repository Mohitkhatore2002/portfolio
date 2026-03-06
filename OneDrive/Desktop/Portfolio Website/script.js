// STEP 6: Linear Style Animation System
// Minimal, clean, focused on readability

document.addEventListener('DOMContentLoaded', () => {

    // Initialize ScrollReveal with subtle settings
    const sr = ScrollReveal({
        origin: 'bottom',
        distance: '20px',
        duration: 800,
        delay: 100,
        reset: false,
        easing: 'cubic-bezier(0.16, 1, 0.3, 1)'
    });

    // Fade in on scroll
    sr.reveal('.hero > *, .section h2, .card, .project-case-study, .about-content, .contact-info, .contact-form', {
        interval: 100
    });

    // Smooth scroll for anchors
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // STEP 6: Small hover lift (Handled via CSS transitions)
    // Additional logic for mobile nav or other interactions can go here
});