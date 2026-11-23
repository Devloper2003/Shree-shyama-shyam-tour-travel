"use client";

import { Badge } from "@/components/ui/badge";
import { FileText } from "lucide-react";
import { usePageStore } from "@/lib/page-store";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site-config";

export function TermsPage() {
  const navigate = usePageStore((s) => s.navigate);

  return (
    <div className="pt-12 pb-16 bg-background min-h-screen">
      <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <Badge variant="secondary" className="mb-4">
          <FileText className="w-4 h-4 mr-1.5" /> Legal
        </Badge>
        <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">Terms & Conditions</h1>
        <p className="text-sm text-muted-foreground mb-8">
          Last updated: November 2026
        </p>

        <div className="prose prose-sm sm:prose-base max-w-none space-y-6">
          <section>
            <h2 className="text-xl font-bold text-foreground mb-2">1. Acceptance of Terms</h2>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              By booking a Braj Yatra or using any service from {siteConfig.name}, you agree to
              these Terms & Conditions. If you do not agree with any part of these terms, please
              do not book our services.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-2">2. Booking & Confirmation</h2>
            <ul className="list-disc pl-6 space-y-1.5 text-sm sm:text-base text-muted-foreground">
              <li>All bookings require a <strong className="text-foreground">25% advance payment</strong> to confirm. The balance is paid to the driver after the trip.</li>
              <li>Bookings are confirmed only after our team calls you back and verifies the details.</li>
              <li>A booking reference ID is generated for every confirmed enquiry.</li>
              <li>We reserve the right to decline a booking if the requested route or date is not feasible.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-2">3. Pricing & Payment</h2>
            <ul className="list-disc pl-6 space-y-1.5 text-sm sm:text-base text-muted-foreground">
              <li>All prices are in Indian Rupees (₹) and are per person unless stated otherwise.</li>
              <li>Package prices include AC cab, driver-cum-guide, fuel, toll, parking, and all temple visits.</li>
              <li>Multi-day packages include accommodation at dharamshala/hotel as specified.</li>
              <li><strong className="text-foreground">Not included:</strong> Personal donations, prasad purchases, meals, optional VIP darshan fees.</li>
              <li>For one-way outstation trips, return kilometre charges may apply as per industry standard.</li>
              <li>We accept UPI, bank transfer, credit/debit cards, and cash.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-2">4. Cancellation & Refund Policy</h2>
            <ul className="list-disc pl-6 space-y-1.5 text-sm sm:text-base text-muted-foreground">
              <li><strong className="text-foreground">More than 6 hours before pickup:</strong> Full refund, no cancellation charge.</li>
              <li><strong className="text-foreground">Within 6 hours of pickup:</strong> A driver allowance fee (₹500-₹1000) may be deducted.</li>
              <li><strong className="text-foreground">No-show:</strong> Advance payment is non-refundable.</li>
              <li><strong className="text-foreground">Rescheduling:</strong> Free of cost, subject to availability.</li>
              <li>Refunds are processed within 7-10 working days to the original payment method.</li>
              <li>If we cancel a booking due to unforeseen circumstances, a full refund is issued.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-2">5. Vehicle & Driver</h2>
            <ul className="list-disc pl-6 space-y-1.5 text-sm sm:text-base text-muted-foreground">
              <li>The vehicle type is confirmed at the time of booking. Substitutes (of equal or higher quality) may be provided if the original vehicle is unavailable.</li>
              <li>All drivers are police-verified, vegetarian, and experienced in Braj routes.</li>
              <li>Driver details (name, photo, vehicle number) are shared 30 minutes before pickup.</li>
              <li>AC is included in all vehicles. If AC fails during the trip, a partial refund may be provided.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-2">6. Pilgrimage Conduct</h2>
            <ul className="list-disc pl-6 space-y-1.5 text-sm sm:text-base text-muted-foreground">
              <li>Devotees are requested to respect temple traditions, dress codes, and photography restrictions.</li>
              <li>At certain temples (e.g., Banke Bihari), men may be required to remove shirts. Please follow temple guidelines.</li>
              <li>Govardhan Parikrama is traditionally done on foot. Vehicle parikrama is available for elderly devotees.</li>
              <li>Please carry valid ID proof for temple entry where required.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-2">7. Limitation of Liability</h2>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              {siteConfig.name} is not liable for:
            </p>
            <ul className="list-disc pl-6 space-y-1.5 text-sm sm:text-base text-muted-foreground mt-3">
              <li>Delays or disruptions due to weather, road conditions, traffic, or temple schedules</li>
              <li>Loss or damage to personal belongings during the yatra</li>
              <li>Temple closures, VIP darshan unavailability, or festival crowd conditions</li>
              <li>Any third-party services (hotels, restaurants, shops) not directly operated by us</li>
            </ul>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mt-3">
              Our maximum liability is limited to the amount paid for the booking.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-2">8. Force Majeure</h2>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              We are not liable for failure to perform our obligations due to events beyond our control,
              including natural disasters, pandemics, government restrictions, strikes, or civil unrest.
              In such cases, bookings may be rescheduled or refunded as mutually agreed.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-2">9. Contact</h2>
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
          <Button variant="outline" onClick={() => navigate("privacy")}>
            View Privacy Policy
          </Button>
          <Button onClick={() => navigate("contact")}>
            Contact Us
          </Button>
        </div>
      </div>
    </div>
  );
}
