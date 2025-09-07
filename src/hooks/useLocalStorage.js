import { useCallback, useEffect, useRef, useState } from "react";

export default function useLocalStorage(key, initialValue) {
  const isFirstLoadRef = useRef(true);
  const [value, setValue] = useState(() => {
    try {
      const raw = window.localStorage.getItem(key);
      return raw != null ? JSON.parse(raw) : initialValue;
    } catch (e) {
      return initialValue;
    }
  });

  const set = useCallback(
    (next) => {
      setValue(typeof next === "function" ? next(value) : next);
    },
    [value]
  );

  useEffect(() => {
    if (isFirstLoadRef.current) {
      isFirstLoadRef.current = false;
      return;
    }
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      // ignore write errors
    }
  }, [key, value]);

  return [value, set];
}
