"use client";

import { Contact } from "@/components/site/contact";
import { Badge } from "@/components/ui/badge";
import { MessageCircle } from "lucide-react";
import { usePageStore } from "@/lib/page-store";

export function ContactPage() {
  const contactPrefill = usePageStore((s) => s.contactPrefill);
  // Key forces Contact to remount when prefill changes, so the form
  // initializes with the prefilled values (Radix Select needs the value
  // present on first render, not set via useEffect after mount).
  const formKey = contactPrefill
    ? `${contactPrefill.yatraPackage || ""}-${contactPrefill.pickup || ""}-${contactPrefill.drop || ""}`
    : "no-prefill";

  return (
    <div className="pt-8 pb-16">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <Badge variant="secondary" className="mb-3">
            <MessageCircle className="w-3 h-3 mr-1" /> Book Your Yatra
          </Badge>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
            Begin Your Sacred Braj Yatra
          </h1>
          <p className="mt-4 text-muted-foreground text-base sm:text-lg">
            Share your sankalp and our Braj team will call you back within 15 minutes to confirm
            your yatra. For instant confirmation, use WhatsApp or Call — your yatra details go
            straight to us with a warm &ldquo;Radhe Radhe&rdquo;.
          </p>
        </div>
      </div>
      <Contact key={formKey} />
    </div>
  );
}
