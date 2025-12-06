import { useEffect, useRef, useState } from 'react';

interface Particle {
  x: number;
  y: number;
  baseY: number;
  speed: number;
  amplitude: number;
  offset: number;
  size: number;
  opacity: number;
}

const ParticleWaveBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number>();
  const [scrollOpacity, setScrollOpacity] = useState(1);

  // Scroll-based fade out effect
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const fadeEnd = window.innerHeight * 0.6;
      const newOpacity = Math.max(0, 1 - scrollY / fadeEnd);
      setScrollOpacity(newOpacity);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    const initParticles = () => {
      const particles: Particle[] = [];
      const particleCount = Math.min(1500, Math.floor((canvas.width * canvas.height) / 800));
      
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          baseY: Math.random() * canvas.height,
          speed: 0.5 + Math.random() * 1.5,
          amplitude: 30 + Math.random() * 50,
          offset: Math.random() * Math.PI * 2,
          size: 1 + Math.random() * 2,
          opacity: 0.3 + Math.random() * 0.7,
        });
      }
      particlesRef.current = particles;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const animate = () => {
      if (!ctx || !canvas) return;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const time = Date.now() * 0.001;
      const mouseX = mouseRef.current.x;
      const mouseY = mouseRef.current.y;

      particlesRef.current.forEach((particle, index) => {
        // Wave motion
        const waveY = Math.sin(time * particle.speed + particle.offset + particle.x * 0.005) * particle.amplitude;
        particle.y = particle.baseY + waveY;

        // Mouse interaction - particles repel from cursor
        const dx = particle.x - mouseX;
        const dy = particle.y - mouseY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const maxDistance = 150;

        let offsetX = 0;
        let offsetY = 0;

        if (distance < maxDistance) {
          const force = (1 - distance / maxDistance) * 50;
          offsetX = (dx / distance) * force;
          offsetY = (dy / distance) * force;
        }

        // Horizontal flow
        particle.x += particle.speed * 0.3;
        if (particle.x > canvas.width + 50) {
          particle.x = -50;
          particle.baseY = Math.random() * canvas.height;
        }

        const displayX = particle.x + offsetX;
        const displayY = particle.y + offsetY;

        // Draw particle with glow
        const gradient = ctx.createRadialGradient(
          displayX, displayY, 0,
          displayX, displayY, particle.size * 3
        );
        
        // Purple/violet color scheme matching the reference
        const hue = 270 + Math.sin(time + index * 0.1) * 20;
        gradient.addColorStop(0, `hsla(${hue}, 80%, 70%, ${particle.opacity})`);
        gradient.addColorStop(0.5, `hsla(${hue}, 70%, 50%, ${particle.opacity * 0.5})`);
        gradient.addColorStop(1, `hsla(${hue}, 60%, 30%, 0)`);

        ctx.beginPath();
        ctx.arc(displayX, displayY, particle.size * 3, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        // Inner bright core
        ctx.beginPath();
        ctx.arc(displayX, displayY, particle.size * 0.5, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${hue}, 100%, 90%, ${particle.opacity})`;
        ctx.fill();
      });

      // Draw connecting lines between nearby particles
      ctx.strokeStyle = 'rgba(139, 92, 246, 0.05)';
      ctx.lineWidth = 0.5;
      
      for (let i = 0; i < particlesRef.current.length; i += 3) {
        for (let j = i + 1; j < particlesRef.current.length; j += 3) {
          const p1 = particlesRef.current[i];
          const p2 = particlesRef.current[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 80) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('mousemove', handleMouseMove);
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 transition-opacity duration-150"
      style={{ 
        background: 'transparent',
        mixBlendMode: 'screen',
        opacity: scrollOpacity,
      }}
    />
  );
};

export default ParticleWaveBackground;
