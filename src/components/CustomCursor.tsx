import { useEffect, useState, useRef, useCallback } from "react";

interface FootprintDot {
  x: number;
  y: number;
  id: number;
}

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);
  const [footprints, setFootprints] = useState<FootprintDot[]>([]);
  const idRef = useRef(0);
  const lastPosRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>();

  const updateCursor = useCallback((e: MouseEvent) => {
    // Cancel previous frame to prevent buildup
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    
    rafRef.current = requestAnimationFrame(() => {
      setPosition({ x: e.clientX, y: e.clientY });

      // Only add footprint if moved enough distance (reduces state updates)
      const dx = e.clientX - lastPosRef.current.x;
      const dy = e.clientY - lastPosRef.current.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance > 30) {
        lastPosRef.current = { x: e.clientX, y: e.clientY };
        idRef.current += 1;
        setFootprints(prev => [...prev.slice(-5), { x: e.clientX, y: e.clientY, id: idRef.current }]);
      }

      const target = e.target as HTMLElement;
      setIsPointer(
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") !== null ||
        target.closest("button") !== null
      );
    });
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", updateCursor, { passive: true });
    return () => {
      window.removeEventListener("mousemove", updateCursor);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [updateCursor]);

  // Clean old footprints
  useEffect(() => {
    if (footprints.length === 0) return;
    const timeout = setTimeout(() => {
      setFootprints(prev => prev.slice(1));
    }, 400);
    return () => clearTimeout(timeout);
  }, [footprints]);

  return (
    <>
      {/* Footprint trail */}
      {footprints.map((dot, index) => (
        <div
          key={dot.id}
          className="fixed pointer-events-none z-[9996] rounded-full bg-primary/30"
          style={{
            left: dot.x - 4,
            top: dot.y - 4,
            width: 8,
            height: 8,
            opacity: (index + 1) / footprints.length * 0.5,
          }}
        />
      ))}

      {/* Gaming-style crosshair cursor */}
      <div
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{
          transform: `translate(${position.x}px, ${position.y}px) scale(${isPointer ? 1.3 : 1})`,
          transition: 'transform 0.03s linear',
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
          transition: 'transform 0.08s linear',
        }}
      />
    </>
  );
};

export default CustomCursor;