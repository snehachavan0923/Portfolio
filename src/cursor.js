/**
 * Custom Desktop Cursor System
 * Smooth trailing outer ring, central dot, interactive states, magnetic pull on CTAs.
 * Accessible: Disabled on touch devices and respects prefers-reduced-motion.
 */

export function initCustomCursor() {
  // Check if touch device or coarse pointer
  const isTouch =
    window.matchMedia('(pointer: coarse)').matches ||
    window.matchMedia('(hover: none)').matches ||
    'ontouchstart' in window ||
    (navigator.maxTouchPoints && navigator.maxTouchPoints > 0);
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (isTouch || prefersReducedMotion) {
    return;
  }

  // Create cursor DOM elements if not already present
  let dot = document.querySelector('.custom-cursor-dot');
  let ring = document.querySelector('.custom-cursor-ring');

  if (!dot) {
    dot = document.createElement('div');
    dot.className = 'custom-cursor-dot';
    document.body.appendChild(dot);
  }

  if (!ring) {
    ring = document.createElement('div');
    ring.className = 'custom-cursor-ring';
    document.body.appendChild(ring);
  }

  let mouseX = -100;
  let mouseY = -100;
  let ringX = -100;
  let ringY = -100;
  let isHovered = false;
  let isProjectHovered = false;
  let isVisible = false;
  let magneticTarget = null;

  // Track mouse coordinates
  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    if (!isVisible) {
      isVisible = true;
      dot.style.opacity = '1';
      ring.style.opacity = '1';
    }

    // Direct instantaneous position for dot
    dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
  });

  window.addEventListener('mouseleave', () => {
    isVisible = false;
    dot.style.opacity = '0';
    ring.style.opacity = '0';
  });

  window.addEventListener('mouseenter', () => {
    isVisible = true;
    dot.style.opacity = '1';
    ring.style.opacity = '1';
  });

  // Attach hover interactions for links, buttons, and custom interactive targets
  function bindInteractiveListeners() {
    const interactives = document.querySelectorAll('a, button, input, textarea, select, [role="button"], .interactive-hover');
    interactives.forEach((el) => {
      el.addEventListener('mouseenter', () => {
        document.body.classList.add('cursor-hover');
        isHovered = true;
      });
      el.addEventListener('mouseleave', () => {
        document.body.classList.remove('cursor-hover');
        isHovered = false;
      });
    });

    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card) => {
      card.addEventListener('mouseenter', () => {
        document.body.classList.add('cursor-project-hover');
        isProjectHovered = true;
      });
      card.addEventListener('mouseleave', () => {
        document.body.classList.remove('cursor-project-hover');
        isProjectHovered = false;
      });
    });

    // Magnetic effect for elements with .magnetic-cta
    const magnetics = document.querySelectorAll('.magnetic-cta');
    magnetics.forEach((btn) => {
      btn.addEventListener('mouseenter', () => {
        magneticTarget = btn;
      });
      btn.addEventListener('mousemove', (e) => {
        if (magneticTarget !== btn) return;
        const rect = btn.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const deltaX = (e.clientX - centerX) * 0.25;
        const deltaY = (e.clientY - centerY) * 0.25;
        btn.style.transform = `translate3d(${deltaX}px, ${deltaY}px, 0)`;
      });
      btn.addEventListener('mouseleave', () => {
        magneticTarget = null;
        btn.style.transform = '';
      });
    });
  }

  // Smooth lerp loop for the outer ring
  let animationFrameId;
  function updateRing() {
    // Linear interpolation for smooth trailing: lerp factor 0.18
    const lerp = 0.18;
    ringX += (mouseX - ringX) * lerp;
    ringY += (mouseY - ringY) * lerp;

    ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;

    animationFrameId = requestAnimationFrame(updateRing);
  }

  bindInteractiveListeners();
  updateRing();

  // Export re-bind function for dynamically rendered elements
  return {
    rebind: bindInteractiveListeners,
    destroy: () => {
      cancelAnimationFrame(animationFrameId);
      dot.remove();
      ring.remove();
    }
  };
}
