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
    <div
      className="fixed pointer-events-none z-[9999] w-4 h-4 bg-primary rounded-full mix-blend-difference"
      style={{
        left: position.x - 8,
        top: position.y - 8,
        transform: `scale(${isPointer ? 1.5 : 1})`,
        transition: 'transform 0.15s ease-out',
      }}
    />
  );
};

export default CustomCursor;