import { useState } from "react";

export default function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    if (typeof window === "undefined") return initialValue;
    try {
      const item = window.localStorage.getItem(key);

      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  });

  const setValue = (value) => {
    if (typeof window === "undefined") return null;
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;

      const valueToStoreTidied =
        typeof valueToStore === "array"
          ? valueToStore.filter((item) => !item.name || item.name !== undefined)
          : valueToStore;

      setStoredValue(valueToStoreTidied);

      window.localStorage.setItem(key, JSON.stringify(valueToStoreTidied));
    } catch (error) {
      console.log(error);
    }
  };
  return [storedValue, setValue];
}
