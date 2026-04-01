'use client';

import { useMotionValue, useSpring, motion } from 'framer-motion';
import { useCallback, useEffect, useRef } from 'react';
import * as THREE from 'three';

export function InteractiveGrid() {
  const containerRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const frameRef = useRef<number>(0);
  const mouseRef = useRef({ x: 0, y: 0 });

  // Motion values for smooth CSS grid offset
  const gridOffsetX = useMotionValue(0);
  const gridOffsetY = useMotionValue(0);
  const springOffsetX = useSpring(gridOffsetX, {
    stiffness: 50,
    damping: 25,
    mass: 0.8,
  });
  const springOffsetY = useSpring(gridOffsetY, {
    stiffness: 50,
    damping: 25,
    mass: 0.8,
  });

  // Glow position follows mouse
  const glowX = useMotionValue(50);
  const glowY = useMotionValue(50);
  const springGlowX = useSpring(glowX, { stiffness: 60, damping: 30 });
  const springGlowY = useSpring(glowY, { stiffness: 60, damping: 30 });

  // Subscribe to spring glow values and update the DOM directly
  useEffect(() => {
    const updateGlow = () => {
      if (glowRef.current) {
        glowRef.current.style.background = `radial-gradient(600px circle at ${springGlowX.get()}% ${springGlowY.get()}%, var(--accent-glow), transparent 60%)`;
      }
    };

    const unsubX = springGlowX.on('change', updateGlow);
    const unsubY = springGlowY.on('change', updateGlow);

    return () => {
      unsubX();
      unsubY();
    };
  }, [springGlowX, springGlowY]);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const normX = (e.clientX / innerWidth - 0.5) * 2; // -1 to 1
      const normY = (e.clientY / innerHeight - 0.5) * 2;

      // Grid shifts opposite to mouse movement for parallax
      gridOffsetX.set(normX * -20);
      gridOffsetY.set(normY * -15);

      // Glow follows mouse (percentage)
      glowX.set((e.clientX / innerWidth) * 100);
      glowY.set((e.clientY / innerHeight) * 100);

      // Store for Three.js
      mouseRef.current = { x: normX, y: normY };
    },
    [gridOffsetX, gridOffsetY, glowX, glowY],
  );

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, [handleMouseMove]);

  // Three.js particle field
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      container.clientWidth / container.clientHeight,
      0.1,
      1000,
    );
    camera.position.z = 3;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: false,
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    const particleCount = 600;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 12;
      positions[i + 1] = (Math.random() - 0.5) * 12;
      positions[i + 2] = (Math.random() - 0.5) * 6;
      velocities[i] = (Math.random() - 0.5) * 0.002;
      velocities[i + 1] = (Math.random() - 0.5) * 0.002;
      velocities[i + 2] = (Math.random() - 0.5) * 0.001;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const material = new THREE.PointsMaterial({
      size: 0.015,
      color: new THREE.Color('#60a5fa'),
      transparent: true,
      opacity: 0.45,
      sizeAttenuation: true,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    const animate = () => {
      frameRef.current = requestAnimationFrame(animate);

      const posArray = geometry.attributes.position
        .array as unknown as Float32Array;
      for (let i = 0; i < particleCount * 3; i += 3) {
        posArray[i] += velocities[i];
        posArray[i + 1] += velocities[i + 1];
        posArray[i + 2] += velocities[i + 2];

        if (Math.abs(posArray[i]) > 6) velocities[i] *= -1;
        if (Math.abs(posArray[i + 1]) > 6) velocities[i + 1] *= -1;
        if (Math.abs(posArray[i + 2]) > 3) velocities[i + 2] *= -1;
      }
      geometry.attributes.position.needsUpdate = true;

      // Camera subtly follows mouse for parallax depth
      camera.position.x +=
        (mouseRef.current.x * 0.3 - camera.position.x) * 0.02;
      camera.position.y +=
        (-mouseRef.current.y * 0.3 - camera.position.y) * 0.02;
      camera.lookAt(scene.position);

      particles.rotation.y += 0.0002;
      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(frameRef.current);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      if (container && renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Three.js particle canvas */}
      <div ref={containerRef} className="absolute inset-0" aria-hidden="true" />

      {/* CSS grid that moves with mouse */}
      <motion.div
        className="absolute -inset-10"
        style={{
          x: springOffsetX,
          y: springOffsetY,
          backgroundImage: `
            linear-gradient(var(--grid-line) 1px, transparent 1px),
            linear-gradient(90deg, var(--grid-line) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
        aria-hidden="true"
      />

      {/* Radial glow that follows mouse — updated via ref */}
      <div ref={glowRef} className="absolute inset-0" aria-hidden="true" />

      {/* Vignette mask to fade edges */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% 0%, transparent 20%, var(--background) 75%)',
        }}
        aria-hidden="true"
      />
    </div>
  );
}
