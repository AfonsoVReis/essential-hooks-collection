import { useState, useEffect } from "react";

/**
 * A hook that synchronizes state with localStorage.
 *
 * @param key - The localStorage key.
 * @param initialValue - The initial value if no data is found in localStorage.
 * @returns A tuple containing:
 * - The stored value
 * - A function to update the stored value
 * - A function to remove the value from localStorage
 */
export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = localStorage.getItem(key);

      return item ? JSON.parse(item) : initialValue;
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
}
