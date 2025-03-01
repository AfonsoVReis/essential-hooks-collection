import { useState, useEffect } from "react";

/**
 * A React hook that tracks the current window dimensions.
 *
 * This hook listens for the window's resize event and returns an object with the current
 * width and height of the browser window. It updates automatically whenever the window is resized.
 *
 * @returns {{ width: number, height: number }} An object containing the current window width and height.
 *
 * @example
 * // Usage in a functional component:
 * import { useWindowSize } from "essential-hooks-collection";
 *
 * const MyComponent = () => {
 *   const { width, height } = useWindowSize();
 *
 *   return (
 *     <div>
 *       <p>Window width: {width}</p>
 *       <p>Window height: {height}</p>
 *     </div>
 *   );
 * };
 *
 * export default MyComponent;
 */
export const useWindowSize = (): { width: number; height: number } => {
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
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return size;
};
