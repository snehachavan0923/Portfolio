/**
 * Projects Showcase & Interactive Modal Module
 * Renders custom CSS/HTML interactive mockups for:
 * 1. PGMate.in (Property management SaaS dashboard)
 * 2. BugFlow (Bug tracking & issue lifecycle with active resolution stepper)
 * 3. PRISM (Polytechnic academic records management system)
 *
 * Implements modern <dialog closedby="any"> modal with backdrop containment & light-dismiss fallback.
 */

import { projectsData } from './config.js';

export function initProjects() {
  const projectsContainer = document.getElementById('projects-grid');
  const modal = document.getElementById('project-detail-modal');
  const modalContent = document.getElementById('modal-dynamic-content');
  const modalCloseBtn = document.getElementById('modal-close-button');

  if (!projectsContainer) return;

  // Render Project Cards with custom, authentic interface previews
  projectsContainer.innerHTML = projectsData
    .map((project, index) => {
      const isEven = index % 2 === 1;
      return `
      <article class="project-card ${isEven ? 'project-card--reverse' : ''} glass-panel rounded-2xl p-6 lg:p-9 relative overflow-hidden group border border-white/10 hover:border-[#8B5CF6]/50 transition-all duration-300" 
               data-project-id="${project.id}">
        
        <!-- Top Category & Number Header -->
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-6 mb-6 border-b border-white/5">
          <div class="flex flex-wrap items-center gap-2 sm:gap-3">
            <span class="text-xs font-mono font-semibold px-2.5 py-1 rounded-md bg-[#8B5CF6]/15 text-[#A78BFA] border border-[#8B5CF6]/20">
              PROJECT ${project.number}
            </span>
            <span class="text-xs text-[#A0A3AD] font-mono uppercase tracking-wider">
              ${project.category}
            </span>
          </div>
          <div>
            ${project.status
          ? `<span class="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/30">
                  <span class="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"></span>
                  ${project.status}
                </span>`
          : project.website
            ? `<span class="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                  <span class="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                  Live Platform
                </span>`
            : `<span class="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1 rounded-full bg-blue-500/15 text-blue-300 border border-blue-500/30">
                  Institutional System
                </span>`
        }
          </div>
        </div>

        <div class="project-layout grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <!-- Left Column: Project Description & Features -->
          <div class="project-description lg:col-span-6 space-y-5">
            <h3 class="text-2xl lg:text-3xl font-bold tracking-tight text-[#F5F5F7] group-hover:text-white transition-colors">
              ${project.title}
            </h3>

            <p class="text-sm lg:text-base text-[#A0A3AD] leading-relaxed">
              ${project.description}
            </p>

            <!-- Key Capabilities List -->
            <div class="space-y-2 pt-2">
              <span class="text-xs font-mono text-[#F5F5F7] tracking-wider uppercase opacity-80">
                Core Capabilities:
              </span>
              <ul class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#A0A3AD]">
                ${project.capabilities
          .slice(0, 4)
          .map(
            (cap) => `
                    <li class="flex items-start gap-2">
                      <span class="text-[#38BDF8] mt-0.5 font-bold">✓</span>
                      <span>${cap}</span>
                    </li>
                  `
          )
          .join('')}
              </ul>
            </div>

            <!-- Technology Badges -->
            <div class="pt-2">
              <div class="flex flex-wrap gap-2">
                ${project.technologies
          .map(
            (tech) => `
                    <span class="text-xs px-2.5 py-1 rounded-md bg-[#101219] border border-white/10 text-[#F5F5F7] font-mono">
                      ${tech}
                    </span>
                  `
          )
          .join('')}
              </div>
            </div>

            <!-- Action Buttons -->
            <div class="pt-4 flex flex-wrap items-center gap-2.5 sm:gap-3">
              <button type="button" 
                      class="view-details-btn w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#8B5CF6]/20 hover:bg-[#8B5CF6]/30 text-[#F5F5F7] border border-[#8B5CF6]/40 text-xs sm:text-sm font-medium transition-all interactive-hover"
                      data-project-id="${project.id}">
                <span>Explore Architecture & Details</span>
                <span class="text-xs">↗</span>
              </button>

              ${project.website
          ? `<a href="${project.website}" target="_blank" rel="noopener noreferrer" 
                        class="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-[#F5F5F7] border border-white/10 text-xs sm:text-sm font-medium transition-all interactive-hover">
                      <span>Visit Website</span>
                      <span class="text-xs">↗</span>
                    </a>`
          : ''
        }

              ${project.actions?.githubBackendUrl
          ? `<a href="${project.actions.githubBackendUrl}" target="_blank" rel="noopener noreferrer" 
                        class="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#101219] hover:bg-[#161925] text-[#F5F5F7] hover:text-[#38BDF8] border border-white/10 hover:border-[#38BDF8]/40 text-xs sm:text-sm font-medium transition-all interactive-hover group/git shadow-md shadow-black/30">
                      <svg class="w-4 h-4 fill-current text-[#A0A3AD] group-hover/git:text-[#38BDF8] transition-colors" viewBox="0 0 24 24" aria-hidden="true"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>
                      <span>${project.actions.githubBackendLabel || 'View Backend on GitHub'}</span>
                      <span class="text-xs text-[#38BDF8]">↗</span>
                    </a>`
          : ''
        }
            </div>
          </div>

          <!-- Right Column: Actual project screenshots -->
          <div class="lg:col-span-6 project-gallery" data-gallery-id="${project.id}">
            <div class="project-gallery-frame">
              <div class="project-gallery-topbar" aria-hidden="true">
                <span class="project-window-dots"><i></i><i></i><i></i></span>
                <span class="project-gallery-label">${project.images?.[0]?.label || project.shortTitle || project.title}</span>
                <span class="project-gallery-count">01 / ${String(project.images?.length || 1).padStart(2, '0')}</span>
              </div>
              <div class="project-gallery-main" tabindex="0" role="button" aria-haspopup="dialog" aria-label="Open ${project.shortTitle || project.title} screenshots in full-screen gallery. Use left and right arrow keys to navigate.">
                <img class="project-gallery-image" src="${project.images?.[0]?.src || ''}" alt="${project.images?.[0]?.alt || `${project.title} screenshot`}" loading="lazy" decoding="async">

              </div>
              ${project.images?.length > 1 ? `
                <div class="project-gallery-dots" role="group" aria-label="Choose ${project.shortTitle || project.title} screenshot">
                  ${project.images.map((image, imageIndex) => `
                    <button type="button" class="project-gallery-dot ${imageIndex === 0 ? 'is-active' : ''}" data-image-index="${imageIndex}" aria-label="Show screenshot ${imageIndex + 1}: ${image.alt}" aria-current="${imageIndex === 0 ? 'true' : 'false'}"></button>
                  `).join('')}
                </div>` : ''}
            </div>
          </div>

        </div>

      </article>
    `;
    })
    .join('');

  // Independent, accessible carousel state for each project's screenshot gallery.
  projectsContainer.querySelectorAll('.project-gallery').forEach((gallery) => {
    const project = projectsData.find((item) => item.id === gallery.dataset.galleryId);
    if (!project?.images?.length) return;
    const mainImage = gallery.querySelector('.project-gallery-image');
    const mainFrame = gallery.querySelector('.project-gallery-main');
    const count = gallery.querySelector('.project-gallery-count');
    const galleryLabel = gallery.querySelector('.project-gallery-label');
    const dots = [...gallery.querySelectorAll('.project-gallery-dot')];
    let activeIndex = 0;
    let transitionTimer;

    function showImage(requestedIndex) {
      const index = (requestedIndex + project.images.length) % project.images.length;
      const image = project.images[index];
      if (!image || !mainImage || index === activeIndex) return;
      activeIndex = index;
      window.clearTimeout(transitionTimer);
      mainImage.classList.add('is-changing');
      const preload = new Image();
      preload.onload = () => {
        if (index !== activeIndex) return;
        mainImage.src = image.src;
        mainImage.alt = image.alt || `${project.title} screenshot ${index + 1}`;
        mainImage.classList.remove('is-changing');
      };
      preload.onerror = () => {
        if (index !== activeIndex) return;
        mainImage.src = image.src;
        mainImage.alt = image.alt || `${project.title} screenshot ${index + 1}`;
        mainImage.classList.remove('is-changing');
      };
      preload.src = image.src;
      transitionTimer = window.setTimeout(() => mainImage.classList.remove('is-changing'), 500);
      if (count) count.textContent = `${String(index + 1).padStart(2, '0')} / ${String(project.images.length).padStart(2, '0')}`;
      if (galleryLabel) galleryLabel.textContent = image.label || project.shortTitle || project.title;
      dots.forEach((dot, dotIndex) => {
        const active = dotIndex === index;
        dot.classList.toggle('is-active', active);
        dot.setAttribute('aria-current', String(active));
      });
    }

    dots.forEach((dot) => dot.addEventListener('click', () => showImage(Number(dot.dataset.imageIndex))));
    const openLightbox = () => openScreenshotLightbox(project, activeIndex);
    mainFrame?.addEventListener('click', openLightbox);
    mainFrame?.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); openLightbox(); }
      if (event.key === 'ArrowLeft') { event.preventDefault(); showImage(activeIndex - 1); }
      if (event.key === 'ArrowRight') { event.preventDefault(); showImage(activeIndex + 1); }
    });
  });

  // Full-size screenshot lightbox: click a project image to open and navigate its gallery.
  let screenshotLightbox = document.getElementById('project-screenshot-lightbox');
  if (!screenshotLightbox) {
    screenshotLightbox = document.createElement('dialog');
    screenshotLightbox.id = 'project-screenshot-lightbox';
    screenshotLightbox.className = 'project-screenshot-lightbox';
    screenshotLightbox.setAttribute('aria-label', 'Project screenshot viewer');
    screenshotLightbox.innerHTML = `
      <div class="screenshot-lightbox-topbar">
        <span class="screenshot-lightbox-title" id="screenshot-lightbox-title">Project screenshot</span>
        <span class="screenshot-lightbox-count" id="screenshot-lightbox-count"></span>
        <button type="button" class="screenshot-lightbox-close" aria-label="Close screenshot viewer">×</button>
      </div>
      <div class="screenshot-lightbox-stage">
        <button type="button" class="screenshot-lightbox-arrow screenshot-lightbox-prev" aria-label="Previous screenshot">←</button>
        <img class="screenshot-lightbox-image" alt="" />
        <button type="button" class="screenshot-lightbox-arrow screenshot-lightbox-next" aria-label="Next screenshot">→</button>
      </div>
      <div class="screenshot-lightbox-dots" role="group" aria-label="Choose screenshot"></div>`;
    document.body.appendChild(screenshotLightbox);
  }
  const lightboxImage = screenshotLightbox.querySelector('.screenshot-lightbox-image');
  const lightboxTitle = screenshotLightbox.querySelector('#screenshot-lightbox-title');
  const lightboxCount = screenshotLightbox.querySelector('#screenshot-lightbox-count');
  const lightboxDots = screenshotLightbox.querySelector('.screenshot-lightbox-dots');
  let lightboxProject = null;
  let lightboxIndex = 0;
  let lightboxReturnFocus = null;
  function openScreenshotLightbox(project, startIndex) {
    if (!screenshotLightbox || !project?.images?.length) return;
    lightboxProject = project;
    lightboxIndex = startIndex;
    lightboxReturnFocus = document.activeElement;
    lightboxTitle.textContent = project.shortTitle || project.title;
    lightboxDots.innerHTML = project.images.map((image, i) => `<button type="button" class="project-gallery-dot ${i === startIndex ? 'is-active' : ''}" data-lightbox-index="${i}" aria-label="Show screenshot ${i + 1}: ${image.alt || project.title}" aria-current="${i === startIndex}" ></button>`).join('');
    updateLightboxImage();
    const multi = project.images.length > 1;
    screenshotLightbox.querySelectorAll('.screenshot-lightbox-arrow').forEach(button => { button.hidden = !multi; });
    if (!screenshotLightbox.open) screenshotLightbox.showModal();
    screenshotLightbox.querySelector('.screenshot-lightbox-close').focus();
  }
  function updateLightboxImage() {
    if (!lightboxProject) return;
    const image = lightboxProject.images[lightboxIndex];
    lightboxImage.src = image.src;
    lightboxImage.alt = image.alt || `${lightboxProject.title} screenshot ${lightboxIndex + 1}`;
    lightboxCount.textContent = `${String(lightboxIndex + 1).padStart(2, '0')} / ${String(lightboxProject.images.length).padStart(2, '0')}`;
    lightboxDots.querySelectorAll('button').forEach((dot, i) => {
      dot.classList.toggle('is-active', i === lightboxIndex);
      dot.setAttribute('aria-current', String(i === lightboxIndex));
    });
  }
  function moveLightbox(delta) {
    if (!lightboxProject || lightboxProject.images.length < 2) return;
    lightboxIndex = (lightboxIndex + delta + lightboxProject.images.length) % lightboxProject.images.length;
    updateLightboxImage();
  }
  screenshotLightbox.querySelector('.screenshot-lightbox-prev').addEventListener('click', () => moveLightbox(-1));
  screenshotLightbox.querySelector('.screenshot-lightbox-next').addEventListener('click', () => moveLightbox(1));
  screenshotLightbox.querySelector('.screenshot-lightbox-close').addEventListener('click', () => screenshotLightbox.close());
  lightboxDots.addEventListener('click', event => {
    const dot = event.target.closest('[data-lightbox-index]');
    if (!dot) return;
    lightboxIndex = Number(dot.dataset.lightboxIndex);
    updateLightboxImage();
  });
  screenshotLightbox.addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft') { event.preventDefault(); moveLightbox(-1); }
    if (event.key === 'ArrowRight') { event.preventDefault(); moveLightbox(1); }
  });
  screenshotLightbox.addEventListener('click', event => {
    if (event.target === screenshotLightbox) screenshotLightbox.close();
  });
  screenshotLightbox.addEventListener('close', () => lightboxReturnFocus?.focus?.());

  // Helper to generate visual mockups for each project type
  function renderMockupVisual(type) {
    if (type === 'property-dashboard') {
      return `
        <div class="space-y-4">
          <!-- Dashboard Top Stat Bar -->
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-2.5">
            <div class="bg-[#151824] p-2.5 rounded-lg border border-white/5">
              <span class="text-[10px] text-[#A0A3AD] block">Total Rooms</span>
              <span class="text-base font-bold text-white">48</span>
              <span class="text-[9px] text-emerald-400 block mt-0.5">92% Capacity</span>
            </div>
            <div class="bg-[#151824] p-2.5 rounded-lg border border-white/5">
              <span class="text-[10px] text-[#A0A3AD] block">Active Tenants</span>
              <span class="text-base font-bold text-[#38BDF8]">86</span>
              <span class="text-[9px] text-blue-300 block mt-0.5">Verified Profiles</span>
            </div>
            <div class="bg-[#151824] p-2.5 rounded-lg border border-white/5">
              <span class="text-[10px] text-[#A0A3AD] block">Geolocation</span>
              <span class="text-base font-bold text-[#A78BFA]">LocationIQ</span>
              <span class="text-[9px] text-emerald-400 block mt-0.5">Geo-Verified</span>
            </div>
          </div>

          <!-- Room Occupancy Grid Preview -->
          <div class="bg-[#151824] p-3 rounded-lg border border-white/5 space-y-2">
            <div class="flex items-center justify-between text-xs">
              <span class="text-white font-medium">Room Allocation Status</span>
              <span class="text-[10px] text-[#38BDF8] font-mono">Floor 1 & 2 Active</span>
            </div>
            <div class="grid grid-cols-3 sm:grid-cols-6 gap-1.5 text-center text-[10px] font-mono">
              <div class="p-1.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">101 <span class="block text-[8px] opacity-70">OCC</span></div>
              <div class="p-1.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">102 <span class="block text-[8px] opacity-70">OCC</span></div>
              <div class="p-1.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">103 <span class="block text-[8px] opacity-70">RES</span></div>
              <div class="p-1.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">104 <span class="block text-[8px] opacity-70">OCC</span></div>
              <div class="p-1.5 rounded bg-violet-500/20 text-violet-300 border border-violet-500/30">201 <span class="block text-[8px] opacity-70">MAINT</span></div>
              <div class="p-1.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">202 <span class="block text-[8px] opacity-70">OCC</span></div>
            </div>
          </div>

          <!-- Recent Activity Strip -->
          <div class="p-2 rounded bg-[#10131d] border border-white/5 flex items-center justify-between text-[11px]">
            <div class="flex items-center gap-2 text-[#A0A3AD]">
              <span class="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              <span>Tenant Check-in: Room 104</span>
            </div>
            <span class="font-mono text-emerald-400 text-[10px]">Room Allocated</span>
          </div>
        </div>
      `;
    }

    if (type === 'bug-tracker-board') {
      return `
        <div class="space-y-3.5">
          <!-- BugFlow Workspace Bar -->
          <div class="flex items-center justify-between pb-2 border-b border-white/5">
            <div class="flex items-center gap-2">
              <span class="text-xs font-semibold text-white">Workspace: Core SaaS API</span>
              <span class="text-[10px] px-1.5 py-0.5 rounded bg-violet-500/20 text-violet-300 font-mono">RBAC: Dev</span>
            </div>
            <span class="text-[10px] text-[#A0A3AD] font-mono">Sprint 14</span>
          </div>

          <!-- Kanban Status Columns Mockup -->
          <div class="overflow-x-auto pb-1.5 -mx-1 px-1">
            <div class="grid grid-cols-3 gap-2 min-w-[270px]">
              <!-- Col 1: Open -->
              <div class="bg-[#131622] p-2 rounded-lg border border-white/5 space-y-2">
                <div class="flex items-center justify-between text-[10px] text-[#A0A3AD] font-medium">
                  <span>OPEN</span>
                  <span class="bg-white/10 px-1 rounded text-white">2</span>
                </div>
                <div class="bg-[#181c2b] p-2 rounded border border-rose-500/30 text-[10px] space-y-1">
                  <span class="text-rose-400 font-mono text-[9px] block">BUG-104 [CRITICAL]</span>
                  <span class="text-white block font-medium truncate">JWT token refresh race</span>
                  <span class="text-[9px] text-[#A0A3AD]">Assigned: Backend</span>
                </div>
              </div>

              <!-- Col 2: In Progress -->
              <div class="bg-[#131622] p-2 rounded-lg border border-white/5 space-y-2">
                <div class="flex items-center justify-between text-[10px] text-amber-300 font-medium">
                  <span>IN PROGRESS</span>
                  <span class="bg-amber-500/20 px-1 rounded">1</span>
                </div>
                <div class="bg-[#181c2b] p-2 rounded border border-amber-500/30 text-[10px] space-y-1">
                  <span class="text-amber-400 font-mono text-[9px] block">BUG-108 [HIGH]</span>
                  <span class="text-white block font-medium truncate">Cloudinary asset retry</span>
                  <span class="text-[9px] text-amber-300">Fix in review</span>
                </div>
              </div>

              <!-- Col 3: Resolved -->
              <div class="bg-[#131622] p-2 rounded-lg border border-white/5 space-y-2">
                <div class="flex items-center justify-between text-[10px] text-emerald-400 font-medium">
                  <span>RESOLVED</span>
                  <span class="bg-emerald-500/20 px-1 rounded">4</span>
                </div>
                <div class="bg-[#181c2b] p-2 rounded border border-emerald-500/30 text-[10px] space-y-1">
                  <span class="text-emerald-400 font-mono text-[9px] block">BUG-099 [VERIFIED]</span>
                  <span class="text-white block font-medium truncate">Tenant role permissions</span>
                  <span class="text-[9px] text-emerald-400">QA Approved</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Interactive Issue Lifecycle Demonstration Stepper -->
          <div class="bg-[#10131e] p-2.5 rounded-lg border border-white/5">
            <span class="text-[10px] font-mono text-[#A0A3AD] uppercase block mb-1.5">Issue Resolution Lifecycle:</span>
            <div class="flex items-center justify-between text-[9px] font-mono text-[#A0A3AD]">
              <span class="text-rose-400 font-bold">1. Reported</span>
              <span>→</span>
              <span class="text-amber-400 font-bold">2. Triaged</span>
              <span>→</span>
              <span class="text-[#38BDF8] font-bold">3. Fixed</span>
              <span>→</span>
              <span class="text-emerald-400 font-bold">4. Resolved</span>
            </div>
          </div>
        </div>
      `;
    }

    if (type === 'academic-records') {
      return `
        <div class="space-y-3">
          <!-- PRISM Header -->
          <div class="flex items-center justify-between pb-2 border-b border-white/5 text-xs">
            <span class="font-bold text-white">Academic Records · Dept of CSE</span>
            <span class="text-[10px] font-mono text-[#38BDF8] bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20">
              Spring Data JPA / MySQL
            </span>
          </div>

          <!-- Student Assessment Table Mockup -->
          <div class="overflow-x-auto pb-1.5 -mx-1 px-1">
            <table class="w-full min-w-[280px] text-[11px] text-left">
              <thead>
                <tr class="text-[10px] font-mono text-[#A0A3AD] border-b border-white/10">
                  <th class="py-1">Student ID</th>
                  <th class="py-1">Course</th>
                  <th class="py-1 text-center">IA-1</th>
                  <th class="py-1 text-center">IA-2</th>
                  <th class="py-1 text-center">IA-3</th>
                  <th class="py-1 text-right">Result</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-white/5 font-mono text-[10px]">
                <tr class="text-white">
                  <td class="py-1.5 font-medium">GPK-CS-23-01</td>
                  <td class="py-1.5 text-[#A0A3AD]">Adv Java</td>
                  <td class="py-1.5 text-center text-emerald-400">25/25</td>
                  <td class="py-1.5 text-center text-emerald-400">24/25</td>
                  <td class="py-1.5 text-center text-emerald-400">25/25</td>
                  <td class="py-1.5 text-right text-emerald-400 font-bold">Distinction</td>
                </tr>
                <tr class="text-white">
                  <td class="py-1.5 font-medium">GPK-CS-23-02</td>
                  <td class="py-1.5 text-[#A0A3AD]">DBMS</td>
                  <td class="py-1.5 text-center text-emerald-400">23/25</td>
                  <td class="py-1.5 text-center text-emerald-400">25/25</td>
                  <td class="py-1.5 text-center text-emerald-400">24/25</td>
                  <td class="py-1.5 text-right text-emerald-400 font-bold">Distinction</td>
                </tr>
                <tr class="text-white">
                  <td class="py-1.5 font-medium">GPK-CS-23-03</td>
                  <td class="py-1.5 text-[#A0A3AD]">Web Tech</td>
                  <td class="py-1.5 text-center text-emerald-400">25/25</td>
                  <td class="py-1.5 text-center text-emerald-400">25/25</td>
                  <td class="py-1.5 text-center text-emerald-400">24/25</td>
                  <td class="py-1.5 text-right text-emerald-400 font-bold">Distinction</td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Bottom Control Bar -->
          <div class="flex items-center justify-between pt-2 border-t border-white/5 text-[10px] text-[#A0A3AD]">
            <span>Role: Faculty Examination Portal</span>
            <span class="text-emerald-400 font-mono">Automated Grade Generation: Active</span>
          </div>
        </div>
      `;
    }

    return '';
  }

  // Handle Modal Open & Content Injection
  function openProjectModal(projectId) {
    const project = projectsData.find((p) => p.id === projectId);
    if (!project || !modal || !modalContent) return;

    modalContent.innerHTML = `
      <div class="space-y-6">
        <!-- Header -->
        <div class="border-b border-white/10 pb-4 pr-10">
          <div class="flex flex-wrap items-center gap-2 mb-2">
            <span class="text-xs font-mono px-2 py-0.5 rounded bg-[#8B5CF6]/20 text-[#A78BFA] border border-[#8B5CF6]/30">
              PROJECT ${project.number}
            </span>
            <span class="text-xs text-[#A0A3AD] font-mono uppercase tracking-wider">
              ${project.category}
            </span>
            ${project.status
        ? `<span class="text-xs px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-medium">
                    ${project.status}
                  </span>`
        : ''
      }
          </div>
          <h2 id="modal-project-title" class="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
            ${project.title}
          </h2>
          <p class="text-xs sm:text-sm text-[#38BDF8] mt-1 font-medium">
            ${project.tagline}
          </p>
        </div>

        <!-- Description -->
        <div class="space-y-3">
          <h4 class="text-xs font-mono uppercase tracking-wider text-[#F5F5F7]">Overview & Purpose</h4>
          <p class="text-sm sm:text-base text-[#A0A3AD] leading-relaxed">
            ${project.description}
          </p>
        </div>

        <!-- Full Capabilities -->
        <div class="space-y-3">
          <h4 class="text-xs font-mono uppercase tracking-wider text-[#F5F5F7]">Verified Implementation Capabilities</h4>
          <ul class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-[#A0A3AD]">
            ${project.capabilities
        .map(
          (cap) => `
                <li class="flex items-start gap-2 bg-[#12141d] p-2.5 rounded-lg border border-white/5">
                  <span class="text-[#8B5CF6] font-bold">✓</span>
                  <span>${cap}</span>
                </li>
              `
        )
        .join('')}
          </ul>
        </div>

        ${project.workflowStages
        ? `
          <!-- BugFlow Issue Lifecycle Workflow -->
          <div class="space-y-3">
            <h4 class="text-xs font-mono uppercase tracking-wider text-[#F5F5F7]">Structured Issue Lifecycle Workflow</h4>
            <div class="space-y-2">
              ${project.workflowStages
          .map(
            (stage) => `
                  <div class="flex items-start gap-3 bg-[#12141d] p-2.5 rounded-lg border border-white/5 text-xs">
                    <span class="font-mono text-[#38BDF8] font-bold">${stage.step}</span>
                    <div>
                      <strong class="text-white block">${stage.name}</strong>
                      <span class="text-[#A0A3AD]">${stage.desc}</span>
                    </div>
                  </div>
                `
          )
          .join('')}
            </div>
          </div>
        `
        : ''
      }

        <!-- Technology Stack -->
        <div class="space-y-3">
          <h4 class="text-xs font-mono uppercase tracking-wider text-[#F5F5F7]">Technologies & Architectures</h4>
          <div class="flex flex-wrap gap-2">
            ${project.technologies
        .map(
          (tech) => `
                <span class="text-xs px-3 py-1 rounded-md bg-[#181a24] text-[#F5F5F7] border border-white/10 font-mono">
                  ${tech}
                </span>
              `
        )
        .join('')}
          </div>
        </div>

        <!-- Destination Actions -->
        <div class="pt-4 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div class="flex flex-wrap items-center gap-2.5 sm:gap-3 w-full sm:w-auto">
            ${project.website
        ? `<a href="${project.website}" target="_blank" rel="noopener noreferrer" 
                      class="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#8B5CF6] to-[#6366F1] hover:from-[#7C3AED] hover:to-[#4F46E5] text-white text-xs sm:text-sm font-semibold shadow-lg shadow-purple-500/25 transition-all interactive-hover">
                    <span>Visit Live Website (${project.shortTitle})</span>
                    <span>↗</span>
                  </a>`
        : ''
      }
            ${project.actions?.githubBackendUrl
        ? `<a href="${project.actions.githubBackendUrl}" target="_blank" rel="noopener noreferrer" 
                      class="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#141724] hover:bg-[#1a1e30] text-white hover:text-[#38BDF8] border border-white/15 hover:border-[#38BDF8]/40 text-xs sm:text-sm font-medium transition-all interactive-hover group/modalgit shadow-md shadow-black/40">
                    <svg class="w-4 h-4 fill-current text-[#A0A3AD] group-hover/modalgit:text-[#38BDF8] transition-colors" viewBox="0 0 24 24" aria-hidden="true"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>
                    <span>${project.actions.githubBackendLabel || 'View Backend on GitHub'}</span>
                    <span class="text-xs text-[#38BDF8]">↗</span>
                  </a>`
        : ''
      }
            ${project.actions.inProgressNote
        ? `<span class="text-xs text-amber-300 font-mono flex items-center gap-2">
                    <span class="w-2 h-2 rounded-full bg-amber-400"></span>
                    ${project.actions.inProgressNote}
                  </span>`
        : !project.website && project.actions.internalSystemNote
          ? `<span class="text-xs text-[#A0A3AD] font-mono">
                    ${project.actions.internalSystemNote}
                  </span>`
          : ''
      }
          </div>

          <button type="button" 
                  class="modal-close-trigger w-full sm:w-auto px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-mono text-[#A0A3AD] hover:text-white transition-colors border border-white/5 text-center">
            Close Modal
          </button>
        </div>
      </div>
    `;

    modal.showModal();

    // Attach listener to any inner close trigger
    modal.querySelectorAll('.modal-close-trigger').forEach((btn) => {
      btn.addEventListener('click', () => modal.close());
    });
  }

  // Attach card click handlers for details button
  document.querySelectorAll('.view-details-btn').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const projectId = btn.getAttribute('data-project-id');
      openProjectModal(projectId);
    });
  });

  // Modern <dialog> close button handler
  if (modalCloseBtn && modal) {
    modalCloseBtn.addEventListener('click', () => {
      modal.close();
    });
  }

  // Modern web guidance fallback for <dialog closedby="any">:
  // In browsers without native closedBy support, detect click outside dialog box
  if (modal && !('closedBy' in HTMLDialogElement.prototype)) {
    modal.addEventListener('click', (event) => {
      if (event.target !== modal) return;
      const rect = modal.getBoundingClientRect();
      const isDialogContent =
        rect.top <= event.clientY &&
        event.clientY <= rect.top + rect.height &&
        rect.left <= event.clientX &&
        event.clientX <= rect.left + rect.width;

      if (!isDialogContent) {
        modal.close();
      }
    });
  }
}
