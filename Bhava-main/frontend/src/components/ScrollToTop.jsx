import { useLayoutEffect, useEffect } from "react";
import { useLocation, useNavigationType } from "react-router-dom";

// Module-level map: pathname → scroll position (persists for the app's lifetime)
const scrollPositions = {};

export default function ScrollToTop() {
  const { pathname } = useLocation();
  const navigationType = useNavigationType();

  // Continuously save the scroll position for the current page
  useEffect(() => {
    const save = () => {
      scrollPositions[pathname] = window.scrollY;
    };
    window.addEventListener("scroll", save, { passive: true });
    return () => window.removeEventListener("scroll", save);
  }, [pathname]);

  // Handle scroll position on route change, runs before browser paint
  useLayoutEffect(() => {
    if (navigationType === "POP") {
      // Back / forward — restore exactly where the user was
      const saved = scrollPositions[pathname] ?? 0;
      window.scrollTo(0, saved);
    } else {
      // New navigation (click / programmatic) — jump to top instantly
      window.scrollTo(0, 0);
    }
  }, [pathname, navigationType]);

  return null;
}
