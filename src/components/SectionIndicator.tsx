import { motion } from 'framer-motion';

interface SectionIndicatorProps {
  currentSection: number;
  totalSections: number;
  onSectionClick: (index: number) => void;
}

const SECTION_NAMES = [
  'Hero',
  'Marquee',
  'Services',
  'Skills',
  'Tools',
  '3D Viewer',
  'Photography',
  'Resume',
  'Achievements',
  'Testimonials',
  'Contact',
];

const SectionIndicator = ({ currentSection, totalSections, onSectionClick }: SectionIndicatorProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1 }}
      className="fixed right-4 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col gap-2"
    >
      {[...Array(totalSections)].map((_, index) => (
        <motion.button
          key={index}
          onClick={() => onSectionClick(index)}
          className="group relative flex items-center justify-end"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          {/* Section name tooltip */}
          <span className="absolute right-6 px-2 py-1 bg-background/90 backdrop-blur-sm border border-border rounded text-xs text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            {SECTION_NAMES[index]}
          </span>
          
          {/* Indicator dot */}
          <motion.div
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              currentSection === index
                ? 'bg-primary scale-125'
                : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
            }`}
            layoutId="sectionIndicator"
          />
          
          {/* Active glow */}
          {currentSection === index && (
            <motion.div
              layoutId="activeGlow"
              className="absolute w-4 h-4 bg-primary/20 rounded-full -z-10"
              initial={false}
              animate={{ scale: [1, 1.5, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          )}
        </motion.button>
      ))}
      
      {/* Keyboard hint */}
      <div className="mt-4 text-[10px] text-muted-foreground/50 text-center">
        ↑↓ to navigate
      </div>
    </motion.div>
  );
};

export default SectionIndicator;
