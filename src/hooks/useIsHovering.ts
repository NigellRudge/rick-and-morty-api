import { useEffect, useRef, useState } from "react";

const useIsHovering = () => {
  const [isHovering, setIsHovering] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = elementRef.current;

    const handleMouseEnter = () => setIsHovering(true);

    const handleMouseLeave = () => setIsHovering(false);

    if (container) {
      container.addEventListener("mouseover", handleMouseEnter);
      container.addEventListener("mouseleave", handleMouseLeave);
    }

    return () => {
      if (container) {
        container.removeEventListener("mouseover", handleMouseEnter);
        container.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, []);

  return {
    elementRef,
    isHovering,
  };
};

export default useIsHovering;
