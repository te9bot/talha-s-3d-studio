import { Card, CardContent, CardHeader } from "@/components/ui/card";

interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Munzereen Shahid",
    role: "Teacher | Author",
    content: "Talha brought ideas to life with clarity and flair. His sharp design sense, speed, and collaborative mindset made every project smoother and stronger.",
    rating: 5
  },
  {
    id: "2",
    name: "Asif Hossain",
    role: "Creatives Head | iO Minute School",
    content: "Talha brought ideas to life with clarity and flair. His sharp design sense, speed, and collaborative mindset made every project smoother and stronger.",
    rating: 5
  },
  {
    id: "3",
    name: "Sarah Johnson",
    role: "Creative Director | Design Studio",
    content: "Working with this artist has been an absolute game-changer for our projects. The attention to detail and creative vision brought our ideas to life beyond expectations.",
    rating: 5
  }
];

const Testimonials = () => {
  if (testimonials.length === 0) return null;

  return (
    <section id="testimonials" className="container mx-auto px-6 py-24 overflow-hidden">
      <div className="text-center mb-16">
        <span className="text-sm font-semibold text-primary uppercase tracking-wider">Client Feedback</span>
        <h2 className="text-4xl md:text-5xl font-bold mt-2">Hear From My Clients</h2>
      </div>
      
      <div className="relative">
        <div className="flex gap-8 animate-scroll-left hover:[animation-play-state:paused]">
          {[...testimonials, ...testimonials].map((testimonial, index) => (
            <Card 
              key={index} 
              className="bg-card/50 backdrop-blur-sm border-border min-w-[350px] flex-shrink-0 hover:scale-105 transition-transform duration-300 hover:border-primary hover:shadow-xl hover:shadow-primary/20"
            >
              <CardHeader>
                <div className="text-primary text-2xl mb-2 animate-pulse-glow">
                  {"★".repeat(testimonial.rating)}
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground italic mb-6">"{testimonial.content}"</p>
                <h4 className="font-bold text-lg">{testimonial.name}</h4>
                <span className="text-sm text-muted-foreground">{testimonial.role}</span>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
