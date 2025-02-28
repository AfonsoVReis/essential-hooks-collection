import { useEffect, useRef } from "react";

/**
 * A hook that keeps track of the previous value of a variable.
 *
 * @param value - The current value.
 * @returns The previous value before the last update, or `undefined` if there is no previous value.
 */
export function usePrevious<T>(value: T): T | undefined {
  const ref = useRef<T | undefined>(undefined);

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}
