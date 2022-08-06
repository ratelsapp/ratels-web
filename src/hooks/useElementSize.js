import { useLayoutEffect, useState, useMemo } from "react";
import throttle from "lodash/throttle";

export function useElementSize(element) {
  const [size, setSize] = useState([0, 0]);

  useLayoutEffect(() => {
    if (!element) return;
    function updateSize() {
      setSize([element.clientWidth, element.clientHeight]);
    }

    const _updateSize = throttle(updateSize, 200);

    window.addEventListener("resize", _updateSize);

    updateSize();

    return () => window.removeEventListener("resize", _updateSize);
  }, [element]);

  return useMemo(() => size, [size]);
}
