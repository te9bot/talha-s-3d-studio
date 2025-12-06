import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import profileImage from "@/assets/profile.jpg";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${
      scrolled ? "bg-background/80 backdrop-blur-lg border-b border-border" : "bg-transparent"
    }`}>
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <a href="#home" className="text-2xl font-bold flex items-center gap-2">
          <img src={profileImage} alt="TZ" className="w-10 h-10 rounded-full object-cover border-2 border-primary" />
          TZ<span className="text-primary">.</span>
        </a>

        {/* Nav Links */}
        <div className="hidden md:flex space-x-6">
          {["home", "services", "works", "resume", "contact"].map((section) => (
            <a 
              key={section}
              href={`#${section}`} 
              className="text-muted-foreground hover:text-foreground transition-colors capitalize"
            >
              {section}
            </a>
          ))}
        </div>

        {/* Hire Me Button */}
        <div className="flex items-center gap-3">
          <Button asChild className="bg-primary hover:bg-primary/90 shadow-lg shadow-primary/30">
            <a href="#contact">Hire Me!</a>
          </Button>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;