import { useEffect, useRef } from "react";

/**
 * A React hook that stores the previous value of a variable.
 *
 * This hook uses a ref to keep track of the previous value of the provided variable.
 * On every update, the current value is stored so that the previous value is accessible.
 *
 * @template T - The type of the value.
 * @param {T} value - The current value.
 * @returns {T | undefined} The previous value before the last update, or `undefined` if not available.
 *
 * @example
 * import React, { useState } from "react";
 * import { usePrevious } from "essential-hooks-collection";
 *
 * const MyComponent = () => {
 *   const [count, setCount] = useState(0);
 *   const prevCount = usePrevious(count);
 *
 *   return (
 *     <div>
 *       <p>Current count: {count}</p>
 *       <p>Previous count: {prevCount}</p>
 *       <button onClick={() => setCount(count + 1)}>Increment</button>
 *     </div>
 *   );
 * };
 *
 * export default MyComponent;
 */
export const usePrevious = <T>(value: T): T | undefined => {
  const ref = useRef<T | undefined>(undefined);

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
};
