import { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Services from "@/components/Services";
import Skills from "@/components/Skills";
import Tools from "@/components/Tools";
import Viewer3D from "@/components/Viewer3D";
import Photography from "@/components/Photography";
import Resume from "@/components/Resume";
import Achievements from "@/components/Achievements";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import LoadingScreen from "@/components/LoadingScreen";
import ParticleWaveBackground from "@/components/ParticleWaveBackground";
import SectionIndicator from "@/components/SectionIndicator";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useKeyboardNavigation } from "@/hooks/useKeyboardNavigation";

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { currentSection, totalSections, scrollToSection } = useKeyboardNavigation();
  
  useScrollReveal();
  
  if (isLoading) {
    return <LoadingScreen onComplete={() => setIsLoading(false)} />;
  }
  
  return (
    <div className="min-h-screen">
      <CustomCursor />
      <ParticleWaveBackground />
      <SectionIndicator
        currentSection={currentSection} 
        totalSections={totalSections}
        onSectionClick={scrollToSection}
      />
      <Navbar />
      <main>
        <section id="hero"><Hero /></section>
        <section id="marquee"><Marquee /></section>
        <section id="services"><Services /></section>
        <section id="skills"><Skills /></section>
        <section id="tools"><Tools /></section>
        <section id="viewer3d"><Viewer3D /></section>
        <section id="photography"><Photography /></section>
        <section id="resume"><Resume /></section>
        <section id="achievements"><Achievements /></section>
        <section id="testimonials"><Testimonials /></section>
        
      </main>
      <Footer />
    </div>
  );
};

export default Index;
