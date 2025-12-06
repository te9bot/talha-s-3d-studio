import { motion } from "framer-motion";

const stats = [
  { value: "3+", label: "Years Experience" },
  { value: "30+", label: "Projects Completed" },
  { value: "70+", label: "Happy Clients" },
];

const AboutSection = () => {
  return (
    <section id="about" className="min-h-screen flex items-center py-24 relative">
      <div className="container mx-auto px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left side - Text */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <p className="text-primary text-sm tracking-[0.3em] uppercase mb-4">About</p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-8">
              Creating Digital
              <br />
              <span className="text-primary">Experiences</span>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              I'm a multidisciplinary creative combining 3D design expertise with competitive gaming 
              experience and data analytics skills. My unique background allows me to approach 
              projects from multiple angles, delivering immersive and data-driven solutions.
            </p>
            <p className="text-muted-foreground text-lg leading-relaxed">
              From winning esports tournaments to mentoring at Qiskit Fall Fest, I bring passion 
              and precision to everything I do.
            </p>
          </motion.div>

          {/* Right side - Stats */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
            className="grid grid-cols-1 gap-8"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + index * 0.1, duration: 0.6 }}
                className="p-8 rounded-2xl bg-white/5 border border-white/5 hover:border-primary/20 transition-colors duration-300"
              >
                <p className="text-5xl md:text-6xl font-bold text-primary mb-2">{stat.value}</p>
                <p className="text-muted-foreground tracking-wider uppercase text-sm">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
