"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Drives the `[data-reveal]` entrance system. Mounted once in the root layout,
 * it observes every element carrying a `data-reveal` attribute and adds the
 * `is-visible` class the moment it enters the viewport — so content animates in
 * on arrival rather than on page load. Re-queries on route changes because the
 * layout (and this component) persist across App Router client navigations.
 *
 * Elements already in view on load animate in immediately, giving the hero its
 * entrance. If IntersectionObserver is unavailable, everything is revealed at
 * once. The `<noscript>` fallback in the layout covers a JS-disabled load.
 */
export function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    const els = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]:not(.is-visible)"),
    );

    if (els.length === 0) return;

    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries, obs) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            obs.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
    );

    els.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
