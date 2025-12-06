import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import profileImage from "@/assets/profile.jpg";

const Rotating3DPhoto = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Rotate 360 degrees based on scroll through first section
  const rotateY = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.1, 0.8]);
  const opacity = useTransform(scrollYProgress, [0, 0.8, 1], [1, 1, 0]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <div ref={containerRef} className="h-[200vh] relative">
      <div className="sticky top-0 h-screen flex items-center justify-center">
        <motion.div
          style={{ 
            rotateY,
            scale,
            opacity,
            perspective: 1000
          }}
          className="relative"
        >
          {/* Glow effect */}
          <div className="absolute inset-0 blur-3xl bg-primary/20 rounded-full scale-150" />
          
          {/* 3D Photo container */}
          <div 
            className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96"
            style={{ transformStyle: "preserve-3d" }}
          >
            {/* Front face */}
            <div 
              className="absolute inset-0 rounded-2xl overflow-hidden border border-white/10 shadow-2xl"
              style={{ 
                backfaceVisibility: "hidden",
                transform: "rotateY(0deg)"
              }}
            >
              <img 
                src={profileImage} 
                alt="Talha Zobayed" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
            </div>

            {/* Back face */}
            <div 
              className="absolute inset-0 rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-gradient-to-br from-primary/20 to-background flex items-center justify-center"
              style={{ 
                backfaceVisibility: "hidden",
                transform: "rotateY(180deg)"
              }}
            >
              <div className="text-center p-8">
                <h3 className="text-2xl font-bold text-foreground mb-2">3D Designer</h3>
                <p className="text-muted-foreground">Esports Pro • Data Analyst</p>
              </div>
            </div>
          </div>

          {/* Floating rings */}
          <motion.div 
            className="absolute inset-0 border border-primary/20 rounded-full"
            style={{ scale: 1.5 }}
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />
          <motion.div 
            className="absolute inset-0 border border-primary/10 rounded-full"
            style={{ scale: 2 }}
            animate={{ rotate: -360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          />
        </motion.div>
      </div>
    </div>
  );
};

export default Rotating3DPhoto;
