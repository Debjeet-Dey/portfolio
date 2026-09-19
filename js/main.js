/* ==========================================================================
   DEBJEET DEY — MAIN INTERACTIVE APPLICATION & CURSOR LOGIC
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // ------------------------------------------------------------------------
  // 1. CUSTOM MAGNETIC CURSOR
  // ------------------------------------------------------------------------
  const cursorRing = document.querySelector('.custom-cursor-ring');
  const cursorDot = document.querySelector('.custom-cursor-dot');

  let mouseX = -100;
  let mouseY = -100;
  let ringX = -100;
  let ringY = -100;

  if (cursorRing && cursorDot && window.matchMedia('(hover: hover)').matches) {
    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      cursorDot.style.left = `${mouseX}px`;
      cursorDot.style.top = `${mouseY}px`;
    });

    // Smooth lerp animation for cursor ring
    function renderCursor() {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;

      cursorRing.style.left = `${ringX}px`;
      cursorRing.style.top = `${ringY}px`;

      requestAnimationFrame(renderCursor);
    }
    requestAnimationFrame(renderCursor);

    // Interactive Elements Hover Listeners
    const hoverElements = document.querySelectorAll('a, button, input, textarea, .nav-toggle-btn, .btn-primary, .btn-secondary');
    hoverElements.forEach((el) => {
      el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
      el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
    });

    const projectCards = document.querySelectorAll('.project-card, .creative-item');
    projectCards.forEach((card) => {
      card.addEventListener('mouseenter', () => document.body.classList.add('cursor-view'));
      card.addEventListener('mouseleave', () => document.body.classList.remove('cursor-view'));
    });
  }

  // ------------------------------------------------------------------------
  // 2. HERO MOUSE TILT PARALLAX EFFECT
  // ------------------------------------------------------------------------
  const heroSection = document.querySelector('.hero-section');
  const heroTitle = document.querySelector('.hero-title');

  if (heroSection && heroTitle && window.matchMedia('(hover: hover)').matches) {
    heroSection.addEventListener('mousemove', (e) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;

      const moveX = (clientX / innerWidth - 0.5) * 20;
      const moveY = (clientY / innerHeight - 0.5) * 15;

      heroTitle.style.transform = `translate3d(${moveX}px, ${moveY}px, 0)`;
    });

    heroSection.addEventListener('mouseleave', () => {
      heroTitle.style.transform = 'translate3d(0, 0, 0)';
      heroTitle.style.transition = 'transform 0.6s ease';
    });
  }

  // ------------------------------------------------------------------------
  // 3. CONTACT EMAIL COPY TO CLIPBOARD
  // ------------------------------------------------------------------------
  const emailLink = document.querySelector('.contact-email-link');
  if (emailLink) {
    emailLink.addEventListener('click', (e) => {
      const email = 'debjeetdeywindows@gmail.com';
      if (navigator.clipboard) {
        navigator.clipboard.writeText(email).then(() => {
          const originalText = emailLink.textContent;
          emailLink.textContent = 'COPIED TO CLIPBOARD! ✦';
          setTimeout(() => {
            emailLink.textContent = originalText;
          }, 2200);
        }).catch(() => {
          // Fallback to mailto link navigation if permission is denied
          window.location.href = `mailto:${email}`;
        });
      }
    });
  }
});
