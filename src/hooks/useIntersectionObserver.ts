import { RefObject, useEffect, useState } from "react";

/**
 * A React hook that tracks whether an element is visible in the viewport using the IntersectionObserver API.
 *
 * This hook observes a DOM element through the IntersectionObserver API and returns a boolean indicating
 * whether the element is currently visible (i.e., intersecting with the viewport). The hook updates automatically
 * when the intersection state changes.
 *
 * @template T - The type of the HTMLElement to observe.
 * @param {React.RefObject<T>} ref - A React ref attached to the element that should be observed.
 * @param {IntersectionObserverInit} [options={}] - Optional settings for the IntersectionObserver (e.g., root, rootMargin, threshold).
 * @returns {boolean} Returns true if the element is visible (i.e., intersecting), otherwise false.
 *
 * @example
 * import React, { useRef } from "react";
 * import { useIntersectionObserver } from "essential-hooks-collection";
 *
 * const MyComponent = () => {
 *   const elementRef = useRef<HTMLDivElement>(null);
 *   const isVisible = useIntersectionObserver(elementRef, { threshold: 0.5 });
 *
 *   return (
 *     <div>
 *       <div ref={elementRef}>Observed Element</div>
 *       {isVisible ? <p>The element is visible!</p> : <p>The element is not visible!</p>}
 *     </div>
 *   );
 * };
 *
 * export default MyComponent;
 */
export const useIntersectionObserver = <T extends HTMLElement>(
  ref: RefObject<T>,
  options: IntersectionObserverInit = {}
): boolean => {
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    if (!ref.current) {
      return;
    }

    const element = ref.current;

    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);
    }, options);

    observer.observe(element);

    return () => {
      observer.unobserve(element);
      observer.disconnect();
    };
  }, [ref, options]);

  return isIntersecting;
};
