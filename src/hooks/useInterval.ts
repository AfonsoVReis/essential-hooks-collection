import { useEffect, useRef } from "react";

/**
 * A React hook that sets up an interval to run a callback function at the specified delay.
 *
 * This hook schedules the provided callback function to be invoked repeatedly after the specified delay (in milliseconds).
 * If the delay is `null`, the interval is paused.
 *
 * @param {() => void} callback - The callback function to execute on each interval tick.
 * @param {number | null} delay - The delay in milliseconds between ticks. Pass `null` to pause the interval.
 *
 * @example
 * import { useState } from "react";
 * import { useInterval } from "essential-hooks-collection";
 *
 * const MyComponent = () => {
 *   const [count, setCount] = useState(0);
 *
 *   useInterval(() => {
 *     setCount(prevCount => prevCount + 1);
 *   }, 1000);
 *
 *   return <div>{count}</div>;
 * };
 *
 * export default MyComponent;
 */
export const useInterval = (
  callback: () => void,
  delay: number | null
): void => {
  const savedCallback = useRef(callback);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    if (delay === null) {
      return;
    }

    const tick = () => savedCallback.current();

    const id = setInterval(tick, delay);

    return () => {
      clearInterval(id);
    };
  }, [delay]);
};
