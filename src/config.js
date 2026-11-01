/**
 * Centralized Configuration & Data Source for Sneha Chavan's Portfolio
 * Contains all verified personal details, skills, experience, projects, education, and certifications.
 * Strict adherence: No fabricated statistics, fake metrics, or unverified claims.
 */

export const personalInfo = {
  name: "Sneha Chavan",
  shortName: "Sneha",
  brandName: "SNEHA CHAVAN",
  headline: "Full-Stack Developer | Backend Engineering | SaaS Builder",
  institution: "RV College of Engineering (RVCE), Bengaluru",
  degree: "Bachelor of Engineering (B.E.), Computer Science & Engineering",
  currentRole: "Computer Science & Engineering Student @ RVCE",
  location: "Bengaluru, Karnataka, India",
  email: "snehachavan0923@gmail.com",
  phone: "+91 8884793633",
  phoneFormatted: "+91 8884793633",
  phoneTel: "tel:+918884793633",
  linkedin: "https://www.linkedin.com/in/snehachavan29/",
  github: "https://github.com/snehachavan0923",
  pgmateUrl: "https://pgmate.in/",
  resumePdfUrl: "/assets/Sneha_Chavan_Resume.pdf",
  bio: [
    "I'm a Computer Science and Engineering student at RV College of Engineering, with a strong focus on full-stack development and modern web technologies.",
    "My experience includes building responsive frontend modules, developing secure backend services, designing REST APIs, managing databases, and integrating third-party services into SaaS applications.",
    "I enjoy creating intuitive user interfaces, engineering reliable backend systems, and solving practical software development challenges. I'm particularly interested in software architecture, authentication systems, database management, and building useful digital products.",
    "I'm always eager to learn, collaborate, and connect with professionals in the software development community."
  ],
  hero: {
    eyebrow: "COMPUTER SCIENCE & ENGINEERING · RVCE",
    headline: "Building Digital Experiences.",
    roles: [
      "Full-Stack Developer",
      "Backend Systems Enthusiast",
      "SaaS Builder"
    ],
    intro: "I'm a Computer Science and Engineering student at RV College of Engineering, passionate about building secure backend systems, intuitive interfaces, and scalable full-stack applications.",
    primaryCta: {
      text: "Explore My Work",
      href: "#projects"
    },
    resumeCta: {
      text: "Download Resume",
      href: "/assets/Sneha_Chavan_Resume.pdf"
    },
    secondaryCta: {
      text: "Let's Connect",
      href: "#contact"
    }
  }
};

export const skillsData = [
  {
    category: "Programming Languages",
    icon: "code",
    color: "#8B5CF6",
    skills: ["Java", "Python"]
  },
  {
    category: "Backend Development",
    icon: "server",
    color: "#38BDF8",
    skills: [
      "Java",
      "Spring Boot",
      "Spring MVC",
      "Spring Security",
      "RESTful APIs",
      "FastAPI (Python)"
    ]
  },
  {
    category: "Frontend Development",
    icon: "layout",
    color: "#6366F1",
    skills: [
      "React.js",
      "HTML5",
      "CSS3",
      "Tailwind CSS",
      "JavaScript (ES6+)",
      "Axios",
      "React Router"
    ]
  },
  {
    category: "Databases & Persistence",
    icon: "database",
    color: "#10B981",
    skills: [
      "MongoDB",
      "MySQL",
      "Hibernate ORM",
      "Spring Data JPA"
    ]
  },
  {
    category: "Authentication & Security",
    icon: "shield-check",
    color: "#F59E0B",
    skills: [
      "JWT",
      "RBAC",
      "OAuth 2.0 fundamentals"
    ]
  },
  {
    category: "Third-Party Integrations",
    icon: "layers",
    color: "#EC4899",
    skills: [
      "Cloudinary",
      "LocationIQ APIs"
    ]
  },
  {
    category: "Developer Tools",
    icon: "cpu",
    color: "#06B6D4",
    skills: [
      "VS Code",
      "Git",
      "GitHub",
      "Postman",
      "Maven",
      "Eclipse IDE"
    ]
  }
];

export const experienceData = [
  {
    id: "fourise-internship",
    company: "Fourise Software Solutions Pvt. Ltd., Pune",
    role: "Full Stack Developer Intern",
    location: "Pune, India",
    duration: "December 2025 – April 2026 (4 Months)",
    badge: "4-Month Paid Internship",
    technologies: [
      "React.js",
      "Java",
      "Spring Boot",
      "Spring Security",
      "MongoDB",
      "REST APIs",
      "JWT",
      "RBAC",
      "Cloudinary",
      "LocationIQ",
      "Axios"
    ],
    responsibilities: [
      "Completed a 4-month paid Full Stack Developer Internship engineering frontend and backend features for PGMate.",
      "Developed responsive UI components using React.js and backend microservices with Java Spring Boot and Spring Security.",
      "Designed and implemented secure RESTful APIs with JWT authentication and Role-Based Access Control (RBAC).",
      "Contributed to MongoDB database schema design, document modeling, and API data persistence.",
      "Integrated Cloudinary for media uploads and LocationIQ for geolocation and property mapping.",
      "Performed API debugging and testing using Postman to ensure reliable service communication.",
      "Collaborated in Agile sprint planning, daily standups, peer code reviews, and technical documentation."
    ]
  }
];

export const projectsData = [
  {
    id: "pgmate",
    images: [
      { src: "/assets/projects/pgmate-home.png", alt: "PGMate homepage and accommodation search", label: "Homepage" },
      { src: "/assets/projects/pgmate-listings.png", alt: "PGMate property listings and filters", label: "PG Listings" }
    ],
    number: "01",
    title: "PGMate — Smart PG & Hostel Management Platform",
    shortTitle: "PGMate.in",
    tagline: "PG & hostel discovery, room availability & tenant management",
    category: "SaaS / Accommodation Discovery & Management",
    website: "https://pgmate.in/",
    technologies: [
      "React.js",
      "Java",
      "Spring Boot",
      "MongoDB",
      "Cloudinary",
    ],
    description:
      "PGMate is a SaaS platform designed for PG and hostel discovery and accommodation management, bringing property listings, room and bed availability, tenant management, owner dashboards, and administrative workflows into a unified digital experience.",
    capabilities: [
      "Multi-role SaaS workflows for Admin, PG Owner, and Manager.",
      "PG & hostel discovery with comprehensive property listings.",
      "Real-time room and bed availability tracking.",
      "Tenant onboarding and profile records.",
      "LocationIQ geolocation integration for property mapping.",
      "Cloudinary media management for room and property photos.",
      "Admin moderation and property verification workflows.",
      "Owner analytics dashboard for occupancy monitoring and insights."
    ],
    visualType: "property-dashboard",
    actions: {
      visitUrl: "https://pgmate.in/",
      visitLabel: "Visit Website"
    }
  },
  {
    id: "volunteerloop",
    images: [
      { src: "/assets/projects/volunteerloop-organizer.png", alt: "VolunteerLoop organizer dashboard and attendance verification", label: "Organizer dashboard" },
      { src: "/assets/projects/volunteerloop-explore.png", alt: "VolunteerLoop event discovery and volunteering opportunities", label: "Explore events" },
      { src: "/assets/projects/volunteerloop-registrations.png", alt: "VolunteerLoop student registrations and verified hours", label: "Student registrations" }
    ],
    number: "02",
    title: "VolunteerLoop — Student Volunteering & Event Management Platform",
    shortTitle: "VolunteerLoop",
    tagline: "Connecting students with volunteering opportunities and enabling organizations to manage events, registrations, and volunteers.",
    category: "Student Volunteering & Event Management",
    technologies: [
      "React.js",
      "Vite",
      "FastAPI",
      "Python",
      "MongoDB",
      "REST APIs"
    ],
    description:
      "VolunteerLoop is a web‑based platform that connects students with volunteering opportunities and enables organizations to manage events, registrations, and volunteers.",
    capabilities: [
      "Built backend APIs supporting event discovery, organization applications, event and duty management, and volunteer registrations.",
      "Designed workflows for attendance tracking, verified volunteer hours, notifications, and role‑based access for students, organizers, and administrators."
    ],
    actions: {
      githubBackendUrl: "https://github.com/snehachavan0923/Volunteer-Loop",
      githubBackendLabel: "View on GitHub"
    }
  },
  {
    id: "bugflow",
    images: [
      { src: "/assets/projects/bugflow-login.png", alt: "BugFlow sign-in and product landing page", label: "Login" },
      { src: "/assets/projects/bugflow-kanban.png", alt: "BugFlow project issue-tracking Kanban board", label: "Kanban board" },
      { src: "/assets/projects/bugflow-team.png", alt: "BugFlow team management interface", label: "Team management" },
      { src: "/assets/projects/bugflow-billing.png", alt: "BugFlow subscription and billing interface", label: "Subscription & billing" },
      { src: "/assets/projects/bugflow-admin.png", alt: "BugFlow admin dashboard and platform metrics", label: "Admin dashboard" }
    ],
    number: "03",
    title: "BugFlow — Bug Tracking Platform",
    shortTitle: "BugFlow",
    tagline: "Multi-tenant workspace defect tracking with structured lifecycle",
    category: "SaaS / Developer Productivity",
    status: "In Progress",
    technologies: [
      "React.js",
      "Spring Boot",
      "MongoDB",
      "JWT",
      "Cloudinary"
    ],
    description:
      "BugFlow is a multi-tenant bug-tracking platform designed to help software teams organize workspaces, manage projects, report bugs, assign tasks, and track issues through their lifecycle from discovery to resolution.",
    capabilities: [
      "Multi-tenant workspace management.",
      "Project and issue tracking.",
      "Role-based access for Super Admin, Owner, Developer, and Tester.",
      "JWT authentication.",
      "Bug reporting.",
      "Task assignment.",
      "Issue lifecycle management.",
      "Workspace → Project → Issue hierarchy."
    ],
    workflowStages: [
      { step: "01", name: "Reported", desc: "A tester or team member discovers and documents an issue with reproduction details." },
      { step: "02", name: "Prioritized & Assigned", desc: "The bug is prioritized (Critical/High/Medium) and assigned to a developer." },
      { step: "03", name: "Investigation & Fix", desc: "The developer investigates root causes and commits the verified fix." },
      { step: "04", name: "Review & Testing", desc: "Changes move through code review and QA verification passes." },
      { step: "05", name: "Resolved", desc: "Once verified, the issue is closed and logged into sprint metrics." }
    ],
    visualType: "bug-tracker-board",
    githubBackendUrl: "https://github.com/snehachavan0923/P2-bugflow_backend.git",
    actions: {
      visitUrl: null,
      githubBackendUrl: "https://github.com/snehachavan0923/P2-bugflow_backend.git",
      githubBackendLabel: "View Backend on GitHub",
      inProgressNote: "Platform in active development — architecture and backend API under implementation."
    }
  }
];

export const educationData = [
  {
    institution: "RV College of Engineering",
    degree: "Bachelor of Engineering (B.E.)",
    branch: "Computer Science & Engineering",
    duration: "September 2026 – Present",
    location: "Bengaluru, Karnataka, India",
    isCurrent: true,
    exactStatement: "Bachelor of Engineering, Computer Science & Engineering — RV College of Engineering, Bengaluru — September 2026–Present.",
    highlight: "Current Degree Program",
    description: "Pursuing B.E. in Computer Science & Engineering at RVCE. Focusing on advanced computing, software engineering, backend architectures, distributed systems, and scalable full-stack development."
  },
  {
    institution: "Government Polytechnic, Kalaburagi",
    degree: "Diploma in Computer Science & Engineering",
    branch: "Computer Science & Engineering",
    duration: "June 2023 – April 2026",
    location: "Kalaburagi, Karnataka, India",
    isCurrent: false,
    scoreType: "CGPA",
    score: "9.97 / 10",
    highlight: "Academic Distinction — CGPA 9.97 / 10",
    description: "Built strong foundations in data structures, algorithms, object-oriented programming with Java, relational database systems, and full-stack software development."
  },
  {
    institution: "Gayatri Girls High School, Gulbarga",
    degree: "SSLC (Secondary School Leaving Certificate)",
    branch: "KSEEB Board",
    duration: "2022 – 2023",
    location: "Kalaburagi, Karnataka, India",
    isCurrent: false,
    scoreType: "Percentage",
    score: "88.64%",
    highlight: "88.64% Academic Score",
    description: "Completed secondary education under the Karnataka Secondary Education Examination Board (KSEEB) with first-class distinction."
  }
];

export const certificationsData = [
  {
    issuer: "Infosys",
    badgeColor: "#38BDF8",
    title: "Infosys Certified Course Topics",
    topics: [
      "HTML5",
      "CSS3",
      "JavaScript",
      "Spring REST",
      "React.js",
      "Python"
    ]
  },
  {
    issuer: "KGTTI",
    badgeColor: "#8B5CF6",
    title: "KGTTI Technical Specialization",
    topics: [
      "Hardware, Networking & Cybersecurity"
    ]
  },
  {
    issuer: "Cisco Networking Academy",
    badgeColor: "#38BDF8",
    title: "Endpoint Security",
    topics: [
      "Endpoint Security",
      "IT Essentials"
    ],
    date: "Completed: 24 July 2025"
  },
  {
    issuer: "ESSCI (Electronics Sector Skills Council of India)",
    badgeColor: "#8B5CF6",
    title: "Field Technician Computing and Peripherals (ELE/Q4601)",
    topics: [
      "Field Technician Computing and Peripherals (ELE/Q4601)",
      "NSQF Level 4"
    ],
    date: "Issued: 15 January 2025"
  }
];

export const navigationLinks = [
  { name: "Home", href: "#hero" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Experience", href: "#experience" },
  { name: "Projects", href: "#projects" },
  { name: "Education", href: "#education" },
  { name: "Certifications", href: "#certifications" },
  { name: "Resume", href: "#resume" },
  { name: "Contact", href: "#contact" }
];
