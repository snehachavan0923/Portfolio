/**
 * GSAP & ScrollTrigger Animations
 * Cinematic reveals, role transitions, timeline progression,
 * and accessibility checks (prefers-reduced-motion).
 */

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { personalInfo } from './config.js';

gsap.registerPlugin(ScrollTrigger);

export function initAnimations() {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // 1. Role Cycling in Hero Section .
  initRoleCycling();

  if (prefersReducedMotion) {
    // If reduced motion is requested, show elements immediately without animation
    gsap.set('[data-animate]', { opacity: 1, y: 0, scale: 1 });
    return;
  }

  // 2. Cinematic Hero Entrance
  const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });

  heroTl
    .fromTo('#hero-eyebrow', { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.8, delay: 0.2 })
    .fromTo('#hero-headline', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1 }, '-=0.5')
    .fromTo('#hero-roles-container', { opacity: 0, scale: 0.95 }, { opacity: 1, scale: 1, duration: 0.8 }, '-=0.6')
    .fromTo('#hero-intro', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8 }, '-=0.5')
    .fromTo('#hero-ctas', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8 }, '-=0.5')
    .fromTo('#hero-scroll-indicator', { opacity: 0 }, { opacity: 1, duration: 1 }, '-=0.3');

  // 3. Section Heading Reveals
  const sectionHeadings = document.querySelectorAll('.section-heading-group');
  sectionHeadings.forEach((heading) => {
    gsap.fromTo(
      heading,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: heading,
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      }
    );
  });

  // 4. About Section Split Layout Reveal (Vertical on mobile, horizontal split on desktop)
  const aboutLeft = document.getElementById('about-bio-left');
  const aboutRight = document.getElementById('about-card-right');
  const isDesktop = window.innerWidth >= 1024;
  if (aboutLeft && aboutRight) {
    gsap.fromTo(
      aboutLeft,
      { opacity: 0, x: isDesktop ? -30 : 0, y: isDesktop ? 0 : 25 },
      {
        opacity: 1,
        x: 0,
        y: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '#about',
          start: 'top 75%'
        }
      }
    );

    gsap.fromTo(
      aboutRight,
      { opacity: 0, x: isDesktop ? 30 : 0, y: isDesktop ? 0 : 25 },
      {
        opacity: 1,
        x: 0,
        y: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '#about',
          start: 'top 75%'
        }
      }
    );
  }

  // 5. Skills Grid Stagger
  const skillCategories = document.querySelectorAll('.skill-category-card');
  if (skillCategories.length > 0) {
    gsap.fromTo(
      skillCategories,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '#skills-grid',
          start: 'top 80%'
        }
      }
    );
  }

  // 6. Experience Timeline Progression Line
  const timelineLine = document.getElementById('experience-timeline-line');
  if (timelineLine) {
    gsap.fromTo(
      timelineLine,
      { scaleY: 0 },
      {
        scaleY: 1,
        transformOrigin: 'top center',
        ease: 'none',
        scrollTrigger: {
          trigger: '#experience',
          start: 'top 70%',
          end: 'bottom 70%',
          scrub: 0.5
        }
      }
    );
  }

  // Experience Card Entrance
  const expCard = document.getElementById('experience-card');
  if (expCard) {
    gsap.fromTo(
      expCard,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: expCard,
          start: 'top 80%'
        }
      }
    );
  }

  // 7. Project card stack: keep card geometry stable so CSS sticky stacking
  // can pin each card while the next card scrolls over it. Animate opacity only.
  const projectCards = document.querySelectorAll('.project-card');
  projectCards.forEach((card, index) => {
    gsap.fromTo(card,
      { opacity: 0.82 },
      {
        opacity: 1,
        duration: 0.55,
        delay: Math.min(index * 0.04, 0.12),
        ease: 'power2.out',
        scrollTrigger: {
          trigger: card,
          start: 'top 88%',
          toggleActions: 'play none none none',
          once: true
        }
      }
    );
  });

  // 8. Education & Certifications Stagger
  const educationCards = document.querySelectorAll('.education-card');
  if (educationCards.length > 0) {
    gsap.fromTo(
      educationCards,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '#education-list',
          start: 'top 80%'
        }
      }
    );
  }

  const certCards = document.querySelectorAll('.certification-card');
  if (certCards.length > 0) {
    gsap.fromTo(
      certCards,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '#certifications-list',
          start: 'top 80%'
        }
      }
    );
  }

  // 9. Resume Section Reveal
  const resumeCard = document.querySelector('#resume .glass-panel');
  if (resumeCard) {
    gsap.fromTo(
      resumeCard,
      { opacity: 0, y: 35 },
      {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '#resume',
          start: 'top 85%'
        }
      }
    );
  }

  // 10. Contact Card Reveal
  const contactCard = document.getElementById('contact-content');
  if (contactCard) {
    gsap.fromTo(
      contactCard,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: contactCard,
          start: 'top 85%'
        }
      }
    );
  }
}

/**
 * Animated Role Cycling in Hero Section
 */
function initRoleCycling() {
  const roleElement = document.getElementById('hero-animated-role');
  if (!roleElement) return;

  const roles = personalInfo.hero.roles;
  let currentIndex = 0;

  function cycleNextRole() {
    gsap.to(roleElement, {
      opacity: 0,
      y: -15,
      duration: 0.4,
      ease: 'power2.in',
      onComplete: () => {
        currentIndex = (currentIndex + 1) % roles.length;
        roleElement.textContent = roles[currentIndex];
        gsap.fromTo(
          roleElement,
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }
        );
      }
    });
  }

  // Cycle every 3.2 seconds
  setInterval(cycleNextRole, 3200);
}
