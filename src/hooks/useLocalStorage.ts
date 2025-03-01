import { useState, useEffect } from "react";

/**
 * A React hook that synchronizes state with localStorage.
 *
 * This hook reads a value from localStorage using the provided key and uses it as the initial state.
 * It returns a tuple containing the current stored value, a function to update the value (which also updates localStorage),
 * and a function to remove the value from localStorage.
 *
 * @template T - The type of the stored value.
 * @param {string} key - The localStorage key under which the value is stored.
 * @param {T} initialValue - The initial value to use if no data is found in localStorage.
 * @returns {[T, (value: T | ((prevState: T) => T)) => void, () => void]} A tuple with:
 *   - The stored value.
 *   - A function to update the stored value.
 *   - A function to remove the value from localStorage.
 *
 * @example
 * import { useLocalStorage } from "essential-hooks-collection";
 *
 * const MyComponent = () => {
 *   const [name, setName, removeName] = useLocalStorage("name", "Guest");
 *
 *   return (
 *     <div>
 *       <p>Name: {name}</p>
 *       <button onClick={() => setName("Alice")}>Set to Alice</button>
 *       <button onClick={removeName}>Remove Name</button>
 *     </div>
 *   );
 * };
 *
 * export default MyComponent;
 */
export const useLocalStorage = <T>(key: string, initialValue: T) => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = localStorage.getItem(key);
      if (item) {
        return JSON.parse(item);
      } else {
        return initialValue;
      }
    } catch (error) {
      console.error("Error reading localStorage key:", key, error);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.error("Error writing to localStorage key:", key, error);
    }
  }, [key, storedValue]);

  const removeItem = () => {
    try {
      localStorage.removeItem(key);
      setStoredValue(initialValue);
    } catch (error) {
      console.error("Error removing localStorage key:", key, error);
    }
  };

  return [storedValue, setStoredValue, removeItem] as const;
};
