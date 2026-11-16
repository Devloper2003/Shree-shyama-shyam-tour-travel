"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Animated count-up hook.
 *
 * The number animates from 0 → target once the element scrolls into view,
 * using an ease-out cubic curve. The animation only runs once per mount.
 * Honors prefers-reduced-motion by showing the final value immediately.
 *
 * @example
 * const { value, ref } = useCountUp(15000);
 * return <span ref={ref}>{value.toLocaleString()}+</span>;
 */
export function useCountUp(target: number, duration = 1800, startDelay = 0) {
  // Lazy initializer: if the user prefers reduced motion, jump straight to
  // the target value on first render (no animation needed).
  const [value, setValue] = useState<number>(() => {
    if (typeof window === "undefined") return 0;
    const prefersReduced =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    return prefersReduced ? target : 0;
  });

  const ref = useRef<HTMLSpanElement | null>(null);
  const startedRef = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReduced =
      typeof window !== "undefined" &&
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      // Already set via lazy initializer; nothing to animate.
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !startedRef.current) {
          startedRef.current = true;
          const begin = () => {
            const start = performance.now();
            const animate = (now: number) => {
              const elapsed = now - start;
              const progress = Math.min(elapsed / duration, 1);
              // ease-out cubic
              const eased = 1 - Math.pow(1 - progress, 3);
              setValue(Math.floor(eased * target));
              if (progress < 1) requestAnimationFrame(animate);
              else setValue(target);
            };
            requestAnimationFrame(animate);
          };
          if (startDelay > 0) {
            setTimeout(begin, startDelay);
          } else {
            begin();
          }
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration, startDelay]);

  return { value, ref };
}
