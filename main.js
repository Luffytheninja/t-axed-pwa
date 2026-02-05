document.addEventListener('DOMContentLoaded', () => {
    // --- Page Load Sequence ---
    const navFrame = document.querySelector('.nav-frame');
    const heroHeadline = document.querySelector('.hero-headline');
    const heroSubtext = document.querySelector('.hero-subtext');

    // Immediate start
    setTimeout(() => {
        // Stage 1: Hero w/ staggered text
        if (heroHeadline) heroHeadline.classList.add('visible');

        // Stage 2: Subtext
        setTimeout(() => {
            if (heroSubtext) {
                // We'll mimic the reveal class or just add one
                heroSubtext.style.opacity = '1';
                heroSubtext.style.transform = 'translateY(0)';
            }
        }, 300);

        // Stage 3: Nav
        setTimeout(() => {
            if (navFrame) navFrame.classList.add('visible');
        }, 800);

    }, 100);

    // --- Scroll Interaction (Intersection Observer) ---
    // Simple fade-up for sections
    const hiddenElements = document.querySelectorAll('.service-card, .work-item, .section-statement, .section-contact h2');

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                observer.unobserve(entry.target); // Play once
            }
        });
    }, observerOptions);

    hiddenElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.8s cubic-bezier(0.2, 0, 0.2, 1), transform 0.8s cubic-bezier(0.2, 0, 0.2, 1)';
        observer.observe(el);
    });

    // Add class for the transition
    const style = document.createElement('style');
    style.innerHTML = `
        .in-view {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);


    // --- Interaction: Navigation (Mobile) ---
    const navToggle = document.getElementById('navToggle');
    const menuOverlay = document.querySelector('.menu-overlay');
    const mainContent = document.getElementById('mainContent');
    let isMenuOpen = false;

    if (navToggle) {
        navToggle.addEventListener('click', () => {
            isMenuOpen = !isMenuOpen;
            if (isMenuOpen) {
                menuOverlay.classList.add('open');
                if (mainContent) mainContent.style.opacity = '0.5';
                document.body.style.overflow = 'hidden';
                navToggle.classList.add('toggled'); // simpler state management
                // Manually animate lines if needed, or use CSS class
                navToggle.children[0].style.transform = 'translateY(4px) rotate(45deg)';
                navToggle.children[1].style.transform = 'translateY(-4px) rotate(-45deg)';
            } else {
                menuOverlay.classList.remove('open');
                if (mainContent) mainContent.style.opacity = '1';
                document.body.style.overflow = '';
                navToggle.classList.remove('toggled');
                navToggle.children[0].style.transform = 'none';
                navToggle.children[1].style.transform = 'none';
            }
        });
    }

    // Close menu on link click
    document.querySelectorAll('.menu-link').forEach(link => {
        link.addEventListener('click', () => {
            if (isMenuOpen && navToggle) navToggle.click();
        });
    });
});
