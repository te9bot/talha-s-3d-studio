import { useEffect, useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import project1 from "@/assets/project1.png";
import project2 from "@/assets/project2.png";
import project3 from "@/assets/project3.png";
import project4 from "@/assets/project4.png";
import project5 from "@/assets/project5.png";
import project6 from "@/assets/project6.jpeg";
import project7 from "@/assets/project7.png";

const skillCategories = [
  {
    title: "3D Design & Visualization",
    skills: ["Blender", "3D Modeling", "Texturing", "PBR Materials", "Rendering", "Animation", "UV Mapping", "Rigging"]
  },
  {
    title: "Gaming & Esports",
    skills: ["🎮 PUBG Mobile", "🔫 Valorant", "🎯 Strategy & Tactics", "👥 Team Coordination", "🏆 Competitive Gaming", "📹 Live Streaming"]
  },
  {
    title: "Technical Skills",
    skills: ["Substance Painter", "Maya", "Unreal Engine", "Unity", "Photoshop", "After Effects", "Data Analyst"]
  },
  {
    title: "Soft Skills",
    skills: ["Team Leadership", "Problem Solving", "Creative Direction", "Time Management", "Communication"]
  }
];

const projects = [
  {
    title: "Futuristic Character Design",
    description: "High-detail 3D character model with advanced texturing and rigging for game development.",
    image: project1,
  },
  {
    title: "Cyberpunk Environment",
    description: "Atmospheric sci-fi scene with detailed architecture and moody lighting effects.",
    image: project2,
  },
  {
    title: "Mechanical Construct",
    description: "Complex mechanical 3D model showcasing technical modeling and material work.",
    image: project3,
  },
  {
    title: "Stylized Character Asset",
    description: "Optimized game-ready character with clean topology and performance-focused design.",
    image: project4,
  },
  {
    title: "Organic Creature Design",
    description: "Detailed creature model with realistic anatomy and surface detailing.",
    image: project5,
  },
  {
    title: "Technical Visualization",
    description: "Professional product visualization with photorealistic rendering techniques.",
    image: project6,
  },
  {
    title: "Abstract 3D Composition",
    description: "Creative 3D artwork exploring form, composition, and visual storytelling.",
    image: project7,
  }
];

const Skills = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("opacity-100", "translate-y-0");
            entry.target.classList.remove("opacity-0", "translate-y-8");
          }
        });
      },
      { threshold: 0.1 }
    );

    const cards = sectionRef.current?.querySelectorAll(".skill-card");
    cards?.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  return (
    <section id="skills" className="container mx-auto px-6 py-24" ref={sectionRef}>
      <div className="text-center mb-16">
        <span className="text-sm font-semibold text-primary uppercase tracking-wider">Arsenal of Expertise</span>
        <h2 className="text-4xl md:text-5xl font-bold mt-2">Skills & Proficiencies</h2>
        <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
          From 3D design to competitive gaming, here's what I bring to the table.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
        {skillCategories.map((category, index) => (
          <Card 
            key={index}
            className="skill-card opacity-0 translate-y-8 transition-all duration-700 bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-sm border-border/50 hover:border-primary hover:shadow-2xl hover:shadow-primary/30 hover:-translate-y-2 group"
            style={{ 
              transitionDelay: `${index * 100}ms`
            }}
          >
            <CardHeader>
              <CardTitle className="text-2xl bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                {category.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, idx) => (
                  <Badge 
                    key={idx}
                    variant="secondary"
                    className="px-3 py-1 bg-secondary/50 hover:bg-primary/20 hover:border-primary transition-all duration-300 hover:scale-110"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Featured Works Section */}
      <div className="text-center mb-16">
        <span className="text-sm font-semibold text-primary uppercase tracking-wider">Behind the Pixels</span>
        <h2 className="text-4xl md:text-5xl font-bold mt-2">Featured Works</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, index) => (
          <Card 
            key={index}
            className="group overflow-hidden bg-card/50 backdrop-blur-sm border-border hover:border-primary transition-all duration-500 hover:shadow-2xl hover:shadow-primary/50"
            style={{
              transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg)',
              transition: 'transform 0.5s ease, box-shadow 0.5s ease'
            }}
            onMouseMove={(e) => {
              const card = e.currentTarget;
              const rect = card.getBoundingClientRect();
              const x = e.clientX - rect.left;
              const y = e.clientY - rect.top;
              const centerX = rect.width / 2;
              const centerY = rect.height / 2;
              const rotateX = (y - centerY) / 10;
              const rotateY = (centerX - x) / 10;
              card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px)`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
            }}
          >
            <div className="overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
              <img 
                src={project.image} 
                alt={project.title} 
                className="w-full h-64 object-cover transition-all duration-500 group-hover:scale-110 group-hover:brightness-110"
              />
            </div>
            <CardHeader>
              <CardTitle className="text-2xl group-hover:text-primary transition-colors duration-300">{project.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-muted-foreground">{project.description}</CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default Skills;
