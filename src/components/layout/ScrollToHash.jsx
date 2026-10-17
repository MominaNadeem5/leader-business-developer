import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToHash() {
  const { pathname, hash } = useLocation();
  const prevPath = useRef(pathname);

  useEffect(() => {
    // Smooth when staying on the same page (e.g. "/#about" -> "/"), instant on a new page.
    const samePage = prevPath.current === pathname;
    prevPath.current = pathname;

    if (hash) document.querySelector(hash)?.scrollIntoView({ behavior: "smooth" });
    else window.scrollTo({ top: 0, behavior: samePage ? "smooth" : "auto" });
  }, [pathname, hash]);

  return null;
}
