import { useEffect, useRef, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

const achievements = [
  {
    year: "2023",
    title: "Gold Medalist - Physics Olympiad",
    description: "Ranked #1 among 500+ regional participants in Physics Olympiad 2023",
    icon: "🥇",
    category: "Academic"
  },
  {
    year: "2023",
    title: "Queen's Commonwealth Essay Gold Award",
    description: "Chosen from 19,000+ entries worldwide in the prestigious essay competition",
    icon: "👑",
    category: "Writing"
  },
  {
    year: "2023",
    title: "NBL PUBG Mobile Super League Champion",
    description: "Led TEX Esports to victory, securing $30,000 prize with strategic leadership",
    icon: "🏆",
    category: "Esports"
  },
  {
    year: "2023",
    title: "National Finalist - Innovation Challenge",
    description: "Developed AI-driven flood-rescue solution reaching national finals",
    icon: "🤖",
    category: "Innovation"
  },
  {
    year: "2023",
    title: "Duke of Edinburgh Silver Award",
    description: "Completed 100+ hours of service, skills development & adventurous journey",
    icon: "🏅",
    category: "Leadership"
  },
  {
    year: "2022",
    title: "Youth Science Festival Champion",
    description: "Led school team to top national position in Youth Science Festival",
    icon: "🔬",
    category: "Science"
  },
  {
    year: "2021",
    title: "PMCO 2021 Top 6 Finish",
    description: "Achieved top-6 placement in PUBG Mobile Club Open as team strategist",
    icon: "🎮",
    category: "Esports"
  },
  {
    year: "2020-2024",
    title: "53+ Education & Health Programs",
    description: "Led community initiatives benefiting 500+ children and trained 30+ youth leaders",
    icon: "🌟",
    category: "Community Impact"
  },
];

const Achievements = () => {
  const [visibleItems, setVisibleItems] = useState<number[]>([]);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute("data-index") || "0");
            setVisibleItems(prev => [...prev, index]);
          }
        });
      },
      { threshold: 0.2 }
    );

    const items = sectionRef.current?.querySelectorAll(".achievement-item");
    items?.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, []);

  return (
    <section id="achievements" className="container mx-auto px-6 py-24" ref={sectionRef}>
      <motion.div 
        className="text-center mb-16"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <span className="text-sm font-semibold text-primary uppercase tracking-wider">Journey of Excellence</span>
        <h2 className="text-4xl md:text-5xl font-bold mt-2">Achievements & Milestones</h2>
        <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
          A timeline of major accomplishments across academics, esports, community service, and leadership
        </p>
      </motion.div>

      <div className="relative max-w-5xl mx-auto">
        {/* Timeline line */}
        <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-accent to-primary/20 transform -translate-x-1/2 hidden md:block" />

        <div className="space-y-12">
          {achievements.map((achievement, index) => {
            const isVisible = visibleItems.includes(index);
            const isLeft = index % 2 === 0;

            return (
              <motion.div
                key={index}
                data-index={index}
                className={`achievement-item relative flex items-center ${
                  isLeft ? "md:flex-row" : "md:flex-row-reverse"
                } flex-col gap-8`}
                initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true, margin: "-50px" }}
              >
                {/* Timeline dot */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-primary border-4 border-background hidden md:block z-10 shadow-lg shadow-primary/50">
                  <div className="absolute inset-0 rounded-full bg-primary animate-ping opacity-75" />
                </div>

                {/* Content card */}
                <div className="md:w-1/2 w-full">
                  <Card className="bg-card/50 backdrop-blur-sm border-border hover:border-primary transition-all duration-500 hover:shadow-2xl hover:shadow-primary/30 group">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <motion.div 
                          className="text-5xl"
                          whileHover={{ scale: 1.25, rotate: 10 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          {achievement.icon}
                        </motion.div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-xs font-semibold text-primary uppercase tracking-wider">
                              {achievement.category}
                            </span>
                            <span className="text-xs text-muted-foreground">• {achievement.year}</span>
                          </div>
                          <h3 className="text-xl font-bold mb-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                            {achievement.title}
                          </h3>
                          <p className="text-muted-foreground text-sm leading-relaxed">
                            {achievement.description}
                          </p>
                          
                          {/* Progress bar */}
                          <div className="mt-4 h-1.5 bg-muted rounded-full overflow-hidden">
                            <motion.div 
                              className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
                              initial={{ width: "0%" }}
                              whileInView={{ width: "100%" }}
                              transition={{ duration: 1, delay: index * 0.15 }}
                              viewport={{ once: true }}
                            />
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Empty space for alternating layout */}
                <div className="md:w-1/2 hidden md:block" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Achievements;