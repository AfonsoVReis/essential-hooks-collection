import { useState, useEffect } from "react";

/**
 * A hook that listens to media query changes.
 *
 * @param query - The CSS media query string (e.g., "(max-width: 768px)")
 * @returns `true` if the media query matches, otherwise `false`
 *
 * @example
 * ```tsx
 * const isSmallScreen = useMediaQuery("(max-width: 768px)");
 * ```
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(() => {
    if (typeof window === "undefined") {
      return false;
    }

    return window.matchMedia(query).matches;
  });

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const mediaQueryList = window.matchMedia(query);

    const updateMatch = () => setMatches(mediaQueryList.matches);

    mediaQueryList.addEventListener("change", updateMatch);

    return () => mediaQueryList.removeEventListener("change", updateMatch);
  }, [query]);

  return matches;
}
