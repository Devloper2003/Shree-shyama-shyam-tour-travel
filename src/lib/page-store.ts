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

// Read the initial page from the URL path on client-side load
function getPageFromUrl(): PageName {
  if (typeof window === "undefined") return "home";
  const path = window.location.pathname.replace(/^\//, "").replace(/\/$/, "");
  const validPages: PageName[] = ["home", "package", "services", "blogs", "contact", "about", "privacy", "terms"];
  return validPages.includes(path as PageName) ? (path as PageName) : "home";
}

type PageStore = {
  currentPage: PageName;
  contactPrefill: ContactPrefill | null;
  navigate: (page: PageName, options?: { contactPrefill?: ContactPrefill }) => void;
  setPageFromUrl: () => void;
};

export const usePageStore = create<PageStore>((set) => ({
  currentPage: getPageFromUrl(),
  contactPrefill: null,
  navigate: (page, options) => {
    set({
      currentPage: page,
      contactPrefill: options?.contactPrefill ?? null,
    });
    // Update the URL bar so each page has its own URL (/services, /package, etc.)
    if (typeof window !== "undefined") {
      const path = page === "home" ? "/" : `/${page}`;
      // Only pushState if the URL actually changed (avoids duplicate entries)
      if (window.location.pathname !== path) {
        window.history.pushState({}, "", path);
      }
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  },
  // Called when the user uses browser back/forward buttons
  setPageFromUrl: () => {
    set({ currentPage: getPageFromUrl() });
  },
}));
