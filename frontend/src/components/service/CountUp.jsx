import { useEffect, useState } from "react";
import useInView from "../../hooks/useInView";

/* Counts from 0 to `to` with an ease-out curve once visible. */
export default function CountUp({ to, prefix = "", suffix = "", duration = 1200 }) {
  const [ref, inView] = useInView();
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return undefined;
    let raf;
    const t0 = performance.now();
    const tick = (t) => {
      const p = Math.min((t - t0) / duration, 1);
      setN(Math.round(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, duration]);

  return <span ref={ref}>{prefix}{n.toLocaleString()}{suffix}</span>;
}
