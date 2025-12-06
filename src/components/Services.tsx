import { useEffect, useRef, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

const services = [
  {
    title: "Esports Professional",
    icon: "🎮",
    description: "Competitive PUBG Mobile player with championship victories. Achieved #6 in PMCO 2021 and #1 in NBL PUBG Mobile Super League 2023 ($2000 prize). Also competing in Valorant tournaments."
  },
  {
    title: "3D Design & Export",
    icon: "🎨",
    description: "Complete 3D pipeline from modeling to final export. Creating optimized assets for games, films, and real-time applications with proper topology and LODs."
  },
  {
    title: "Texturing & Materials",
    icon: "✨",
    description: "PBR material creation and texturing expertise. Applying realistic or stylized materials using Substance Painter and procedural workflows."
  },
  {
    title: "Rendering & Visualization",
    icon: "🎬",
    description: "High-quality rendering and visualization services. From product showcases to architectural renders, delivering photorealistic results."
  }
];

const Services = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % services.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + services.length) % services.length);
  };

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

    const cards = sectionRef.current?.querySelectorAll(".service-card");
    cards?.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  return (
    <section id="services" className="container mx-auto px-6 py-24 overflow-hidden" ref={sectionRef}>
      <div className="text-center mb-16">
        <span className="text-sm font-semibold text-primary uppercase tracking-wider">Behind the Pixels</span>
        <h2 className="text-4xl md:text-5xl font-bold mt-2">Measuring Success By Numbers</h2>
      </div>
      
      <div className="relative max-w-4xl mx-auto">
        <div className="overflow-hidden">
          <div 
            className="flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {services.map((service, index) => (
              <div key={index} className="w-full flex-shrink-0 px-4">
                <Card 
                  className="service-card transition-all duration-700 bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-sm border-border/50 hover:border-primary hover:shadow-2xl hover:shadow-primary/30 hover:-translate-y-2 group mx-auto max-w-md"
                >
                  <CardHeader>
                    <div className="text-5xl mb-4 group-hover:scale-125 transition-transform duration-500">{service.icon}</div>
                    <CardTitle className="text-2xl bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-muted-foreground leading-relaxed">{service.description}</CardDescription>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation buttons */}
        <Button
          variant="outline"
          size="icon"
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-card/80 backdrop-blur-sm border-primary/50 hover:bg-primary hover:border-primary"
          onClick={prevSlide}
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-card/80 backdrop-blur-sm border-primary/50 hover:bg-primary hover:border-primary"
          onClick={nextSlide}
        >
          <ChevronRight className="h-6 w-6" />
        </Button>

        {/* Dots indicator */}
        <div className="flex justify-center gap-2 mt-8">
          {services.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? "bg-primary w-8" 
                  : "bg-muted-foreground/30 hover:bg-muted-foreground/60"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;