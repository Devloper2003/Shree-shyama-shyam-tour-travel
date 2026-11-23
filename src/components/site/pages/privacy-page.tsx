"use client";

import { Badge } from "@/components/ui/badge";
import { Shield, FileText } from "lucide-react";
import { usePageStore } from "@/lib/page-store";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site-config";

export function PrivacyPage() {
  const navigate = usePageStore((s) => s.navigate);

  return (
    <div className="pt-12 pb-16 bg-background min-h-screen">
      <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <Badge variant="secondary" className="mb-4">
          <Shield className="w-4 h-4 mr-1.5" /> Legal
        </Badge>
        <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">Privacy Policy</h1>
        <p className="text-sm text-muted-foreground mb-8">
          Last updated: November 2026
        </p>

        <div className="prose prose-sm sm:prose-base max-w-none space-y-6">
          <section>
            <h2 className="text-xl font-bold text-foreground mb-2">1. Introduction</h2>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              {siteConfig.name} (&ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;) is committed to
              protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard
              your information when you use our website and booking services for Braj Yatra pilgrimage tours.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-2">2. Information We Collect</h2>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-3">
              When you book a yatra or enquire through our website, we collect:
            </p>
            <ul className="list-disc pl-6 space-y-1.5 text-sm sm:text-base text-muted-foreground">
              <li><strong className="text-foreground">Personal Information:</strong> Name, phone number, email address</li>
              <li><strong className="text-foreground">Trip Details:</strong> Pickup location, drop location, travel dates, number of pilgrims, preferred vehicle</li>
              <li><strong className="text-foreground">Optional Information:</strong> Special requests, sankalp details, notes for the pandit</li>
              <li><strong className="text-foreground">Communication Data:</strong> Messages sent via WhatsApp, email, or phone</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-2">3. How We Use Your Information</h2>
            <ul className="list-disc pl-6 space-y-1.5 text-sm sm:text-base text-muted-foreground">
              <li>To process and confirm your Braj Yatra booking</li>
              <li>To communicate with you about your pilgrimage — driver details, itinerary, timings</li>
              <li>To arrange local pandits, special pujas, and temple visits as requested</li>
              <li>To provide customer support before, during, and after your yatra</li>
              <li>To improve our services and pilgrimage offerings</li>
              <li>To send festival updates and yatra information (only if you opt in)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-2">4. Information Sharing</h2>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              We <strong className="text-foreground">never sell, rent, or trade</strong> your personal
              information. We only share necessary details with:
            </p>
            <ul className="list-disc pl-6 space-y-1.5 text-sm sm:text-base text-muted-foreground mt-3">
              <li>Your assigned driver (name, pickup details, contact number) — for your yatra only</li>
              <li>Local pandits or temple coordinators — only if you request puja/sankalp services</li>
              <li>Hotel/dharamshala partners — only if included in your package</li>
            </ul>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mt-3">
              We do not share your information with any third-party advertisers or marketing agencies.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-2">5. Data Security</h2>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              Your booking information is stored securely and accessible only to our coordination team
              led by {siteConfig.contactPerson}. We use secure databases and do not store payment card
              details on our servers. All payments are processed through trusted UPI/bank transfer
              channels.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-2">6. Your Rights</h2>
            <ul className="list-disc pl-6 space-y-1.5 text-sm sm:text-base text-muted-foreground">
              <li>You can request to see what information we hold about you</li>
              <li>You can request correction of any inaccurate information</li>
              <li>You can request deletion of your data (subject to booking record requirements)</li>
              <li>You can opt out of promotional communications at any time</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-2">7. Contact Us</h2>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              For any privacy-related questions or requests, please contact us:
            </p>
            <div className="mt-3 p-4 bg-muted/40 rounded-lg text-sm text-muted-foreground">
              <p><strong className="text-foreground">{siteConfig.name}</strong></p>
              <p>{siteConfig.address.line1}, {siteConfig.address.city}, {siteConfig.address.state} — {siteConfig.address.pincode}</p>
              <p>Phone: {siteConfig.phoneDisplay}</p>
              <p>Email: {siteConfig.email}</p>
              <p>Coordinator: {siteConfig.contactPerson}</p>
            </div>
          </section>
        </div>

        <div className="mt-10 pt-6 border-t border-border flex flex-wrap gap-4">
          <Button variant="outline" onClick={() => navigate("terms")}>
            View Terms & Conditions
          </Button>
          <Button onClick={() => navigate("contact")}>
            Contact Us
          </Button>
        </div>
      </div>
    </div>
  );
}
