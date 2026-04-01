'use client';

import { motion, useMotionValue, useSpring } from 'framer-motion';
import { ArrowDown, Mail, FolderOpen } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

import { Button } from '@/components/ui/button';
import { PERSONAL } from '@/src/data/portfolio';

function ParticleBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const frameRef = useRef<number>(0);

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

    // Create particles
    const particleCount = 400;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 8;
      positions[i + 1] = (Math.random() - 0.5) * 8;
      positions[i + 2] = (Math.random() - 0.5) * 4;
      velocities[i] = (Math.random() - 0.5) * 0.002;
      velocities[i + 1] = (Math.random() - 0.5) * 0.002;
      velocities[i + 2] = (Math.random() - 0.5) * 0.001;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const material = new THREE.PointsMaterial({
      size: 0.02,
      color: new THREE.Color('#6ee7b7'),
      transparent: true,
      opacity: 0.6,
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

        // Wrap around boundaries
        if (Math.abs(posArray[i]) > 4) velocities[i] *= -1;
        if (Math.abs(posArray[i + 1]) > 4) velocities[i + 1] *= -1;
        if (Math.abs(posArray[i + 2]) > 2) velocities[i + 2] *= -1;
      }
      geometry.attributes.position.needsUpdate = true;

      particles.rotation.y += 0.0003;
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
    <div
      ref={containerRef}
      className="pointer-events-none absolute inset-0"
      aria-hidden="true"
    />
  );
}

function TypewriterText({ text }: { text: string }) {
  const [displayText, setDisplayText] = useState('');
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index <= text.length) {
        setDisplayText(text.slice(0, index));
        index++;
      } else {
        clearInterval(interval);
        // Blink cursor a few times then hide
        setTimeout(() => setShowCursor(false), 2000);
      }
    }, 40);
    return () => clearInterval(interval);
  }, [text]);

  return (
    <span>
      {displayText}
      {showCursor && <span className="animate-pulse text-accent">|</span>}
    </span>
  );
}

export function Hero() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      const { clientX, clientY, currentTarget } = e;
      const { width, height } = currentTarget.getBoundingClientRect();
      mouseX.set((clientX - width / 2) * 0.02);
      mouseY.set((clientY - height / 2) * 0.02);
    },
    [mouseX, mouseY],
  );

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' as const },
    },
  };

  return (
    <section
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      <ParticleBackground />

      <motion.div
        className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={{ x: springX, y: springY }}
      >
        <motion.p
          variants={itemVariants}
          className="mb-4 text-sm font-medium tracking-widest text-accent uppercase"
        >
          Hello, my name is
        </motion.p>

        <motion.h1
          variants={itemVariants}
          className="text-fluid-xl font-heading font-bold tracking-tight text-heading"
        >
          {PERSONAL.name}
          <span className="text-accent">.</span>
        </motion.h1>

        <motion.div
          variants={itemVariants}
          className="text-fluid-md mt-4 font-medium text-body sm:mt-6"
        >
          <TypewriterText text={PERSONAL.tagline} />
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="mt-8 flex flex-col items-center justify-center gap-4 sm:mt-10 sm:flex-row"
        >
          <Button
            size="lg"
            className="gap-2 rounded-full bg-accent px-6 py-3 font-medium text-accent-foreground transition-all hover:bg-accent/90 hover:shadow-lg"
            onClick={() =>
              document
                .querySelector('#projects')
                ?.scrollIntoView({ behavior: 'smooth' })
            }
          >
            <FolderOpen className="size-4" />
            View Projects
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="gap-2 rounded-full border-border-color px-6 py-3 font-medium transition-all hover:border-accent hover:text-accent"
            onClick={() =>
              document
                .querySelector('#contact')
                ?.scrollIntoView({ behavior: 'smooth' })
            }
          >
            <Mail className="size-4" />
            Get in Touch
          </Button>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.5 }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ArrowDown className="size-5 text-muted-text" />
        </motion.div>
      </motion.div>
    </section>
  );
}
