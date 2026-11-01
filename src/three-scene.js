/**
 * Three.js 3D Hero Scene
 * Custom abstract 3D composition representing connected software systems,
 * backend engineering, and distributed digital architectures.
 *
 * Features:
 * - Sculptural metallic core with wireframe facets
 * - Dual orbital rings with glowing digital node indicators
 * - Dynamic constellation particle field
 * - Mouse parallax tilt with smooth damping
 * - Viewport visibility culling (pauses render loop off-screen)
 * - WebGL availability detection with graceful fallback
 * - Accessibility: respects prefers-reduced-motion
 * - Mobile optimized: reduced polygon & particle count, touch-safe (no touch blocking)
 */

import * as THREE from 'three';

export function initThreeScene() {
  const container = document.getElementById('hero-canvas-container');
  if (!container) return;

  // Check WebGL support
  function isWebGLAvailable() {
    try {
      const canvas = document.createElement('canvas');
      return !!(window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
    } catch {
      return false;
    }
  }

  if (!isWebGLAvailable()) {
    container.classList.add('webgl-unsupported');
    return;
  }

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isMobile = window.innerWidth < 768;
  const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;

  // Scene, Camera, Renderer
  const scene = new THREE.Scene();
  const width = container.clientWidth || window.innerWidth;
  const height = container.clientHeight || window.innerHeight;

  const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
  camera.position.z = isMobile ? 6.8 : isTablet ? 6.0 : 5.2;

  const renderer = new THREE.WebGLRenderer({
    antialias: !isMobile,
    alpha: true,
    powerPreference: 'high-performance'
  });
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.25 : 2));
  renderer.setClearColor(0x000000, 0); // Transparent background
  container.appendChild(renderer.domElement);

  // Group container for all 3D components
  const systemGroup = new THREE.Group();
  scene.add(systemGroup);

  // Positioning: On desktop, nudge to the right to frame the left text headline gracefully.
  // On mobile, position lower so it appears centered below the stacked headline.
  if (isMobile) {
    systemGroup.position.x = 0;
    systemGroup.position.y = -0.35;
  } else if (isTablet) {
    systemGroup.position.x = 0.6;
    systemGroup.position.y = 0;
  } else {
    systemGroup.position.x = 1.15;
    systemGroup.position.y = 0.1;
  }

  // --- 1. CORE SCULPTURAL GEOMETRY ---
  // Inner metallic icosahedron
  const coreGeometry = new THREE.IcosahedronGeometry(isMobile ? 0.95 : 1.35, isMobile ? 0 : 1);
  const coreMaterial = new THREE.MeshStandardMaterial({
    color: 0x11131c,
    metalness: 0.85,
    roughness: 0.25,
    wireframe: false
  });
  const coreMesh = new THREE.Mesh(coreGeometry, coreMaterial);
  systemGroup.add(coreMesh);

  // Outer wireframe shell
  const wireGeometry = new THREE.IcosahedronGeometry(isMobile ? 1.1 : 1.55, 1);
  const wireMaterial = new THREE.MeshStandardMaterial({
    color: 0x8B5CF6,
    wireframe: true,
    transparent: true,
    opacity: 0.55,
    emissive: 0x6366F1,
    emissiveIntensity: 0.4
  });
  const wireMesh = new THREE.Mesh(wireGeometry, wireMaterial);
  systemGroup.add(wireMesh);

  // Inner pulsing core sphere (backend kernel / data core)
  const kernelGeometry = new THREE.SphereGeometry(isMobile ? 0.5 : 0.75, isMobile ? 16 : 24, isMobile ? 16 : 24);
  const kernelMaterial = new THREE.MeshBasicMaterial({
    color: 0x38BDF8,
    wireframe: true,
    transparent: true,
    opacity: 0.4
  });
  const kernelMesh = new THREE.Mesh(kernelGeometry, kernelMaterial);
  systemGroup.add(kernelMesh);

  // --- 2. ORBITAL RINGS & NODES ---
  const ringGroup = new THREE.Group();
  systemGroup.add(ringGroup);

  // Orbital Ring 1: Violet tilt
  const ring1Geometry = new THREE.TorusGeometry(isMobile ? 1.6 : 2.2, 0.016, 12, isMobile ? 60 : 100);
  const ring1Material = new THREE.MeshStandardMaterial({
    color: 0x8B5CF6,
    emissive: 0x8B5CF6,
    emissiveIntensity: 0.6,
    roughness: 0.3
  });
  const ring1 = new THREE.Mesh(ring1Geometry, ring1Material);
  ring1.rotation.x = Math.PI / 3;
  ring1.rotation.y = Math.PI / 6;
  ringGroup.add(ring1);

  // Orbital Ring 2: Cyan tilt
  const ring2Geometry = new THREE.TorusGeometry(isMobile ? 1.9 : 2.55, 0.015, 12, isMobile ? 60 : 100);
  const ring2Material = new THREE.MeshStandardMaterial({
    color: 0x38BDF8,
    emissive: 0x38BDF8,
    emissiveIntensity: 0.7,
    roughness: 0.3
  });
  const ring2 = new THREE.Mesh(ring2Geometry, ring2Material);
  ring2.rotation.x = -Math.PI / 4;
  ring2.rotation.z = Math.PI / 4;
  ringGroup.add(ring2);

  // Interconnected Nodes along the orbits (services / microservices)
  const nodeCount = isMobile ? 6 : 12;
  const nodeGeometry = new THREE.SphereGeometry(isMobile ? 0.04 : 0.045, 10, 10);
  const nodeMaterial = new THREE.MeshStandardMaterial({
    color: 0x38BDF8,
    emissive: 0x38BDF8,
    emissiveIntensity: 0.9,
    roughness: 0.1
  });

  const nodes = [];
  for (let i = 0; i < nodeCount; i++) {
    const nodeMesh = new THREE.Mesh(nodeGeometry, nodeMaterial);
    const radius = (isMobile ? 1.75 : 2.2) + (Math.random() - 0.5) * 0.3;
    const theta = (i / nodeCount) * Math.PI * 2;
    nodeMesh.position.set(
      Math.cos(theta) * radius,
      (Math.sin(theta * 2) * 0.35),
      Math.sin(theta) * radius
    );
    ringGroup.add(nodeMesh);
    nodes.push({ mesh: nodeMesh, theta, radius, speed: 0.007 + (i % 3) * 0.003 });
  }

  // --- 3. PARTICLES CONSTELLATION FIELD ---
  const particleCount = isMobile ? 70 : 260;
  const particleGeometry = new THREE.BufferGeometry();
  const positions = new Float32Array(particleCount * 3);
  const colors = new Float32Array(particleCount * 3);

  const colorViolet = new THREE.Color(0x8B5CF6);
  const colorCyan = new THREE.Color(0x38BDF8);

  for (let i = 0; i < particleCount; i++) {
    const radius = (isMobile ? 1.6 : 2.0) + Math.random() * (isMobile ? 3.0 : 4.5);
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);

    positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
    positions[i * 3 + 2] = radius * Math.cos(phi);

    const mixedColor = Math.random() > 0.5 ? colorViolet : colorCyan;
    colors[i * 3] = mixedColor.r;
    colors[i * 3 + 1] = mixedColor.g;
    colors[i * 3 + 2] = mixedColor.b;
  }

  particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

  const particleMaterial = new THREE.PointsMaterial({
    size: isMobile ? 0.03 : 0.045,
    vertexColors: true,
    transparent: true,
    opacity: 0.65
  });

  const particleField = new THREE.Points(particleGeometry, particleMaterial);
  systemGroup.add(particleField);

  // --- 4. LIGHTING ---
  const ambientLight = new THREE.AmbientLight(0x0e111a, 2.5);
  scene.add(ambientLight);

  const violetLight = new THREE.PointLight(0x8B5CF6, 4.5, 20);
  violetLight.position.set(3, 4, 3);
  scene.add(violetLight);

  const cyanLight = new THREE.PointLight(0x38BDF8, 3.5, 20);
  cyanLight.position.set(-3, -3, 2);
  scene.add(cyanLight);

  const pointerLight = new THREE.PointLight(0xA78BFA, 2.5, 10);
  pointerLight.position.set(0, 0, 4);
  scene.add(pointerLight);

  // --- 5. INTERACTION & ANIMATION LOOP ---
  let mouseX = 0;
  let mouseY = 0;
  let targetRotationX = 0;
  let targetRotationY = 0;
  let currentRotationX = 0;
  let currentRotationY = 0;
  let isIntersecting = true;
  let animId = null;

  function onMouseMove(event) {
    if (window.innerWidth < 768) return; // Ignore mouse parallax on mobile
    mouseX = (event.clientX / window.innerWidth) * 2 - 1;
    mouseY = -(event.clientY / window.innerHeight) * 2 + 1;

    targetRotationY = mouseX * 0.4;
    targetRotationX = -mouseY * 0.3;

    pointerLight.position.x = mouseX * 2.5;
    pointerLight.position.y = mouseY * 2.5;
  }

  window.addEventListener('mousemove', onMouseMove, { passive: true });

  // Entrance scaling animation
  systemGroup.scale.set(0.01, 0.01, 0.01);
  let entranceProgress = 0;

  // Window resize handler
  function onResize() {
    const w = container.clientWidth || window.innerWidth;
    const h = container.clientHeight || window.innerHeight;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
    
    const mobile = window.innerWidth < 768;
    const tablet = window.innerWidth >= 768 && window.innerWidth < 1024;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, mobile ? 1.25 : 2));

    camera.position.z = mobile ? 6.8 : tablet ? 6.0 : 5.2;
    if (mobile) {
      systemGroup.position.x = 0;
      systemGroup.position.y = -0.35;
    } else if (tablet) {
      systemGroup.position.x = 0.6;
      systemGroup.position.y = 0;
    } else {
      systemGroup.position.x = 1.15;
      systemGroup.position.y = 0.1;
    }
  }

  window.addEventListener('resize', onResize, { passive: true });

  // IntersectionObserver to pause loop when scrolled away from Hero
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        isIntersecting = entry.isIntersecting;
        if (isIntersecting && !animId) {
          animate();
        }
      });
    },
    { threshold: 0.05 }
  );
  observer.observe(container);

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      if (animId) {
        cancelAnimationFrame(animId);
        animId = null;
      }
    } else if (isIntersecting && !animId) {
      animate();
    }
  });

  // Render Loop
  let clock = new THREE.Clock();

  function animate() {
    if (!isIntersecting || document.hidden) {
      animId = null;
      return;
    }

    animId = requestAnimationFrame(animate);

    const elapsedTime = clock.getElapsedTime();

    // Entrance scaling ramp
    if (entranceProgress < 1) {
      entranceProgress += 0.025;
      const easeScale = 1 - Math.pow(1 - entranceProgress, 3);
      systemGroup.scale.set(easeScale, easeScale, easeScale);
    }

    if (!prefersReducedMotion) {
      const mobile = window.innerWidth < 768;
      // Floating breathing movement
      systemGroup.position.y = (mobile ? -0.35 : 0.1) + Math.sin(elapsedTime * 1.2) * 0.08;

      // Core rotation
      coreMesh.rotation.y += 0.003;
      coreMesh.rotation.x += 0.002;
      wireMesh.rotation.y -= 0.004;
      wireMesh.rotation.z += 0.002;
      kernelMesh.rotation.x += 0.005;

      // Orbital Rings rotation
      ring1.rotation.z += 0.006;
      ring2.rotation.z -= 0.005;
      ringGroup.rotation.y += 0.002;

      // Update orbiting nodes along path
      nodes.forEach((item) => {
        item.theta += item.speed;
        item.mesh.position.x = Math.cos(item.theta) * item.radius;
        item.mesh.position.z = Math.sin(item.theta) * item.radius;
        item.mesh.position.y = Math.sin(item.theta * 2 + elapsedTime) * 0.3;
      });

      // Slowly rotate particle field
      particleField.rotation.y += 0.0006;
      particleField.rotation.x += 0.0003;

      // Smooth inertia parallax towards mouse target
      currentRotationX += (targetRotationX - currentRotationX) * 0.05;
      currentRotationY += (targetRotationY - currentRotationY) * 0.05;

      systemGroup.rotation.x = currentRotationX;
      systemGroup.rotation.y = currentRotationY;
    }

    renderer.render(scene, camera);
  }

  animate();

  return {
    destroy: () => {
      observer.disconnect();
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      if (animId) cancelAnimationFrame(animId);
      renderer.dispose();
      container.innerHTML = '';
    }
  };
}
