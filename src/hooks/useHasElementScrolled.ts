import { useEffect, useRef, useState } from "react";
import throttle from "lodash/throttle";

const useHasElementScrolled = ({
  scrollOffset = 32,
}: {
  scrollOffset?: number;
}) => {
  const [hasScrolled, setHasScrolled] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkPosition = throttle(() => {
      if (!ref.current) return;
      const { scrollTop } = ref.current || { scrollTop: 0 };
      setHasScrolled(scrollTop >= scrollOffset);
    }, 166.67);

    const container = ref.current;
    if (container) {
      container.addEventListener("scroll", checkPosition);
    }
    checkPosition();

    return () => {
      if (container) {
        container.removeEventListener("scroll", checkPosition);
      }
    };
  }, [scrollOffset]);

  return {
    ref,
    hasScrolled,
  };
};

export default useHasElementScrolled;
