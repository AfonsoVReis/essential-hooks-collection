import { useEffect, useRef } from "react";

/**
 * A React hook that sets up an interval and runs a callback function at the specified delay.
 *
 * @param callback - The callback function to run on each interval tick.
 * @param delay - The delay (in milliseconds) between ticks. Pass `null` to pause the interval.
 */
export function useInterval(callback: () => void, delay: number | null) {
  const savedCallback = useRef(callback);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    if (delay === null) {
      return;
    }

    const tick = () => {
      savedCallback.current();
    };

    const id = setInterval(tick, delay);

    return () => clearInterval(id);
  }, [delay]);
}
