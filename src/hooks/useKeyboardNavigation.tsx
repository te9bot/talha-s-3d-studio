import { useEffect, useState, useCallback } from 'react';

const SECTION_IDS = [
  'hero',
  'marquee',
  'services',
  'skills',
  'tools',
  'viewer3d',
  'photography',
  'resume',
  'achievements',
  'testimonials',
  'contact',
];

export const useKeyboardNavigation = () => {
  const [currentSection, setCurrentSection] = useState(0);
  const [isNavigating, setIsNavigating] = useState(false);

  const scrollToSection = useCallback((index: number) => {
    const clampedIndex = Math.max(0, Math.min(index, SECTION_IDS.length - 1));
    const sectionId = SECTION_IDS[clampedIndex];
    const element = document.getElementById(sectionId);
    
    if (element) {
      setIsNavigating(true);
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setCurrentSection(clampedIndex);
      
      // Reset navigating state after animation
      setTimeout(() => setIsNavigating(false), 800);
    }
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is typing in an input
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      if (isNavigating) return;

      switch (e.key) {
        case 'ArrowDown':
        case 'j':
          e.preventDefault();
          scrollToSection(currentSection + 1);
          break;
        case 'ArrowUp':
        case 'k':
          e.preventDefault();
          scrollToSection(currentSection - 1);
          break;
        case 'Home':
          e.preventDefault();
          scrollToSection(0);
          break;
        case 'End':
          e.preventDefault();
          scrollToSection(SECTION_IDS.length - 1);
          break;
      }
    };

    // Update current section based on scroll position
    const handleScroll = () => {
      if (isNavigating) return;

      const scrollPosition = window.scrollY + window.innerHeight / 3;
      
      for (let i = SECTION_IDS.length - 1; i >= 0; i--) {
        const element = document.getElementById(SECTION_IDS[i]);
        if (element && element.offsetTop <= scrollPosition) {
          setCurrentSection(i);
          break;
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [currentSection, isNavigating, scrollToSection]);

  return { currentSection, totalSections: SECTION_IDS.length, scrollToSection };
};
