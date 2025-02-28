import { RefObject, useEffect, useState } from "react";

/**
 * A React hook that tracks whether an element is visible in the viewport using IntersectionObserver.
 *
 * @param ref - A React ref attached to the element to be observed.
 * @param options - IntersectionObserver options (e.g., root, rootMargin, threshold)
 * @returns A boolean indicating whether the element is visible
 */
export function useIntersectionObserver<T extends HTMLElement>(
  ref: RefObject<T>,
  options: IntersectionObserverInit = {}
): boolean {
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
}
