const Marquee = () => {
  const items = [
    "Development",
    "3D Design",
    "Graphic Design",
    "Motion Graphics",
    "Esports",
    "Data Analysis",
    "Visualization",
    "Content Creation"
  ];

  return (
    <section className="py-8 overflow-hidden bg-primary/5 border-y border-primary/20">
      <div className="flex gap-8 animate-scroll-left">
        {[...items, ...items, ...items].map((item, index) => (
          <div key={index} className="flex items-center gap-8 whitespace-nowrap">
            <span className="text-2xl md:text-4xl font-bold text-foreground/80">{item}</span>
            <span className="text-2xl md:text-4xl text-primary">•</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Marquee;