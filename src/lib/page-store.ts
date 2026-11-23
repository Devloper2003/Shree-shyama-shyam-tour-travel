"use client";

import { create } from "zustand";

export type PageName = "home" | "package" | "services" | "blogs" | "contact" | "about" | "privacy" | "terms";

export type ContactPrefill = {
  pickup?: string;
  drop?: string;
  yatraPackage?: string;
  vehicleType?: string;
  tripType?: string;
  notes?: string;
  source?: string;
};

type PageStore = {
  currentPage: PageName;
  contactPrefill: ContactPrefill | null;
  navigate: (page: PageName, options?: { contactPrefill?: ContactPrefill }) => void;
};

export const usePageStore = create<PageStore>((set) => ({
  currentPage: "home",
  contactPrefill: null,
  navigate: (page, options) => {
    set({
      currentPage: page,
      contactPrefill: options?.contactPrefill ?? null,
    });
    // Scroll to top smoothly on page change
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  },
}));
