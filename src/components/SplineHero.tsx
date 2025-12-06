import { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { motion, useScroll, useTransform } from 'framer-motion';

interface ParticleWaveProps {
  mouse: React.MutableRefObject<{ x: number; y: number }>;
}

const ParticleWave = ({ mouse }: ParticleWaveProps) => {
  const meshRef = useRef<THREE.Points>(null);
  const { viewport } = useThree();
  
  const particleCount = 2000;
  
  const [positions, colors] = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 20;
      positions[i3 + 1] = (Math.random() - 0.5) * 10;
      positions[i3 + 2] = (Math.random() - 0.5) * 5;
      
      // Purple to cyan gradient
      const t = Math.random();
      colors[i3] = 0.54 + t * 0.1;     // R
      colors[i3 + 1] = 0.17 + t * 0.6; // G
      colors[i3 + 2] = 0.89 + t * 0.1; // B
    }
    
    return [positions, colors];
  }, []);

  const originalPositions = useMemo(() => new Float32Array(positions), [positions]);

  useFrame((state) => {
    if (!meshRef.current) return;
    
    const time = state.clock.getElapsedTime();
    const positionsArray = meshRef.current.geometry.attributes.position.array as Float32Array;
    
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      const originalX = originalPositions[i3];
      const originalY = originalPositions[i3 + 1];
      const originalZ = originalPositions[i3 + 2];
      
      // Sine wave motion
      const waveX = Math.sin(time * 0.5 + originalY * 0.5) * 0.5;
      const waveY = Math.sin(time * 0.3 + originalX * 0.3) * 0.3;
      
      // Mouse repulsion
      const dx = (mouse.current.x * viewport.width * 0.5) - originalX;
      const dy = (mouse.current.y * viewport.height * 0.5) - originalY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const maxDist = 3;
      
      let repelX = 0;
      let repelY = 0;
      
      if (dist < maxDist && dist > 0) {
        const force = (1 - dist / maxDist) * 1.5;
        repelX = -(dx / dist) * force;
        repelY = -(dy / dist) * force;
      }
      
      positionsArray[i3] = originalX + waveX + repelX;
      positionsArray[i3 + 1] = originalY + waveY + repelY;
      positionsArray[i3 + 2] = originalZ + Math.sin(time * 0.4 + originalX * 0.2) * 0.2;
    }
    
    meshRef.current.geometry.attributes.position.needsUpdate = true;
    meshRef.current.rotation.y = time * 0.05;
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={particleCount}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

const SplineHero = () => {
  const mouseRef = useRef({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      };
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <motion.div 
      ref={containerRef}
      className="fixed inset-0 w-full h-screen z-0"
      style={{ 
        background: '#050505',
        opacity,
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.5} />
        <ParticleWave mouse={mouseRef} />
      </Canvas>
      
      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#050505] pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#050505]/30 via-transparent to-[#050505]/30 pointer-events-none" />
      
      {/* Neon glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/15 rounded-full blur-[120px] pointer-events-none" />
    </motion.div>
  );
};

export default SplineHero;
