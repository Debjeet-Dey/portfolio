/* ==========================================================================
   DEBJEET DEY — NAVIGATION & OVERLAY CONTROLLER
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  const toggleBtn = document.querySelector('.nav-toggle-btn');
  const navOverlay = document.querySelector('.nav-overlay');
  const navLinks = document.querySelectorAll('.nav-menu-link');
  const siteHeader = document.querySelector('.site-header');

  let isMenuOpen = false;

  // Header Scroll Effect
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      siteHeader.classList.add('scrolled');
    } else {
      siteHeader.classList.remove('scrolled');
    }
  }, { passive: true });

  // Open/Close Nav Menu
  function openMenu() {
    isMenuOpen = true;
    toggleBtn.classList.add('active');
    navOverlay.classList.add('active');
    toggleBtn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';

    // GSAP Menu Reveal Stagger
    if (window.gsap) {
      gsap.fromTo(
        '.nav-menu-link',
        { y: 80, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, stagger: 0.08, ease: 'power4.out', delay: 0.1 }
      );
      gsap.fromTo(
        '.nav-overlay-footer',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out', delay: 0.5 }
      );
    }
  }

  function closeMenu() {
    isMenuOpen = false;
    toggleBtn.classList.remove('active');
    navOverlay.classList.remove('active');
    toggleBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  toggleBtn.addEventListener('click', () => {
    if (isMenuOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  // Close menu on link click
  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      if (isMenuOpen) closeMenu();
    });
  });

  // Close menu on ESC key press
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isMenuOpen) {
      closeMenu();
    }
  });
});
