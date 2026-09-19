/* ==========================================================================
   DEBJEET DEY — GSAP ANIMATIONS & LENIS SMOOTH SCROLL SYSTEM
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Initialize Lenis Smooth Scroll
  let lenis;
  if (typeof Lenis !== 'undefined' && !prefersReducedMotion) {
    lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Sync Lenis with GSAP ScrollTrigger
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
      });
      gsap.ticker.lagSmoothing(0);
    }
  }

  // Register GSAP Plugins
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    if (prefersReducedMotion) {
      // Disable complex animations for accessibility
      return;
    }

    // ------------------------------------------------------------------------
    // 1. HERO PAGE-LOAD REVEAL
    // ------------------------------------------------------------------------
    const heroTl = gsap.timeline({ defaults: { ease: 'power4.out', duration: 1.1 } });

    heroTl
      .from('.hero-eyebrow', { opacity: 0, y: 30, delay: 0.2 })
      .from('.hero-title', { opacity: 0, y: 60, stagger: 0.1 }, '-=0.8')
      .from('.hero-bio', { opacity: 0, y: 30 }, '-=0.7')
      .from('.hero-cta-group', { opacity: 0, y: 20 }, '-=0.6')
      .from('.hero-footer', { opacity: 0, y: 20 }, '-=0.5');

    // ------------------------------------------------------------------------
    // 2. INFINITE HORIZONTAL SKILLS MARQUEE (GSAP)
    // ------------------------------------------------------------------------
    const track1 = document.querySelector('.marquee-track-1');
    const track2 = document.querySelector('.marquee-track-2');

    if (track1 && track2) {
      // Row 1: Left -> Right
      gsap.to(track1, {
        xPercent: -50,
        repeat: -1,
        duration: 25,
        ease: 'none',
      });

      // Row 2: Right -> Left
      gsap.fromTo(track2, 
        { xPercent: -50 },
        {
          xPercent: 0,
          repeat: -1,
          duration: 25,
          ease: 'none',
        }
      );
    }

    // ------------------------------------------------------------------------
    // 3. SECTION HEADINGS & CONTENT REVEALS
    // ------------------------------------------------------------------------
    const revealSections = document.querySelectorAll('.reveal-on-scroll');

    revealSections.forEach((section) => {
      const heading = section.querySelector('.section-title');
      const tag = section.querySelector('.section-tag');
      const subtitle = section.querySelector('.section-subtitle');

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 82%',
          toggleActions: 'play none none none',
        },
      });

      if (tag) tl.from(tag, { opacity: 0, y: 20, duration: 0.6, ease: 'power3.out' });
      if (heading) tl.from(heading, { opacity: 0, y: 50, duration: 0.9, ease: 'power4.out' }, '-=0.4');
      if (subtitle) tl.from(subtitle, { opacity: 0, y: 30, duration: 0.7, ease: 'power3.out' }, '-=0.6');
    });

    // ------------------------------------------------------------------------
    // 4. PROJECT CARDS STAGGER REVEAL
    // ------------------------------------------------------------------------
    const projectCards = document.querySelectorAll('.project-card');

    projectCards.forEach((card, index) => {
      gsap.from(card, {
        scrollTrigger: {
          trigger: card,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
        opacity: 0,
        y: 60,
        duration: 1,
        ease: 'power3.out',
      });
    });

    // ------------------------------------------------------------------------
    // 5. EDUCATION TABLE ROWS REVEAL
    // ------------------------------------------------------------------------
    const eduRows = document.querySelectorAll('.education-table tbody tr');

    if (eduRows.length > 0) {
      gsap.from(eduRows, {
        scrollTrigger: {
          trigger: '.education-table',
          start: 'top 80%',
        },
        opacity: 0,
        y: 30,
        stagger: 0.2,
        duration: 0.8,
        ease: 'power3.out',
      });
    }

    // ------------------------------------------------------------------------
    // 6. CREATIVE GALLERY REVEAL
    // ------------------------------------------------------------------------
    const creativeItems = document.querySelectorAll('.creative-item');

    creativeItems.forEach((item, idx) => {
      gsap.from(item, {
        scrollTrigger: {
          trigger: item,
          start: 'top 85%',
        },
        opacity: 0,
        y: 40,
        scale: 0.96,
        duration: 0.9,
        ease: 'power3.out',
        delay: idx * 0.15,
      });
    });
  }
});
