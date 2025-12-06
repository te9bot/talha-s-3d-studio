import { useEffect, useState, useRef } from "react";

interface TrailDot {
  x: number;
  y: number;
  id: number;
}

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);
  const [trail, setTrail] = useState<TrailDot[]>([]);
  const trailIdRef = useRef(0);

  useEffect(() => {
    let lastTrailTime = 0;
    const trailInterval = 50; // ms between trail dots

    const updateCursor = (e: MouseEvent) => {
      const now = Date.now();
      
      requestAnimationFrame(() => {
        setPosition({ x: e.clientX, y: e.clientY });
      });

      // Add trail dots
      if (now - lastTrailTime > trailInterval) {
        lastTrailTime = now;
        trailIdRef.current += 1;
        setTrail(prev => {
          const newTrail = [...prev, { x: e.clientX, y: e.clientY, id: trailIdRef.current }];
          return newTrail.slice(-12); // Keep last 12 dots
        });
      }

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

  // Clean up old trail dots
  useEffect(() => {
    const cleanup = setInterval(() => {
      setTrail(prev => prev.slice(-8));
    }, 100);
    return () => clearInterval(cleanup);
  }, []);

  return (
    <>
      {/* Cursor trail/footprint */}
      {trail.map((dot, index) => (
        <div
          key={dot.id}
          className="fixed pointer-events-none z-[9996]"
          style={{
            left: dot.x,
            top: dot.y,
            width: `${4 + index * 0.5}px`,
            height: `${4 + index * 0.5}px`,
            background: `hsl(var(--primary) / ${0.1 + index * 0.05})`,
            borderRadius: '50%',
            transform: 'translate(-50%, -50%)',
            opacity: index / trail.length,
            transition: 'opacity 0.3s ease-out',
          }}
        />
      ))}

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
          transform: `translate(${position.x - 24}px, ${position.y - 24}px) scale(${isPointer ? 1.3 : 1}) rotate(${position.x * 0.1}deg)`,
          transition: 'transform 0.1s ease-out',
        }}
      />
      
      {/* Cursor glow */}
      <div
        className="fixed top-0 left-0 w-40 h-40 pointer-events-none z-[9997] opacity-20"
        style={{
          transform: `translate(${position.x - 80}px, ${position.y - 80}px)`,
          background: "radial-gradient(circle, hsl(var(--primary)) 0%, transparent 70%)",
          transition: 'transform 0.15s ease-out',
        }}
      />
    </>
  );
};

export default CustomCursor;