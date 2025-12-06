import { Suspense, lazy, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const Spline = lazy(() => import('@splinetool/react-spline'));

const SplineHero = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const { scrollY } = useScroll();
  
  // Transform values based on scroll
  const splineX = useTransform(scrollY, [0, 500], [0, -300]);
  const splineRotate = useTransform(scrollY, [0, 500], [0, 45]);
  const splineOpacity = useTransform(scrollY, [0, 400], [1, 0]);
  const splineScale = useTransform(scrollY, [0, 500], [1, 0.6]);

  return (
    <div className="fixed inset-0 w-full h-screen pointer-events-none z-0 overflow-hidden" style={{ background: '#050505' }}>
      {/* 3D Spline Object */}
      <motion.div 
        className="absolute inset-0 w-full h-full pointer-events-auto"
        style={{ 
          x: splineX,
          rotate: splineRotate,
          opacity: splineOpacity,
          scale: splineScale,
        }}
      >
        <Suspense fallback={
          <div className="w-full h-full flex items-center justify-center">
            <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        }>
          <Spline 
            scene="https://prod.spline.design/6Wq1Q7YGyM-iab9i/scene.splinecode"
            onLoad={() => setIsLoaded(true)}
            className="w-full h-full"
          />
        </Suspense>
      </motion.div>

      {/* Gradient overlays for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#050505] pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#050505]/50 via-transparent to-[#050505]/50 pointer-events-none" />
      
      {/* Neon glow effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[150px] pointer-events-none" />
    </div>
  );
};

export default SplineHero;
