import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import profileImage from "@/assets/profile.jpg";

const MinimalNavbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled 
          ? "bg-background/60 backdrop-blur-xl border-b border-white/5" 
          : "bg-transparent"
      }`}
    >
      <nav className="container mx-auto px-8 py-6 flex justify-between items-center">
        {/* Logo */}
        <a href="#hero" className="flex items-center gap-3 group">
          <img 
            src={profileImage} 
            alt="TZ" 
            className="w-10 h-10 rounded-full object-cover border border-white/10 transition-transform duration-300 group-hover:scale-110" 
          />
          <span className="text-lg font-medium tracking-tight text-foreground/90">
            Talha<span className="text-primary">.</span>
          </span>
        </a>

        {/* Contact Button */}
        <Button 
          variant="outline" 
          className="border-white/10 bg-white/5 hover:bg-white/10 text-foreground/80 hover:text-foreground transition-all duration-300 rounded-full px-6"
          asChild
        >
          <a href="#contact">Contact</a>
        </Button>
      </nav>
    </header>
  );
};

export default MinimalNavbar;
