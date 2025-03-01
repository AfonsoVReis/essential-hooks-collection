import { useState, useEffect } from "react";

/**
 * A React hook that tracks the current scroll position of the window.
 *
 * This hook listens for the window's scroll event and returns an object with the current
 * horizontal (x) and vertical (y) scroll positions. It updates automatically whenever the user scrolls.
 *
 * @returns {{ x: number, y: number }} An object containing the current scroll positions along the x and y axes.
 *
 * @example
 * import { useScroll } from "essential-hooks-collection";
 *
 * const MyComponent = () => {
 *   const { x, y } = useScroll();
 *
 *   return (
 *     <div>
 *       <p>Scroll X: {x}</p>
 *       <p>Scroll Y: {y}</p>
 *     </div>
 *   );
 * };
 *
 * export default MyComponent;
 */
export const useScroll = () => {
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
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return scroll;
};
