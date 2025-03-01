import { useState, useEffect } from "react";

/**
 * A React hook that listens to media query changes.
 *
 * This hook evaluates the provided CSS media query and returns a boolean indicating whether
 * the query currently matches the viewport size. It listens for changes to update the value automatically.
 *
 * @param {string} query - The CSS media query string (e.g., "(max-width: 768px)").
 * @returns {boolean} Returns `true` if the media query matches, otherwise `false`.
 *
 * @example
 * import { useMediaQuery } from "essential-hooks-collection";
 *
 * const MyComponent = () => {
 *   const isSmallScreen = useMediaQuery("(max-width: 768px)");
 *
 *   return (
 *     <div>
 *       {isSmallScreen ? <p>Small screen</p> : <p>Large screen</p>}
 *     </div>
 *   );
 * };
 *
 * export default MyComponent;
 */
export const useMediaQuery = (query: string): boolean => {
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

    const updateMatch = () => {
      setMatches(mediaQueryList.matches);
    };

    mediaQueryList.addEventListener("change", updateMatch);
    return () => {
      mediaQueryList.removeEventListener("change", updateMatch);
    };
  }, [query]);

  return matches;
};
