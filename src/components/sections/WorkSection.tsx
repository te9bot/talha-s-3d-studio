import { motion, Variants } from "framer-motion";
import project1 from "@/assets/project1.png";
import project2 from "@/assets/project2.png";
import project3 from "@/assets/project3.png";
import project4 from "@/assets/project4.png";

const works = [
  { id: 1, title: "Realistic Forest Scene", category: "3D Environment", image: project1 },
  { id: 2, title: "Water Reflection Study", category: "3D Design", image: project2 },
  { id: 3, title: "Atmospheric Landscape", category: "Environment Art", image: project3 },
  { id: 4, title: "Lakeside Environment", category: "3D Scene", image: project4 },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2
    }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 60 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.8 }
  }
};

const WorkSection = () => {
  return (
    <section id="work" className="min-h-screen flex items-center py-24 relative">
      <div className="container mx-auto px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="text-primary text-sm tracking-[0.3em] uppercase mb-4">Portfolio</p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground">
            Selected Work
          </h2>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {works.map((work) => (
            <motion.div
              key={work.id}
              variants={itemVariants}
              className="group relative overflow-hidden rounded-2xl bg-white/5 border border-white/5 hover:border-primary/20 transition-colors duration-500"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img 
                  src={work.image} 
                  alt={work.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <p className="text-primary/80 text-sm tracking-wider uppercase mb-2">{work.category}</p>
                <h3 className="text-xl md:text-2xl font-semibold text-foreground">{work.title}</h3>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default WorkSection;
