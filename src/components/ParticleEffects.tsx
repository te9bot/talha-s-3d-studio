import { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  type: 'circle' | 'square' | 'triangle' | 'star';
}

const ParticleEffects = () => {
  const [particles, setParticles] = useState<Particle[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  
  // Parallax transforms for floating elements
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -400]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const rotate1 = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const rotate2 = useTransform(scrollYProgress, [0, 1], [0, -180]);

  useEffect(() => {
    // Generate random particles
    const generateParticles = () => {
      const newParticles: Particle[] = [];
      const types: Particle['type'][] = ['circle', 'square', 'triangle', 'star'];
      
      for (let i = 0; i < 30; i++) {
        newParticles.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 8 + 2,
          duration: Math.random() * 10 + 10,
          delay: Math.random() * 5,
          type: types[Math.floor(Math.random() * types.length)],
        });
      }
      setParticles(newParticles);
    };

    generateParticles();
  }, []);

  const renderParticle = (particle: Particle) => {
    const baseClasses = "absolute opacity-20";
    
    switch (particle.type) {
      case 'circle':
        return (
          <div
            className={`${baseClasses} rounded-full bg-primary`}
            style={{ width: particle.size, height: particle.size }}
          />
        );
      case 'square':
        return (
          <div
            className={`${baseClasses} bg-primary/50`}
            style={{ width: particle.size, height: particle.size }}
          />
        );
      case 'triangle':
        return (
          <div
            className={`${baseClasses} border-l-transparent border-r-transparent border-b-primary/50`}
            style={{
              width: 0,
              height: 0,
              borderLeftWidth: particle.size / 2,
              borderRightWidth: particle.size / 2,
              borderBottomWidth: particle.size,
            }}
          />
        );
      case 'star':
        return (
          <div
            className={`${baseClasses} text-primary/50`}
            style={{ fontSize: particle.size }}
          >
            ✦
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Floating particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, Math.random() * 20 - 10, 0],
            opacity: [0.1, 0.3, 0.1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {renderParticle(particle)}
        </motion.div>
      ))}

      {/* Large floating geometric shapes */}
      <motion.div
        className="absolute top-[20%] left-[10%] w-32 h-32 border border-primary/10 rounded-full"
        style={{ y: y1, rotate: rotate1 }}
      />
      <motion.div
        className="absolute top-[40%] right-[15%] w-24 h-24 border border-primary/5"
        style={{ y: y2, rotate: rotate2 }}
      />
      <motion.div
        className="absolute top-[60%] left-[5%] w-16 h-16 border border-primary/10 rounded-lg"
        style={{ y: y3 }}
      />
      <motion.div
        className="absolute top-[80%] right-[10%] w-20 h-20 border-2 border-primary/5 rounded-full"
        style={{ y: y1 }}
      />

      {/* Glowing orbs */}
      <motion.div
        className="absolute top-[30%] right-[20%] w-4 h-4 bg-primary/20 rounded-full blur-sm"
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{ duration: 4, repeat: Infinity }}
        style={{ y: y2 }}
      />
      <motion.div
        className="absolute top-[70%] left-[20%] w-6 h-6 bg-primary/15 rounded-full blur-md"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.15, 0.3, 0.15],
        }}
        transition={{ duration: 5, repeat: Infinity, delay: 1 }}
        style={{ y: y1 }}
      />

      {/* Grid lines overlay */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(to right, hsl(var(--primary)) 1px, transparent 1px),
            linear-gradient(to bottom, hsl(var(--primary)) 1px, transparent 1px)
          `,
          backgroundSize: '100px 100px',
        }} />
      </div>

      {/* Diagonal lines */}
      <motion.div
        className="absolute top-0 left-[30%] w-px h-[200vh] bg-gradient-to-b from-transparent via-primary/5 to-transparent origin-top"
        style={{ rotate: 15 }}
        animate={{ opacity: [0.05, 0.1, 0.05] }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div
        className="absolute top-0 right-[25%] w-px h-[200vh] bg-gradient-to-b from-transparent via-primary/5 to-transparent origin-top"
        style={{ rotate: -10 }}
        animate={{ opacity: [0.03, 0.08, 0.03] }}
        transition={{ duration: 10, repeat: Infinity, delay: 2 }}
      />
    </div>
  );
};

export default ParticleEffects;
