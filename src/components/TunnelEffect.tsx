import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';

// Create tunnel geometry with seeded random
function createTunnelGeometry(count: number, radius: number, tubeLength: number): THREE.BufferGeometry {
  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(count * 3);
  let seed = 42;

  const nextRand = () => {
    seed = (seed * 16807 + 0) % 2147483647;
    return (seed - 1) / 2147483646;
  };

  for (let i = 0; i < count; i++) {
    const r = radius + (nextRand() - 0.5) * radius * 0.4;
    const theta = nextRand() * Math.PI * 2;
    const z = -nextRand() * tubeLength;
    positions[i * 3] = Math.cos(theta) * r;
    positions[i * 3 + 1] = Math.sin(theta) * r;
    positions[i * 3 + 2] = z;
  }

  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  return geometry;
}

// Create particle geometry
function createParticleGeometry(count: number, spread: number): THREE.BufferGeometry {
  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(count * 3);

  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * spread;
    positions[i * 3 + 1] = (Math.random() - 0.5) * spread;
    positions[i * 3 + 2] = (Math.random() - 0.5) * spread;
  }

  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  return geometry;
}

// Tunnel rings component
function TunnelRings() {
  const groupRef = useRef<THREE.Group>(null);
  const numRings = 20;
  const ringSpacing = 4;

  const ringGeometry = useMemo(() => createTunnelGeometry(2000, 5, 0), []);

  const lineMaterial = useMemo(
    () =>
      new THREE.PointsMaterial({
        color: '#00E5FF',
        size: 0.03,
        opacity: 0.8,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        sizeAttenuation: true,
      }),
    []
  );

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.children.forEach((ring, i) => {
        ring.position.z = ((Date.now() * 0.005) + i * ringSpacing) % 100 - 80;
      });
    }
  });

  return (
    <group ref={groupRef}>
      {Array.from({ length: numRings }).map((_, i) => (
        <points
          key={i}
          geometry={ringGeometry}
          material={lineMaterial}
        />
      ))}
    </group>
  );
}

// Particles component
function Particles() {
  const particlesRef = useRef<THREE.Points>(null);
  const particleGeometry = useMemo(() => createParticleGeometry(1500, 40), []);

  const particleMaterial = useMemo(
    () =>
      new THREE.PointsMaterial({
        color: '#A78BFA',
        size: 0.04,
        opacity: 0.25,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        sizeAttenuation: true,
      }),
    []
  );

  useFrame(() => {
    if (particlesRef.current) {
      const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < positions.length; i += 3) {
        positions[i + 1] += Math.sin(Date.now() * 0.001 + positions[i]) * 0.002;
        positions[i + 2] += 0.01;
      }
      particlesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <points
      ref={particlesRef}
      geometry={particleGeometry}
      material={particleMaterial}
    />
  );
}

// Core tunnel points
function TunnelCore() {
  const coreGeometry = useMemo(() => createTunnelGeometry(3000, 3, 100), []);

  const coreMaterial = useMemo(
    () =>
      new THREE.PointsMaterial({
        color: '#7C3AED',
        size: 0.06,
        opacity: 0.4,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        sizeAttenuation: true,
      }),
    []
  );

  return <points geometry={coreGeometry} material={coreMaterial} />;
}

// Mouse-reactive camera controller
function CameraController() {
  const mouseTarget = useRef(new THREE.Vector2(0, 0));
  const { camera, mouse } = useThree();

  useFrame(() => {
    mouseTarget.current.copy(mouse as THREE.Vector2);
    camera.position.x += (mouseTarget.current.x * 2.0 - camera.position.x) * 0.05;
    camera.position.y += (mouseTarget.current.y * 1.0 - camera.position.y) * 0.05;
    camera.position.z -= 0.12;

    if (camera.position.z < -80) {
      camera.position.z = 0;
    }

    camera.lookAt(0, 0, camera.position.z - 10);
  });

  return null;
}

// Main tunnel scene
function TunnelScene() {
  return (
    <>
      <fog attach="fog" args={['#0A0E27', 10, 80]} />
      <CameraController />
      <TunnelRings />
      <TunnelCore />
      <Particles />
      <EffectComposer>
        <Bloom
          intensity={0.8}
          luminanceThreshold={0.2}
          luminanceSmoothing={0.5}
          mipmapBlur
        />
      </EffectComposer>
    </>
  );
}

const TunnelEffect: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full"
      style={{ zIndex: 1 }}
    >
      <Canvas
        camera={{ position: [0, 0, 0], fov: 75, near: 0.1, far: 1000 }}
        dpr={Math.min(window.devicePixelRatio, 2)}
        gl={{
          antialias: true,
          alpha: false,
          powerPreference: 'high-performance',
        }}
        onCreated={({ gl }) => {
          gl.setClearColor('#0A0E27');
          gl.toneMapping = THREE.ACESFilmicToneMapping;
          gl.toneMappingExposure = 1.2;
        }}
      >
        <TunnelScene />
      </Canvas>
    </div>
  );
};

export default React.memo(TunnelEffect);
