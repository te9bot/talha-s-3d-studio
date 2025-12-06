import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import project1 from "@/assets/project1.png";
import project2 from "@/assets/project2.png";
import project3 from "@/assets/project3.png";
import project4 from "@/assets/project4.png";
import project5 from "@/assets/project5.png";
import project6 from "@/assets/project6.jpeg";
import project7 from "@/assets/project7.png";
import project8 from "@/assets/project8.png";

const projects = [
  {
    title: "Realistic Forest Scene",
    description: "A high-fidelity nature environment featuring realistic foliage, organic texturing, and natural lighting.",
    image: project1,
  },
  {
    title: "Water Reflection Study",
    description: "A detailed environmental closeup focusing on water surface reflections, wet ground textures, and particle distribution.",
    image: project2,
  },
  {
    title: "Atmospheric Misty Landscape",
    description: "A mood-focused environment utilizing volumetric fog and lighting to create depth and atmosphere in a dense forest setting.",
    image: project3,
  },
  {
    title: "Lakeside Environment",
    description: "A scenic landscape render showcasing water simulation, rocky terrain integration, and depth-of-field composition.",
    image: project4,
  },
  {
    title: "Park Scene Composition",
    description: "A composed scene combining hard-surface modeling (bench) with organic character modeling and foliage.",
    image: project5,
  },
  {
    title: "Autumn Cottage Design",
    description: "An architectural environment featuring seasonal lighting, vegetation scattering, and rustic building textures.",
    image: project6,
  },
  {
    title: "Abstract 3D Composition",
    description: "Creative 3D artwork exploring form, composition, and visual storytelling.",
    image: project7,
  },
  {
    title: "Cosmic Earth View",
    description: "Stunning space visualization of Earth with atmospheric glow and stellar backdrop.",
    image: project8,
  }
];

const Works = () => {
  return (
    <section id="works" className="container mx-auto px-6 py-24">
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
      
      <div className="text-center mt-12">
        <Button size="lg" className="bg-primary hover:bg-primary/90 shadow-lg shadow-primary/30">
          Explore More
        </Button>
      </div>
    </section>
  );
};

export default Works;
