import { useEffect, useState } from "react";

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);

  useEffect(() => {
    const updateCursor = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });

      const target = e.target as HTMLElement;
      setIsPointer(
        window.getComputedStyle(target).cursor === "pointer" ||
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") !== null ||
        target.closest("button") !== null
      );
    };

    window.addEventListener("mousemove", updateCursor);
    return () => window.removeEventListener("mousemove", updateCursor);
  }, []);

  return (
    <>
      {/* Gaming-style crosshair cursor */}
      <div
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{
          transform: `translate(${position.x}px, ${position.y}px) scale(${isPointer ? 1.3 : 1})`,
          transition: 'transform 0.05s ease-out',
        }}
      >
        {/* Center dot */}
        <div className="absolute w-2 h-2 bg-primary rounded-full" style={{ left: '-4px', top: '-4px' }} />
        
        {/* Crosshair lines */}
        <div className="absolute w-4 h-0.5 bg-primary/80" style={{ left: '-16px', top: '-1px' }} />
        <div className="absolute w-4 h-0.5 bg-primary/80" style={{ left: '8px', top: '-1px' }} />
        <div className="absolute w-0.5 h-4 bg-primary/80" style={{ left: '-1px', top: '-16px' }} />
        <div className="absolute w-0.5 h-4 bg-primary/80" style={{ left: '-1px', top: '8px' }} />
        
        {/* Corner brackets */}
        <div className="absolute w-3 h-3 border-l-2 border-t-2 border-accent/60" style={{ left: '-12px', top: '-12px' }} />
        <div className="absolute w-3 h-3 border-r-2 border-t-2 border-accent/60" style={{ left: '5px', top: '-12px' }} />
        <div className="absolute w-3 h-3 border-l-2 border-b-2 border-accent/60" style={{ left: '-12px', top: '5px' }} />
        <div className="absolute w-3 h-3 border-r-2 border-b-2 border-accent/60" style={{ left: '5px', top: '5px' }} />
      </div>
      
      {/* Outer ring */}
      <div
        className="fixed top-0 left-0 w-12 h-12 border border-primary/40 rounded-full pointer-events-none z-[9998]"
        style={{
          transform: `translate(${position.x - 24}px, ${position.y - 24}px) scale(${isPointer ? 1.3 : 1})`,
          transition: 'transform 0.1s ease-out',
        }}
      />
    </>
  );
};

export default CustomCursor;