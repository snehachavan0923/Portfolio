/**
 * Main Application Entry Point
 * Orchestrates Three.js 3D scene, GSAP animations, Custom Cursor,
 * Navigation, Project Showcases, and Dynamic Content Population.
 */

import './styles.css';
import {
  createIcons,
  Code,
  Server,
  Layout,
  Database,
  ShieldCheck,
  Layers,
  Cpu,
  ExternalLink,
  Mail,
  ChevronDown,
  Check,
  CheckCircle,
  ArrowRight,
  X,
  Copy,
  Terminal,
  Calendar,
  MapPin,
  Award,
  BookOpen,
  Briefcase,
  Sparkles,
  FileText,
  Download,
  Phone
} from 'lucide';

import {
  personalInfo,
  skillsData,
  experienceData,
  educationData,
  certificationsData
} from './config.js';

import { initThreeScene } from './three-scene.js';
import { initCustomCursor } from './cursor.js';
import { initNavigation } from './navigation.js';
import { initProjects } from './projects.js';
import { initAnimations } from './animations.js';

document.addEventListener('DOMContentLoaded', () => {
  // 1. Populate Skills Grid
  renderSkills();

  // 2. Populate Experience Timeline
  renderExperience();

  // 3. Populate Education Cards
  renderEducation();

  // 4. Populate Certifications
  renderCertifications();

  // 5. Initialize Interactive Projects
  initProjects();

  // 6. Setup Contact Section Handlers (Copy email, Mailto composer)
  setupContactHandlers();

  // 7. Dynamic Copyright Year
  const yearEl = document.getElementById('current-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // 8. Initialize Lucide Icons
  createIcons({
    icons: {
      Code,
      Server,
      Layout,
      Database,
      ShieldCheck,
      Layers,
      Cpu,
      ExternalLink,
      Mail,
      ChevronDown,
      Check,
      CheckCircle,
      ArrowRight,
      X,
      Copy,
      Terminal,
      Calendar,
      MapPin,
      Award,
      BookOpen,
      Briefcase,
      Sparkles,
      FileText,
      Download,
      Phone
    }
  });

  // 9. Initialize 3D Three.js Scene
  initThreeScene();

  // 10. Initialize Desktop Custom Cursor
  const cursor = initCustomCursor();

  // 11. Initialize Header Navigation & Active Links
  initNavigation();

  // 12. Initialize GSAP & ScrollTrigger Animations
  initAnimations();

  // Re-bind cursor on dynamic elements
  if (cursor && cursor.rebind) {
    cursor.rebind();
  }
});

/**
 * Render Technical Skills Grid
 */
function renderSkills() {
  const container = document.getElementById('skills-grid');
  if (!container) return;

  container.innerHTML = skillsData
    .map(
      (cat) => `
      <div class="skill-category-card glass-panel rounded-2xl p-6 border border-white/5 hover:border-[#8B5CF6]/40 transition-all duration-300 relative group">
        <div class="flex items-center gap-3 mb-4">
          <div class="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#8B5CF6] group-hover:scale-105 transition-transform">
            <i data-lucide="${cat.icon}" class="w-5 h-5"></i>
          </div>
          <div>
            <h4 class="text-base font-bold text-[#F5F5F7]">${cat.category}</h4>
            <span class="text-[11px] text-[#A0A3AD] font-mono">${cat.skills.length} competencies</span>
          </div>
        </div>

        <div class="flex flex-wrap gap-2">
          ${cat.skills
            .map(
              (skill) => `
              <span class="text-xs px-3 py-1.5 rounded-lg bg-[#0f1118] border border-white/5 text-[#A0A3AD] group-hover:text-white group-hover:border-white/15 font-mono transition-colors">
                ${skill}
              </span>
            `
            )
            .join('')}
        </div>
      </div>
    `
    )
    .join('');
}

/**
 * Render Professional Experience Timeline
 */
function renderExperience() {
  const container = document.getElementById('experience-timeline-content');
  if (!container) return;

  container.innerHTML = experienceData
    .map(
      (exp) => `
      <div id="experience-card" class="glass-panel rounded-2xl p-6 sm:p-9 border border-white/10 relative overflow-hidden">
        <!-- Ambient subtle glow -->
        <div class="absolute -top-16 -right-16 w-48 h-48 bg-[#8B5CF6]/10 rounded-full blur-3xl pointer-events-none"></div>

        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
          <div>
            <span class="text-xs font-mono uppercase tracking-wider text-[#38BDF8] font-semibold block mb-1">
              ${exp.badge}
            </span>
            <h3 class="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              ${exp.role}
            </h3>
            <p class="text-base text-[#A78BFA] font-medium mt-1">
              ${exp.company}
            </p>
          </div>

          <div class="text-left sm:text-right space-y-1 font-mono text-xs text-[#A0A3AD]">
            <div class="flex items-center sm:justify-end gap-1.5 text-white/90">
              <i data-lucide="calendar" class="w-3.5 h-3.5 text-[#8B5CF6]"></i>
              <span>${exp.duration}</span>
            </div>
            <div class="flex items-center sm:justify-end gap-1.5">
              <i data-lucide="map-pin" class="w-3.5 h-3.5 text-[#38BDF8]"></i>
              <span>${exp.location}</span>
            </div>
          </div>
        </div>

        <!-- Verified Responsibilities -->
        <div class="py-6 space-y-4">
          <h4 class="text-xs font-mono uppercase tracking-wider text-[#F5F5F7]">
            Core Responsibilities & Deliverables
          </h4>
          <ul class="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-[#A0A3AD]">
            ${exp.responsibilities
              .map(
                (item) => `
                <li class="flex items-start gap-2.5 bg-[#0f1118]/70 p-3 rounded-xl border border-white/5">
                  <span class="text-[#38BDF8] mt-1 text-xs">◆</span>
                  <span class="leading-relaxed">${item}</span>
                </li>
              `
              )
              .join('')}
          </ul>
        </div>

        <!-- Technologies Used -->
        <div class="pt-4 border-t border-white/10">
          <span class="text-xs font-mono uppercase tracking-wider text-[#A0A3AD] block mb-3">
            Technologies Applied
          </span>
          <div class="flex flex-wrap gap-2">
            ${exp.technologies
              .map(
                (tech) => `
                <span class="text-xs px-2.5 py-1 rounded-md bg-[#131622] text-[#F5F5F7] border border-white/10 font-mono">
                  ${tech}
                </span>
              `
              )
              .join('')}
          </div>
        </div>
      </div>
    `
    )
    .join('');
}

/**
 * Render Education Timeline Cards
 */
function renderEducation() {
  const container = document.getElementById('education-list');
  if (!container) return;

  container.innerHTML = educationData
    .map((edu) => {
      if (edu.isCurrent) {
        return `
          <div class="education-card gradient-border-animated rounded-2xl p-6 sm:p-7 bg-[#101219] shadow-2xl relative overflow-hidden flex flex-col justify-between">
            <div>
              <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                <div class="flex items-center gap-2">
                  <span class="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span class="text-xs font-mono uppercase tracking-wider text-emerald-400 font-semibold">
                    ${edu.highlight}
                  </span>
                </div>
                <span class="text-xs font-mono text-[#A0A3AD]">${edu.duration}</span>
              </div>

              <h3 class="text-2xl font-bold text-white mb-1">
                ${edu.institution}
              </h3>
              <p class="text-base text-[#38BDF8] font-medium mb-3">
                ${edu.degree} · ${edu.branch}
              </p>

              <!-- Explicit Verified Statement required by user -->
              <div class="p-3 rounded-xl bg-white/5 border border-white/10 mb-4 font-mono text-xs text-[#A78BFA] leading-relaxed">
                ${edu.exactStatement}
              </div>

              <p class="text-xs sm:text-sm text-[#A0A3AD] leading-relaxed mb-4">
                ${edu.description}
              </p>
            </div>

            <div class="flex items-center gap-1.5 text-xs text-[#A0A3AD] font-mono pt-3 border-t border-white/10">
              <i data-lucide="map-pin" class="w-3.5 h-3.5 text-[#8B5CF6]"></i>
              <span>${edu.location}</span>
            </div>
          </div>
        `;
      }

      return `
        <div class="education-card glass-panel rounded-2xl p-6 border border-white/5 hover:border-white/15 transition-all flex flex-col justify-between">
          <div>
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
              <span class="text-xs font-mono uppercase tracking-wider text-[#A78BFA] font-semibold">
                ${edu.highlight}
              </span>
              <span class="text-xs font-mono text-[#A0A3AD]">${edu.duration}</span>
            </div>

            <h3 class="text-xl font-bold text-white mb-1">
              ${edu.institution}
            </h3>
            <p class="text-sm text-[#F5F5F7] font-medium mb-2">
              ${edu.degree} ${edu.branch ? `· ${edu.branch}` : ''}
            </p>
            <p class="text-xs text-[#A0A3AD] leading-relaxed mb-3">
              ${edu.description}
            </p>
          </div>

          <div class="flex items-center justify-between text-xs font-mono pt-3 border-t border-white/5">
            <span class="text-[#38BDF8] font-bold">
              ${edu.scoreType}: ${edu.score}
            </span>
            <span class="text-[#A0A3AD]">${edu.location}</span>
          </div>
        </div>
      `;
    })
    .join('');
}

/**
 * Render Certifications
 */
function renderCertifications() {
  const container = document.getElementById('certifications-list');
  if (!container) return;

  container.innerHTML = certificationsData
    .map(
      (cert) => `
      <div class="certification-card glass-panel rounded-2xl p-6 border border-white/10 hover:border-[#8B5CF6]/40 transition-all flex flex-col justify-between">
        <div>
          <div class="flex flex-wrap items-center justify-between gap-2 mb-4">
            <span class="text-xs font-mono font-bold px-2.5 py-1 rounded bg-[#8B5CF6]/20 text-[#A78BFA] border border-[#8B5CF6]/30">
              ${cert.issuer}
            </span>
            <span class="text-[11px] text-[#A0A3AD] font-mono">
              ${cert.date ? cert.date : 'Verified Credentials'}
            </span>
          </div>

          <h4 class="text-lg font-bold text-white mb-4">
            ${cert.title}
          </h4>

          <div class="space-y-2">
            <span class="text-xs font-mono text-[#A0A3AD] uppercase block">Topics Covered:</span>
            <div class="flex flex-wrap gap-2">
              ${cert.topics
                .map(
                  (topic) => `
                  <span class="text-xs px-3 py-1 rounded-lg bg-[#0d0f17] text-[#F5F5F7] border border-white/10 font-mono">
                    ${topic}
                  </span>
                `
                )
                .join('')}
            </div>
          </div>
        </div>
      </div>
    `
    )
    .join('');
}

/**
 * Setup Contact Handlers:
 * - One-click Copy Email with animated toast
 * - Direct Email Client Launcher (mailto)
 */
function setupContactHandlers() {
  const copyBtn = document.getElementById('copy-email-btn');
  const toast = document.getElementById('copy-toast');
  const emailInput = document.getElementById('contact-subject');
  const messageInput = document.getElementById('contact-message');
  const draftBtn = document.getElementById('draft-email-btn');

  if (copyBtn && toast) {
    copyBtn.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(personalInfo.email);
        toast.classList.remove('opacity-0', 'pointer-events-none', 'translate-y-2');
        toast.classList.add('opacity-100', 'translate-y-0');
        setTimeout(() => {
          toast.classList.add('opacity-0', 'pointer-events-none', 'translate-y-2');
          toast.classList.remove('opacity-100', 'translate-y-0');
        }, 2800);
      } catch {
        // Fallback
        window.location.href = `mailto:${personalInfo.email}`;
      }
    });
  }

  if (draftBtn) {
    draftBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const subject = encodeURIComponent(emailInput?.value || 'Collaboration / Inquiry for Sneha Chavan');
      const body = encodeURIComponent(
        messageInput?.value ||
          "Hi Sneha,\n\nI reviewed your portfolio and would love to connect regarding..."
      );
      // Opens default mail client directly with composed parameters
      window.location.href = `mailto:${personalInfo.email}?subject=${subject}&body=${body}`;
    });
  }
}
