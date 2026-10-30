import { useEffect, useState } from "react";

/* Counter that increments every `ms` milliseconds. Drives looping hero animations. */
export default function useTick(ms) {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), ms);
    return () => clearInterval(id);
  }, [ms]);
  return tick;
}
