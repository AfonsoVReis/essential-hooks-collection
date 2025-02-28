import { useState, useEffect } from "react";

/**
 * A React hook that tracks the scroll position of the window.
 *
 * @returns An object `{ x, y }` representing the scroll position.
 *
 * @example
 * ```tsx
 * const { x, y } = useScroll();
 * console.log(x, y);
 * ```
 */
export function useScroll() {
  const [scroll, setScroll] = useState({
    x: typeof window !== "undefined" ? window.scrollX : 0,
    y: typeof window !== "undefined" ? window.scrollY : 0,
  });

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const handleScroll = () => {
      setScroll({
        x: window.scrollX,
        y: window.scrollY,
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return scroll;
}
