import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import profileImage from "@/assets/profile.jpg";

const roles = ["Visualizer", "Data Analyst", "Esport Athlete", "3D Designer", "Researcher"];

const Hero = () => {
  const [stats, setStats] = useState({ years: 0, projects: 0, clients: 0 });
  const [roleIndex, setRoleIndex] = useState(0);

  // Cycle through roles
  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

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
          >
            Talha Zobayed
          </motion.h1>
          <div className="h-10 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.p
                key={roleIndex}
                className="text-xl md:text-2xl text-primary font-medium"
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -30, opacity: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                {roles[roleIndex]}
              </motion.p>
            </AnimatePresence>
          </div>
          
          {/* Profile Picture */}
          <motion.div 
            className="relative mt-12 w-[300px] h-[300px] md:w-[400px] md:h-[400px] flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            {/* Profile Image */}
            <img 
              src={profileImage} 
              alt="Talha Zobayed" 
              className="w-[280px] h-[280px] md:w-[380px] md:h-[380px] rounded-full object-cover border-4 border-primary shadow-2xl transition-all duration-500 hover:scale-105 hover:shadow-primary/50"
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