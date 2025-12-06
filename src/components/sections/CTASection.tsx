import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const CTASection = () => {
  return (
    <section id="contact" className="min-h-screen flex items-center justify-center py-24 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-primary/10 via-transparent to-transparent" />
      
      <div className="container mx-auto px-8 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <motion.p 
            className="text-primary text-sm tracking-[0.3em] uppercase mb-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Let's Work Together
          </motion.p>
          
          <motion.h2 
            className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <span className="text-foreground">Have a project</span>
            <br />
            <span className="text-primary">in mind?</span>
          </motion.h2>
          
          <motion.p 
            className="text-muted-foreground text-lg md:text-xl max-w-lg mx-auto mb-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button 
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-8 py-6 text-lg group"
              asChild
            >
              <a href="mailto:talhazobayed7@gmail.com">
                Get In Touch
                <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
              </a>
            </Button>
            <Button 
              size="lg"
              variant="outline"
              className="border-white/10 bg-white/5 hover:bg-white/10 rounded-full px-8 py-6 text-lg"
              asChild
            >
              <a href="https://www.facebook.com/share/17J2LCdfgK/" target="_blank" rel="noopener noreferrer">
                Connect on Social
              </a>
            </Button>
          </motion.div>
        </motion.div>

        {/* Contact info */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1, duration: 0.6 }}
          className="mt-20 flex flex-wrap justify-center gap-8 text-muted-foreground"
        >
          <a href="mailto:talhazobayed7@gmail.com" className="hover:text-primary transition-colors">
            talhazobayed7@gmail.com
          </a>
          <span className="hidden sm:inline">•</span>
          <a href="tel:+8801907934007" className="hover:text-primary transition-colors">
            +880 1907 934007
          </a>
          <span className="hidden sm:inline">•</span>
          <span>Dhaka, Bangladesh</span>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
