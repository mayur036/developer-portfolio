'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useRef, useMemo, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { Grid, MeshReflectorMaterial, Stars } from '@react-three/drei';

/**
 * Creates a simple circular texture for glowing points.
 */
function createCircleTexture() {
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

function getParticleInitialData(count: number) {
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

function Particles() {
  const particleCount = 200;
  const { viewport, mouse } = useThree();
  const circleTexture = useMemo(() => createCircleTexture(), []);

  const {
    pos: positions,
    vel: velocities,
    ph: phases,
  } = useMemo(() => getParticleInitialData(particleCount), [particleCount]);

  const pointsRef = useRef<THREE.Points>(null);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const { clock } = state;
    const time = clock.getElapsedTime();
    const posArray = pointsRef.current.geometry.attributes.position
      .array as Float32Array;

    // Convert 2D mouse [-1, 1] to a rough 3D area
    const mouseX = mouse.x * viewport.width * 4;
    const mouseY = mouse.y * viewport.height * 4;

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;

      // Basic floating motion
      posArray[i3] += velocities[i3] + Math.sin(time + phases[i]) * 0.002;
      posArray[i3 + 1] +=
        velocities[i3 + 1] + Math.cos(time + phases[i]) * 0.002;
      posArray[i3 + 2] += velocities[i3 + 2];

      // Interaction: Repulsion from mouse
      const dx = posArray[i3] - mouseX;
      const dy = posArray[i3 + 1] - mouseY;
      const distSq = dx * dx + dy * dy;

      if (distSq < 100) {
        const dist = Math.sqrt(distSq);
        const force = (10 - dist) * 0.02;
        posArray[i3] += (dx / dist) * force;
        posArray[i3 + 1] += (dy / dist) * force;
      }

      // Bounding box reset
      if (Math.abs(posArray[i3]) > 25) posArray[i3] *= -0.9;
      if (posArray[i3 + 1] > 20 || posArray[i3 + 1] < -6) posArray[i3 + 1] = 20;
      if (Math.abs(posArray[i3 + 2]) > 20) posArray[i3 + 2] *= -0.9;
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
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
        color="#60a5fa"
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function getSweepInitialPositions(count: number) {
  return Array.from({ length: count }).map(() => ({
    x: (Math.random() - 0.5) * 40,
    z: (Math.random() - 0.5) * -50,
  }));
}

function LightSweeps() {
  const sweepRef = useRef<THREE.Group>(null);
  const initialPositions = useMemo(() => getSweepInitialPositions(4), []);

  useFrame(() => {
    if (!sweepRef.current) return;
    sweepRef.current.children.forEach((child, i) => {
      const speed = 0.5 + i * 0.1;
      child.position.z += speed;
      if (child.position.z > 30) {
        child.position.z = -50;
        child.position.x = (Math.random() - 0.5) * 60;
      }
    });
  });

  return (
    <group ref={sweepRef}>
      {initialPositions.map((pos, i) => (
        <mesh
          key={i}
          position={[pos.x, -2.99, pos.z]}
          rotation={[-Math.PI / 2, 0, 0]}
        >
          <planeGeometry args={[0.05, 10]} />
          <meshBasicMaterial
            color="#60a5fa"
            transparent
            opacity={0.4}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      ))}
    </group>
  );
}

function Scene() {
  const { camera } = useThree();
  const groupRef = useRef<THREE.Group>(null);

  useFrame(({ pointer }) => {
    if (!groupRef.current) return;

    // Combine mouse parallax with a subtle scroll-based tilt
    const scrollY = typeof window !== 'undefined' ? window.scrollY : 0;
    const scrollTilt = scrollY * 0.0005;

    const targetX = (pointer.y * Math.PI) / 8 + 0.3 + scrollTilt;
    const targetY = (pointer.x * Math.PI) / 10;

    groupRef.current.rotation.x +=
      (targetX - groupRef.current.rotation.x) * 0.05;
    groupRef.current.rotation.y +=
      (targetY - groupRef.current.rotation.y) * 0.05;

    // Smooth camera transition
    /* eslint-disable react-hooks/immutability */
    camera.position.x += (pointer.x * 3 - camera.position.x) * 0.04;
    camera.position.z = 10 + scrollY * 0.002; // Pull back slightly on scroll
    /* eslint-enable react-hooks/immutability */
    camera.lookAt(0, -1, -8);
  });

  return (
    <>
      <color attach="background" args={['#020617']} />
      <fog attach="fog" args={['#020617', 5, 35]} />
      <ambientLight intensity={0.2} color="#ffffff" />

      {/* Centric Focal Glows */}
      <pointLight
        position={[0, -2, -15]}
        intensity={25}
        color="#3b82f6"
        distance={40}
      />
      <pointLight
        position={[0, 5, -10]}
        intensity={10}
        color="#60a5fa"
        distance={30}
      />

      <group ref={groupRef}>
        <Stars
          radius={100}
          depth={50}
          count={4000}
          factor={4}
          saturation={0}
          fade
          speed={1}
        />

        {/* Layered Particles */}
        <Particles />

        {/* Occasional Light Swipes along grid lines */}
        <LightSweeps />

        {/* The Grid - Minimalist and Premium */}
        <Grid
          position={[0, -3.001, 0]}
          args={[100, 100]}
          cellSize={0}
          cellThickness={0}
          sectionSize={5}
          sectionThickness={1.2}
          sectionColor="#1e3a8a"
          fadeDistance={35}
          fadeStrength={1}
          infiniteGrid
        />

        {/* Reflection Floor Layer */}
        <mesh position={[0, -3.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[100, 100]} />
          <MeshReflectorMaterial
            blur={[400, 100]}
            resolution={512}
            mixBlur={1}
            mixStrength={25}
            roughness={0.8}
            depthScale={1}
            minDepthThreshold={0.4}
            maxDepthThreshold={1.2}
            color="#020617"
            metalness={0.2}
            mirror={1}
          />
        </mesh>
      </group>
    </>
  );
}

export function InteractiveGrid() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  return (
    <AnimatePresence>
      {mounted && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
          className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-[#020617]"
        >
          {/* Subtle Noise Texture Overlay */}
          <div
            className="absolute inset-0 z-10 opacity-[0.03] pointer-events-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            }}
          />

          {/* R3F WebGL Canvas */}
          <div className="absolute inset-0" aria-hidden="true">
            <Canvas camera={{ position: [0, 0, 10], fov: 55 }}>
              <Scene />
            </Canvas>
          </div>

          {/* Vignette & Soft Gradient Masks */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'radial-gradient(circle at 50% 50%, transparent 40%, rgba(2,6,23,0.95) 100%)',
            }}
            aria-hidden="true"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
