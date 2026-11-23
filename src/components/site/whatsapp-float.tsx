"use client";

import { useEffect, useState } from "react";
import { MessageCircle, X } from "lucide-react";
import { siteConfig, buildWhatsAppLink } from "@/lib/site-config";

export function WhatsAppFloat() {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Show after slight scroll
    const onScroll = () => setVisible(window.scrollY > 200);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const defaultMessage = `Radhe Radhe Shri Shyama Shyam Tour & Travels! I would like to book a Braj Yatra.\n\nPickup: \nDrop (Braj site): \nDate: \nYatra Package: \nPilgrims: `;

  return (
    <div
      className={`fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3 transition-all duration-300 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
      }`}
    >
      {/* Quick chat popup */}
      {open && (
        <div className="bg-background border border-border rounded-xl shadow-xl w-[280px] overflow-hidden animate-fade-up">
          <div className="bg-[#25D366] text-white p-4 flex items-center justify-between">
            <div>
              <p className="font-semibold text-sm">{siteConfig.shortName}</p>
              <p className="text-xs text-white/90">Typically replies in minutes</p>
            </div>
            <button
              aria-label="Close chat popup"
              onClick={() => setOpen(false)}
              className="text-white/90 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="p-4 bg-muted/40">
            <div className="bg-background rounded-lg p-3 text-sm text-foreground shadow-sm">
              Radhe Radhe! 🙏 Need to book a Braj Yatra? Send us a WhatsApp message with your
              pickup, preferred Braj site, and travel date — we&apos;ll confirm your sacred
              yatra right away.
            </div>
            <a
              href={buildWhatsAppLink(defaultMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 block w-full text-center px-4 py-2.5 rounded-md bg-[#25D366] text-white text-sm font-semibold hover:bg-[#1da851] transition-colors"
            >
              Start Chat on WhatsApp
            </a>
          </div>
        </div>
      )}

      {/* Floating button */}
      <button
        aria-label={open ? "Close WhatsApp chat" : "Open WhatsApp chat"}
        onClick={() => setOpen((v) => !v)}
        className="w-14 h-14 rounded-full bg-[#25D366] text-white shadow-lg flex items-center justify-center hover:bg-[#1da851] transition-colors focus:outline-none focus:ring-4 focus:ring-[#25D366]/30"
      >
        {open ? <X className="w-6 h-6" /> : <MessageCircle className="w-7 h-7" />}
        {!open && (
          <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center border-2 border-background">
            1
          </span>
        )}
      </button>
    </div>
  );
}
