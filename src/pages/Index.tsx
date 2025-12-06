import { useState } from "react";
import MinimalNavbar from "@/components/MinimalNavbar";
import LoadingScreen from "@/components/LoadingScreen";
import CustomCursor from "@/components/CustomCursor";
import Rotating3DPhoto from "@/components/Rotating3DPhoto";
import HeroSection from "@/components/sections/HeroSection";
import WorkSection from "@/components/sections/WorkSection";
import AboutSection from "@/components/sections/AboutSection";
import CTASection from "@/components/sections/CTASection";
import Footer from "@/components/Footer";
import { useLenis } from "@/hooks/useLenis";

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  
  useLenis();
  
  if (isLoading) {
    return <LoadingScreen onComplete={() => setIsLoading(false)} />;
  }
  
  return (
    <div className="min-h-screen" style={{ background: '#050505' }}>
      <CustomCursor />
      <MinimalNavbar />
      
      <main>
        {/* Hero with rotating 3D photo */}
        <HeroSection />
        <Rotating3DPhoto />
        
        {/* Main sections */}
        <WorkSection />
        <AboutSection />
        <CTASection />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
