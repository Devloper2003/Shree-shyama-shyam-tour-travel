"use client";

import type { LucideProps } from "lucide-react";

/**
 * Custom Om (ॐ) icon — lucide-react doesn't ship an Om icon,
 * so we render the sacred symbol as an SVG for consistent sizing
 * with other lucide icons in the UI.
 */
export function OmIcon({ className, size = 24, ...props }: LucideProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      {...props}
    >
      {/* Stylized Om symbol — composed of the crescent, chandra-bindu, and tail */}
      <path d="M5 14 C 5 10, 9 9, 11 11 C 13 13, 12 16, 10 16 C 8 16, 7 14, 9 13" />
      <path d="M9 8 C 12 6, 16 7, 17 10 C 18 13, 16 16, 14 17" />
      <path d="M14 6 Q 16 4, 17 6" />
      <circle cx="15" cy="9" r="0.8" fill="currentColor" stroke="none" />
      <path d="M14 18 Q 16 19, 18 18" />
    </svg>
  );
}
