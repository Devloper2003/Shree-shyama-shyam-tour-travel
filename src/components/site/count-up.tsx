"use client";

import { useCountUp } from "@/hooks/use-count-up";

type CountUpProps = {
  target: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  startDelay?: number;
  className?: string;
};

/**
 * Renders an animated count-up number that runs once when scrolled into view.
 * Honors prefers-reduced-motion.
 */
export function CountUp({
  target,
  suffix = "",
  prefix = "",
  duration = 1800,
  startDelay = 0,
  className,
}: CountUpProps) {
  const { value, ref } = useCountUp(target, duration, startDelay);
  return (
    <span ref={ref} className={className}>
      {prefix}
      {value.toLocaleString("en-IN")}
      {suffix}
    </span>
  );
}
