'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useRef, useMemo, useState, useCallback } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { Grid, MeshReflectorMaterial, Stars } from '@react-three/drei';
import { useTheme } from 'next-themes';

/**
 * Creates a simple circular texture for glowing points.
 */
function createCircleTexture(): THREE.CanvasTexture | null {
  const canvas = document.createElement('canvas');
  canvas.width = 64;
  canvas.height = 64;
  const context = canvas.getContext('2d');
  if (!context) return null;

  const gradient = context.createRadialGradient(32, 32, 0, 32, 32, 32);
  gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
  gradient.addColorStop(0.2, 'rgba(255, 255, 255, 0.8)');
  gradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.3)');
  gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

  context.fillStyle = gradient;
  context.fillRect(0, 0, 64, 64);

  const texture = new THREE.CanvasTexture(canvas);
  return texture;
}

function getParticleInitialData(count: number): {
  pos: Float32Array;
  vel: Float32Array;
  ph: Float32Array;
} {
  const pos = new Float32Array(count * 3);
  const vel = new Float32Array(count * 3);
  const ph = new Float32Array(count);
  for (let i = 0; i < count; i++) {
    pos[i * 3] = (Math.random() - 0.5) * 40;
    pos[i * 3 + 1] = Math.random() * 20 - 5;
    pos[i * 3 + 2] = (Math.random() - 0.5) * 30 - 5;

    vel[i * 3] = (Math.random() - 0.5) * 0.01;
    vel[i * 3 + 1] = (Math.random() - 0.5) * 0.01;
    vel[i * 3 + 2] = (Math.random() - 0.5) * 0.01;

    ph[i] = Math.random() * Math.PI * 2;
  }
  return { pos, vel, ph };
}

/** Reduced particle count from 200 to 120 to lower GPU/CPU work */
const PARTICLE_COUNT = 120;

function Particles({ color }: { color: string }): React.JSX.Element {
  const { viewport, mouse } = useThree();
  const circleTexture = useMemo(() => createCircleTexture(), []);

  const {
    pos: positions,
    vel: velocities,
    ph: phases,
  } = useMemo(() => getParticleInitialData(PARTICLE_COUNT), []);

  const pointsRef = useRef<THREE.Points>(null);
  const smoothMouse = useRef(new THREE.Vector2(0, 0));

  useFrame((state) => {
    if (!pointsRef.current) return;
    const { clock } = state;
    const time = clock.getElapsedTime();
    const posArray = pointsRef.current.geometry.attributes.position
      .array as Float32Array;

    const targetMouseX = mouse.x * viewport.width * 4;
    const targetMouseY = mouse.y * viewport.height * 4;
    smoothMouse.current.x += (targetMouseX - smoothMouse.current.x) * 0.08;
    smoothMouse.current.y += (targetMouseY - smoothMouse.current.y) * 0.08;
    const mouseX = smoothMouse.current.x;
    const mouseY = smoothMouse.current.y;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3;
      const phase = phases[i];

      posArray[i3] += velocities[i3] + Math.sin(time * 0.6 + phase) * 0.004;
      posArray[i3 + 1] +=
        velocities[i3 + 1] + Math.cos(time * 0.5 + phase * 1.3) * 0.004;
      posArray[i3 + 2] +=
        velocities[i3 + 2] + Math.sin(time * 0.4 + phase * 0.7) * 0.002;

      const dx = posArray[i3] - mouseX;
      const dy = posArray[i3 + 1] - mouseY;
      const distSq = dx * dx + dy * dy;
      const influence = Math.exp(-distSq / 80);
      const force = influence * 0.15;
      posArray[i3] += dx * force;
      posArray[i3 + 1] += dy * force;

      const bx = posArray[i3];
      const by = posArray[i3 + 1];
      const bz = posArray[i3 + 2];
      const boundX = 25,
        boundY = 20,
        boundYMin = -6,
        boundZ = 20;

      if (Math.abs(bx) > boundX * 0.8) {
        posArray[i3] -= bx * 0.01 * (Math.abs(bx) / boundX);
      }
      if (by > boundY * 0.8) {
        posArray[i3 + 1] -= (by - boundY * 0.5) * 0.008;
      } else if (by < boundYMin * 0.8) {
        posArray[i3 + 1] += (boundYMin * 0.5 - by) * 0.008;
      }
      if (Math.abs(bz) > boundZ * 0.8) {
        posArray[i3 + 2] -= bz * 0.01 * (Math.abs(bz) / boundZ);
      }
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true;

    const mat = pointsRef.current.material as THREE.PointsMaterial;
    mat.size = 0.12 + Math.sin(time * 0.8) * 0.02;
    mat.opacity = 0.35 + Math.sin(time * 0.6) * 0.08;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.12}
        map={circleTexture || undefined}
        transparent
        alphaTest={0.001}
        opacity={0.4}
        color={color}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function getSweepInitialData(count: number): Array<{
  x: number;
  z: number;
  phase: number;
}> {
  return Array.from({ length: count }).map(() => ({
    x: (Math.random() - 0.5) * 40,
    z: (Math.random() - 0.5) * -50,
    phase: Math.random() * Math.PI * 2,
  }));
}

function LightSweeps({ color }: { color: string }): React.JSX.Element {
  const sweepRef = useRef<THREE.Group>(null);
  const sweepData = useMemo(() => getSweepInitialData(3), []);

  useFrame((state) => {
    if (!sweepRef.current) return;
    const time = state.clock.getElapsedTime();

    sweepRef.current.children.forEach((child, i) => {
      const speed = 0.3 + i * 0.08;
      child.position.z += speed;
      child.position.x += Math.sin(time * 0.5 + sweepData[i].phase) * 0.02;

      const mat = (child as THREE.Mesh).material as THREE.MeshBasicMaterial;
      const zNorm = (child.position.z + 50) / 80;
      mat.opacity = 0.35 * Math.sin(zNorm * Math.PI);

      if (child.position.z > 30) {
        child.position.z = -50;
        child.position.x = (Math.random() - 0.5) * 60;
      }
    });
  });

  return (
    <group ref={sweepRef}>
      {sweepData.map((pos, i) => (
        <mesh
          key={i}
          position={[pos.x, -2.98, pos.z]}
          rotation={[-Math.PI / 2, 0, 0]}
        >
          <planeGeometry args={[0.025, 10]} />
          <meshBasicMaterial
            color={color}
            transparent
            opacity={0}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      ))}
    </group>
  );
}

/**
 * Reads the `--accent` CSS variable from <html> and keeps it in sync
 * with theme toggles (class change) and accent picker changes (style change).
 */
function useAccentColor(fallback: string): string {
  const [color, setColor] = useState(fallback);

  useEffect(() => {
    const read = (): void => {
      const raw = getComputedStyle(document.documentElement)
        .getPropertyValue('--accent')
        .trim();
      if (raw) setColor(raw);
    };
    read();
    const observer = new MutationObserver(read);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class', 'style'],
    });
    return () => observer.disconnect();
  }, []);

  return color;
}

interface SceneProps {
  isDark: boolean;
  accentColor: string;
}

function Scene({ isDark, accentColor }: SceneProps): React.JSX.Element {
  const groupRef = useRef<THREE.Group>(null);
  const smoothMouseX = useRef(new THREE.Vector2(0, 0));
  const smoothScroll = useRef(0);

  const colors = {
    bg: isDark ? '#020617' : '#f8fafc',
    grid: isDark ? '#60a5fa' : '#0ea5e9',
    ambient: isDark ? '#ffffff' : '#fef2f2',
    point1: isDark ? '#3b82f6' : '#ec4899',
    point2: isDark ? '#60a5fa' : '#06b6d4',
    reflector: isDark ? '#020617' : '#ffffff',
  };

  useFrame((state) => {
    if (!groupRef.current) return;
    const { pointer, camera } = state;

    smoothMouseX.current.x += (pointer.x - smoothMouseX.current.x) * 0.07;
    smoothMouseX.current.y += (pointer.y - smoothMouseX.current.y) * 0.07;

    const scrollY = typeof window !== 'undefined' ? window.scrollY : 0;
    smoothScroll.current += (scrollY - smoothScroll.current) * 0.06;
    const scrollTilt = smoothScroll.current * 0.0004;

    const targetX = (smoothMouseX.current.y * Math.PI) / 12 + 0.3 + scrollTilt;
    const targetY = (smoothMouseX.current.x * Math.PI) / 14;

    groupRef.current.rotation.x +=
      (targetX - groupRef.current.rotation.x) * 0.06;
    groupRef.current.rotation.y +=
      (targetY - groupRef.current.rotation.y) * 0.06;

    camera.position.x +=
      (smoothMouseX.current.x * 2.5 - camera.position.x) * 0.05;
    camera.position.z = 10 + smoothScroll.current * 0.002;
    camera.lookAt(0, -1, -8);
  });

  return (
    <>
      <color attach="background" args={[colors.bg]} />
      <fog attach="fog" args={[colors.bg, 5, 45]} />
      <ambientLight intensity={isDark ? 0.2 : 0.8} color={colors.ambient} />

      <pointLight
        position={[0, -2, -15]}
        intensity={isDark ? 25 : 40}
        color={colors.point1}
        distance={40}
      />
      <pointLight
        position={[0, 5, -10]}
        intensity={isDark ? 10 : 20}
        color={colors.point2}
        distance={30}
      />

      <group ref={groupRef}>
        {/* Reduced star counts to lower GPU work */}
        <Stars
          radius={100}
          depth={50}
          count={isDark ? 2500 : 1000}
          factor={isDark ? 4 : 2}
          saturation={isDark ? 0 : 0.8}
          fade
          speed={1}
        />

        {isDark && <Particles color={colors.grid} />}
        {isDark && <LightSweeps color={accentColor} />}

        <Grid
          position={[0, -2.99, 0]}
          args={[100, 100]}
          cellSize={1}
          cellThickness={0}
          sectionSize={3.5}
          sectionThickness={1.0}
          sectionColor={colors.grid}
          fadeDistance={40}
          fadeStrength={1}
          infiniteGrid
        />

        {/* Reduced reflector resolution from 512 to 256 for performance */}
        <mesh position={[0, -3.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[100, 100]} />
          <MeshReflectorMaterial
            blur={[400, 100]}
            resolution={256}
            mixBlur={1}
            mixStrength={isDark ? 25 : 10}
            roughness={0.8}
            depthScale={1}
            minDepthThreshold={0.4}
            maxDepthThreshold={1.2}
            color={colors.reflector}
            metalness={0.2}
            mirror={1}
          />
        </mesh>
      </group>
    </>
  );
}

export function InteractiveGrid(): React.JSX.Element {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';
  const accentColor = useAccentColor(isDark ? '#60a5fa' : '#3b82f6');

  /**
   * Use requestIdleCallback (with requestAnimationFrame fallback) to defer
   * WebGL canvas mounting until after the browser has finished critical work.
   * This keeps the main thread free for LCP rendering and interaction.
   */
  const scheduleMount = useCallback(() => {
    if (typeof window.requestIdleCallback === 'function') {
      const id = window.requestIdleCallback(() => setMounted(true), {
        timeout: 2000,
      });
      return () => window.cancelIdleCallback(id);
    } else {
      const id = requestAnimationFrame(() => setMounted(true));
      return () => cancelAnimationFrame(id);
    }
  }, []);

  useEffect(() => {
    return scheduleMount();
  }, [scheduleMount]);

  if (!mounted) {
    return (
      <div
        className="fixed inset-0 -z-10 bg-[#f8fafc] dark:bg-[#020617]"
        aria-hidden="true"
      />
    );
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{
          duration: 1.5,
          ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
        }}
        className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-background"
        aria-hidden="true"
      >
        {/* Subtle Noise Texture Overlay */}
        <div
          className="absolute inset-0 z-10 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />

        {/* R3F WebGL Canvas */}
        <div className="absolute inset-0">
          <Canvas
            camera={{ position: [0, 0, 10], fov: 55 }}
            dpr={[1, 1.5]}
            gl={{
              antialias: false,
              alpha: false,
              stencil: false,
              depth: true,
              powerPreference: 'high-performance',
            }}
          >
            <Scene isDark={isDark} accentColor={accentColor} />
          </Canvas>
        </div>

        {/* Vignette & Soft Gradient Masks */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: isDark
              ? 'radial-gradient(circle at 50% 50%, transparent 40%, rgba(2,6,23,0.95) 100%)'
              : 'radial-gradient(circle at 50% 50%, rgba(254,226,226,0.15) 0%, rgba(224,242,254,0.15) 50%, rgba(248,250,252,0.95) 100%)',
          }}
        />
      </motion.div>
    </AnimatePresence>
  );
}
