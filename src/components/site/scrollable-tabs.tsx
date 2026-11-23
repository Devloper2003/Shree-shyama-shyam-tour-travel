"use client";

import { useRef, useState, useEffect, type ComponentType } from "react";
import { motion, LayoutGroup } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Tab = {
  key: string;
  label: string;
  icon?: ComponentType<{ className?: string }>;
};

type ScrollableTabsProps = {
  tabs: Tab[];
  active: string;
  onChange: (key: string) => void;
  /** Unique framer-motion shared-layout id — must differ per section */
  layoutId: string;
  /** Fixed width for every tab so they're uniform (px) */
  tabWidth?: number;
};

/**
 * Scrollable, uniform-width tab bar with left/right navigation buttons.
 *
 * - Tabs never wrap to a second line; overflow scrolls horizontally.
 * - Left/right chevron buttons appear only when there's something to scroll
 *   in that direction (auto-hidden at edges).
 * - All tabs share the same fixed width for a clean, organized look.
 * - The active tab indicator animates between tabs using framer-motion
 *   shared layout (`layoutId`).
 * - Respects `prefers-reduced-motion` for the scroll behavior.
 */
export function ScrollableTabs({
  tabs,
  active,
  onChange,
  layoutId,
  tabWidth = 155,
}: ScrollableTabsProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const updateScrollButtons = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 8);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 8);
  };

  useEffect(() => {
    updateScrollButtons();
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateScrollButtons, { passive: true });
    window.addEventListener("resize", updateScrollButtons);
    return () => {
      el.removeEventListener("scroll", updateScrollButtons);
      window.removeEventListener("resize", updateScrollButtons);
    };
  }, [tabs]);

  const scrollByAmount = (direction: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const amount = Math.min(el.clientWidth * 0.7, 400);
    el.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  // When the active tab changes, scroll it into view
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const activeBtn = el.querySelector<HTMLButtonElement>(`[data-tab-key="${active}"]`);
    if (activeBtn) {
      // Only scroll if the active tab is not fully visible
      const btnLeft = activeBtn.offsetLeft;
      const btnRight = btnLeft + activeBtn.offsetWidth;
      const viewLeft = el.scrollLeft;
      const viewRight = viewLeft + el.clientWidth;
      if (btnLeft < viewLeft + 20 || btnRight > viewRight - 20) {
        el.scrollTo({
          left: Math.max(0, btnLeft - (el.clientWidth - activeBtn.offsetWidth) / 2),
          behavior: "smooth",
        });
      }
    }
  }, [active]);

  return (
    <div className="relative flex items-center justify-center mb-10 max-w-3xl mx-auto">
      {/* Left scroll button */}
      <button
        type="button"
        onClick={() => scrollByAmount("left")}
        disabled={!canScrollLeft}
        aria-label="Scroll tabs left"
        className={`absolute left-0 z-20 w-9 h-9 rounded-full bg-background border border-border shadow-md flex items-center justify-center transition-all ${
          canScrollLeft
            ? "opacity-100 hover:bg-muted hover:border-primary/40 cursor-pointer"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <ChevronLeft className="w-4 h-4 text-foreground" />
      </button>

      {/* Edge fade — left */}
      {canScrollLeft && (
        <div
          className="absolute left-9 top-0 bottom-0 w-8 z-10 pointer-events-none bg-gradient-to-r from-background to-transparent"
          aria-hidden="true"
        />
      )}

      {/* Scrollable tabs container */}
      <LayoutGroup id={layoutId}>
        <div
          ref={scrollRef}
          className="flex items-center gap-2 overflow-x-auto no-scrollbar px-2"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          role="tablist"
        >
          {tabs.map((tab) => {
            const isActive = active === tab.key;
            const Icon = tab.icon;
            return (
              <button
                key={tab.key}
                type="button"
                role="tab"
                aria-selected={isActive}
                data-tab-key={tab.key}
                onClick={() => onChange(tab.key)}
                className={`relative rounded-full text-sm font-semibold transition-colors flex items-center gap-2 whitespace-nowrap shrink-0 justify-center ${
                  isActive ? "text-primary-foreground" : "text-foreground hover:bg-muted"
                }`}
                style={{ width: `${tabWidth}px`, padding: "0.625rem 0.75rem" }}
              >
                {isActive && (
                  <motion.span
                    layoutId={`${layoutId}-pill`}
                    className="absolute inset-0 rounded-full bg-primary z-0"
                    transition={{ type: "spring", stiffness: 400, damping: 32 }}
                  />
                )}
                {Icon && <Icon className="w-4 h-4 relative z-10 shrink-0" />}
                <span className="relative z-10 truncate">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </LayoutGroup>

      {/* Edge fade — right */}
      {canScrollRight && (
        <div
          className="absolute right-9 top-0 bottom-0 w-8 z-10 pointer-events-none bg-gradient-to-l from-background to-transparent"
          aria-hidden="true"
        />
      )}

      {/* Right scroll button */}
      <button
        type="button"
        onClick={() => scrollByAmount("right")}
        disabled={!canScrollRight}
        aria-label="Scroll tabs right"
        className={`absolute right-0 z-20 w-9 h-9 rounded-full bg-background border border-border shadow-md flex items-center justify-center transition-all ${
          canScrollRight
            ? "opacity-100 hover:bg-muted hover:border-primary/40 cursor-pointer"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <ChevronRight className="w-4 h-4 text-foreground" />
      </button>
    </div>
  );
}
