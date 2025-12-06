import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import profileImage from "@/assets/profile.jpg";

const Hero = () => {
  const [hoveredName, setHoveredName] = useState(false);
  const [stats, setStats] = useState({ years: 0, projects: 0, clients: 0 });

  useEffect(() => {
    const animateNumbers = () => {
      const duration = 2000;
      const steps = 60;
      const interval = duration / steps;
      
      let step = 0;
      const timer = setInterval(() => {
        step++;
        const progress = step / steps;
        setStats({
          years: Math.floor(3 * progress),
          projects: Math.floor(30 * progress),
          clients: Math.floor(70 * progress),
        });
        
        if (step >= steps) clearInterval(timer);
      }, interval);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          animateNumbers();
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    const element = document.getElementById("stats");
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <section id="home" className="container mx-auto px-6 py-16 md:py-24 flex items-center min-h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center w-full">
        
        {/* Left Side - Stats */}
        <motion.div 
          id="stats" 
          className="relative text-left order-2 lg:order-1"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="space-y-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <h3 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                {stats.years}+
              </h3>
              <p className="text-lg text-muted-foreground mt-2">Years of Experience</p>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <h3 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                {stats.projects}+
              </h3>
              <p className="text-lg text-muted-foreground mt-2">Projects Completed</p>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              <h3 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                {stats.clients}+
              </h3>
              <p className="text-lg text-muted-foreground mt-2">Satisfied Clients</p>
            </motion.div>
          </div>
        </motion.div>

        {/* Center - Name & Profile Pic */}
        <div className="text-center relative flex flex-col items-center order-1 lg:order-2">
          <motion.h2 
            className="text-3xl md:text-4xl text-muted-foreground font-medium"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            This is
          </motion.h2>
          <motion.h1 
            className="text-5xl md:text-7xl lg:text-8xl font-bold my-4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            style={{ 
              transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg)',
              transition: 'transform 0.5s ease'
            }}
            onMouseMove={(e) => {
              const element = e.currentTarget;
              const rect = element.getBoundingClientRect();
              const x = e.clientX - rect.left;
              const y = e.clientY - rect.top;
              const centerX = rect.width / 2;
              const centerY = rect.height / 2;
              const rotateX = (y - centerY) / 20;
              const rotateY = (centerX - x) / 20;
              element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px)`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
            }}
          >
            Talha Zobayed
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl text-muted-foreground font-light"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            Visualizer & Story Teller
          </motion.p>
          
          {/* Profile Picture with Orbital Ring */}
          <motion.div 
            className="relative mt-12 w-[300px] h-[300px] md:w-[400px] md:h-[400px] flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            style={{
              transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg)',
              transition: 'transform 0.5s ease'
            }}
            onMouseMove={(e) => {
              const element = e.currentTarget;
              const rect = element.getBoundingClientRect();
              const x = e.clientX - rect.left;
              const y = e.clientY - rect.top;
              const centerX = rect.width / 2;
              const centerY = rect.height / 2;
              const rotateX = (y - centerY) / 15;
              const rotateY = (centerX - x) / 15;
              element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(30px)`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
            }}
          >
            {/* Orbital Ring */}
            <div className="absolute inset-0 m-auto w-[320px] h-[320px] md:w-[420px] md:h-[420px] rounded-full border-t-2 border-r-2 border-primary border-b-transparent border-l-transparent animate-spin-slow"></div>
            
            {/* Floating Tags */}
            <motion.div 
              className="absolute -left-10 md:-left-16 top-1/4 px-4 py-2 rounded-full bg-card/60 backdrop-blur-sm border border-border text-sm text-foreground"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              Visualizer
            </motion.div>
            <motion.div 
              className="absolute -right-10 md:-right-16 top-1/3 px-4 py-2 rounded-full bg-card/60 backdrop-blur-sm border border-border text-sm text-foreground"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            >
              Data Analyst
            </motion.div>
            <motion.div 
              className="absolute -right-6 md:-right-12 bottom-1/4 px-4 py-2 rounded-full bg-card/60 backdrop-blur-sm border border-border text-sm text-foreground"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            >
              Esports
            </motion.div>
            <motion.div 
              className="absolute left-1/3 -bottom-10 md:-bottom-16 px-4 py-2 rounded-full bg-card/60 backdrop-blur-sm border border-border text-sm text-foreground"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
            >
              3D Designer
            </motion.div>
            
            {/* Profile Image */}
            <img 
              src={profileImage} 
              alt="Talha Zobayed" 
              className="w-[280px] h-[280px] md:w-[380px] md:h-[380px] rounded-full object-cover border-4 border-primary shadow-2xl transition-all duration-700 hover:scale-110 hover:shadow-[0_0_80px_rgba(168,85,247,0.8),0_0_120px_rgba(168,85,247,0.4)] hover:border-accent hover:brightness-110"
            />
          </motion.div>
        </div>

        {/* Right Side - Empty for balance */}
        <div className="hidden lg:block order-3"></div>
      </div>
    </section>
  );
};

export default Hero;