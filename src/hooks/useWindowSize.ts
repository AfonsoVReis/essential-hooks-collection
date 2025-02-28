import { useState, useEffect } from "react";

/**
 * A React hook that tracks the window width and height.
 *
 * @returns An object `{ width, height }` representing the window size.
 *
 * @example
 * ```tsx
 * const { width, height } = useWindowSize();
 * console.log(width, height);
 * ```
 */
export function useWindowSize() {
  const [size, setSize] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 0,
    height: typeof window !== "undefined" ? window.innerHeight : 0,
  });

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return size;
}
