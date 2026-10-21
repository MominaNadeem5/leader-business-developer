import { useEffect, useState } from "react";

const MIN_VISIBLE_MS = 600; // avoids a flash when the page is ready almost instantly
const FADE_MS = 400; // must match the transition in Loader.css

/**
 * Tracks the real page load (window "load" + web fonts) so a loader is only shown while needed.
 * Returns { visible, leaving }: mount the loader while `visible`, and pass `leaving` to fade it out.
 * If the document has already finished loading, the loader is never shown.
 */
export default function usePageReady() {
  const alreadyLoaded = document.readyState === "complete";
  const [visible, setVisible] = useState(!alreadyLoaded);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    if (alreadyLoaded) return;
    const start = performance.now();
    let timers = [];

    const finish = () => {
      const wait = Math.max(0, MIN_VISIBLE_MS - (performance.now() - start));
      timers.push(
        setTimeout(() => {
          setLeaving(true);
          timers.push(setTimeout(() => setVisible(false), FADE_MS));
        }, wait)
      );
    };

    const fontsReady = document.fonts?.ready ?? Promise.resolve();
    const windowLoaded = new Promise((resolve) =>
      window.addEventListener("load", resolve, { once: true })
    );
    Promise.all([windowLoaded, fontsReady]).then(finish);

    return () => timers.forEach(clearTimeout);
  }, [alreadyLoaded]);

  return { visible, leaving };
}
