/**
 * Navigation Module
 * Fixed header with scroll blur, dynamic active section indicator,
 * mobile drawer toggle, and keyboard accessibility.
 */

import { navigationLinks } from './config.js';

export function initNavigation() {
  const navbar = document.getElementById('navbar');
  const navLinksContainer = document.getElementById('nav-links');
  const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
  const mobileMenuDrawer = document.getElementById('mobile-menu-drawer');
  const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');
  const mobileLinksContainer = document.getElementById('mobile-nav-links');

  // Render Desktop Navigation Links
  if (navLinksContainer) {
    navLinksContainer.innerHTML = navigationLinks
      .map(
        (link) => `
        <a href="${link.href}" 
           class="nav-link px-3.5 py-1.5 text-xs lg:text-sm font-medium text-[#A0A3AD] hover:text-[#F5F5F7] transition-colors duration-200 relative group"
           data-section="${link.href.replace('#', '')}">
          ${link.name}
          <span class="nav-indicator absolute bottom-0 left-3.5 right-3.5 h-[2px] bg-gradient-to-r from-[#8B5CF6] to-[#38BDF8] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center rounded-full"></span>
        </a>
      `
      )
      .join('');
  }

  // Render Mobile Navigation Links
  if (mobileLinksContainer) {
    mobileLinksContainer.innerHTML = navigationLinks
      .map(
        (link) => `
        <a href="${link.href}" 
           class="mobile-nav-link text-xl font-medium text-[#A0A3AD] hover:text-[#F5F5F7] transition-colors py-2 border-b border-white/5 flex items-center justify-between"
           data-section="${link.href.replace('#', '')}">
          <span>${link.name}</span>
          <span class="text-xs text-[#8B5CF6] opacity-60">→</span>
        </a>
      `
      )
      .join('');
  }

  // Scroll effect on Navbar (subtle glass blur and border)
  function handleScroll() {
    if (window.scrollY > 40) {
      navbar.classList.add('glass-nav', 'py-3.5', 'shadow-2xl');
      navbar.classList.remove('py-5', 'bg-transparent');
    } else {
      navbar.classList.remove('glass-nav', 'py-3.5', 'shadow-2xl');
      navbar.classList.add('py-5', 'bg-transparent');
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // Active section highlighting using IntersectionObserver
  const sections = navigationLinks.map((link) => document.querySelector(link.href)).filter(Boolean);
  const navLinkElements = document.querySelectorAll('.nav-link');
  const mobileLinkElements = document.querySelectorAll('.mobile-nav-link');

  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -60% 0px',
    threshold: 0
  };

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        updateActiveLinks(id);
      }
    });
  }, observerOptions);

  sections.forEach((sec) => sectionObserver.observe(sec));

  function updateActiveLinks(activeId) {
    navLinkElements.forEach((link) => {
      const section = link.getAttribute('data-section');
      const indicator = link.querySelector('.nav-indicator');
      if (section === activeId) {
        link.classList.remove('text-[#A0A3AD]');
        link.classList.add('text-[#F5F5F7]');
        if (indicator) indicator.classList.remove('scale-x-0');
        if (indicator) indicator.classList.add('scale-x-100');
      } else {
        link.classList.add('text-[#A0A3AD]');
        link.classList.remove('text-[#F5F5F7]');
        if (indicator) indicator.classList.add('scale-x-0');
        if (indicator) indicator.classList.remove('scale-x-100');
      }
    });

    mobileLinkElements.forEach((link) => {
      const section = link.getAttribute('data-section');
      if (section === activeId) {
        link.classList.add('text-[#38BDF8]', 'pl-2');
        link.classList.remove('text-[#A0A3AD]');
      } else {
        link.classList.remove('text-[#38BDF8]', 'pl-2');
        link.classList.add('text-[#A0A3AD]');
      }
    });
  }

  // Mobile Drawer Toggle
  let isMobileOpen = false;

  function toggleMobileMenu(open) {
    isMobileOpen = typeof open === 'boolean' ? open : !isMobileOpen;
    mobileMenuToggle.setAttribute('aria-expanded', isMobileOpen ? 'true' : 'false');

    if (isMobileOpen) {
      mobileMenuDrawer.classList.remove('translate-x-full', 'invisible');
      mobileMenuOverlay.classList.remove('opacity-0', 'pointer-events-none');
      document.body.style.overflow = 'hidden';
    } else {
      mobileMenuDrawer.classList.add('translate-x-full', 'invisible');
      mobileMenuOverlay.classList.add('opacity-0', 'pointer-events-none');
      document.body.style.overflow = '';
    }
  }

  if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => toggleMobileMenu());
  }

  if (mobileMenuOverlay) {
    mobileMenuOverlay.addEventListener('click', () => toggleMobileMenu(false));
  }

  const mobileCloseBtn = document.getElementById('mobile-menu-close');
  if (mobileCloseBtn) {
    mobileCloseBtn.addEventListener('click', () => toggleMobileMenu(false));
  }

  // Close mobile drawer upon clicking any link
  document.querySelectorAll('.mobile-nav-link, #mobile-menu-drawer a').forEach((link) => {
    link.addEventListener('click', () => toggleMobileMenu(false));
  });

  // Keyboard accessibility: ESC closes mobile drawer
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isMobileOpen) {
      toggleMobileMenu(false);
      mobileMenuToggle.focus();
    }
  });
}
