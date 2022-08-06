import { useCallback, useEffect, useRef, useState } from "react";

export default function useDebouncedChangeHandler(value, onChange, debouncedMs = 100) {
  const [inner, setInner] = useState(() => value);
  const timer = useRef();

  const onChangeInner = useCallback(
    (newValue) => {
      setInner(newValue);
      if (timer.current) {
        clearTimeout(timer.current);
      }
      timer.current = setTimeout(() => {
        onChange(newValue);
        timer.current = undefined;
      }, debouncedMs);
    },
    [debouncedMs, onChange]
  );

  useEffect(() => {
    if (timer.current) {
      clearTimeout(timer.current);
      timer.current = undefined;
    }
    setInner(value);
  }, [value]);

  return [inner, onChangeInner];
}
