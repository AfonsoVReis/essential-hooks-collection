import { useState, useEffect, RefObject } from "react";

/**
 * A React hook that tracks the current scroll position of the window or a specified element.
 *
 * This hook listens for the scroll event and returns an object with the current
 * horizontal (x) and vertical (y) scroll positions. It updates automatically whenever the user scrolls.
 *
 * @param {RefObject<HTMLElement>} [ref] - A ref to the element whose scroll position should be tracked. If not provided, the window's scroll position will be tracked.
 * @returns {{ x: number, y: number }} An object containing the current scroll positions along the x and y axes.
 *
 * @example
 * import { useScroll } from "essential-hooks-collection";
 *
 * const MyComponent = () => {
 *   const containerRef = useRef(null);
 *   const { x, y } = useScroll(containerRef);
 *
 *   return (
 *     <div ref={containerRef} style={{ overflow: 'scroll', height: '200px' }}>
 *       <p>Scroll X: {x}</p>
 *       <p>Scroll Y: {y}</p>
 *       <div style={{ height: '1000px', width: '1000px' }}>Scroll me!</div>
 *     </div>
 *   );
 * };
 *
 * @example
 * // Using the default window scroll
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
 */
export const useScroll = (ref?: RefObject<HTMLElement | null>) => {
  const [scroll, setScroll] = useState({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    const target = ref?.current || window;

    if (!target) {
      return;
    }

    const handleScroll = () => {
      setScroll({
        x:
          target === window
            ? window.scrollX
            : (target as HTMLElement).scrollLeft,
        y:
          target === window
            ? window.scrollY
            : (target as HTMLElement).scrollTop,
      });
    };

    target.addEventListener("scroll", handleScroll);
    return () => {
      target.removeEventListener("scroll", handleScroll);
    };
  }, [ref]);

  return scroll;
};
