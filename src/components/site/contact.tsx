"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  Phone,
  Mail,
  MessageCircle,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  Loader2,
  ExternalLink,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { siteConfig, buildTelLink, buildWhatsAppLink, buildMailtoLink } from "@/lib/site-config";
import { vehicles } from "@/lib/site-data";

type PrefillDetail = {
  pickup?: string;
  drop?: string;
  vehicleType?: string;
  tripType?: string;
  notes?: string;
  source?: string;
};

type ApiResponse = {
  ok: boolean;
  enquiryId?: string;
  whatsapp?: string;
  phone?: string;
  email?: string;
  messagePreview?: string;
  error?: string;
};

export function Contact() {
  const { toast } = useToast();
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<ApiResponse | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  // Form state
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    pickup: "",
    drop: "",
    vehicleType: "",
    tripType: "one-way",
    pickupDate: "",
    pickupTime: "",
    passengers: "1",
    notes: "",
  });
  const [source, setSource] = useState("contact-form");

  // Listen for prefill events from Routes / Fare Calculator
  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent<PrefillDetail>).detail;
      if (!detail) return;
      setForm((prev) => ({
        ...prev,
        pickup: detail.pickup ?? prev.pickup,
        drop: detail.drop ?? prev.drop,
        vehicleType: detail.vehicleType ?? prev.vehicleType,
        tripType: detail.tripType ?? prev.tripType,
        notes: detail.notes ?? prev.notes,
      }));
      setSource(detail.source ?? "contact-form");
      // If the success screen from a previous enquiry is currently showing,
      // dismiss it so the freshly pre-filled form becomes visible again.
      setResult(null);
      toast({
        title: "Details pre-filled",
        description: "We have filled the route details. Please complete the rest.",
      });
    };
    window.addEventListener("prefill-booking", handler);
    return () => window.removeEventListener("prefill-booking", handler);
  }, [toast]);

  const update = (key: keyof typeof form, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (submitting) return;

    // Basic client-side validation
    if (!form.name.trim() || !form.phone.trim() || !form.pickup.trim() || !form.drop.trim()) {
      toast({
        title: "Missing details",
        description: "Please fill your name, phone, pickup, and drop.",
        variant: "destructive",
      });
      return;
    }

    setSubmitting(true);
    setResult(null);

    try {
      const res = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, source }),
      });
      const data: ApiResponse = await res.json();
      if (!res.ok || !data.ok) {
        throw new Error(data.error || "Submission failed");
      }
      setResult(data);
      toast({
        title: "Enquiry submitted!",
        description: "We have received your details. Use WhatsApp or Call below for instant confirmation.",
      });
      // Reset the source back to default for the next manual submission
      setSource("contact-form");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Something went wrong";
      toast({
        title: "Could not submit",
        description: message,
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleReset = () => {
    setResult(null);
    setForm({
      name: "",
      phone: "",
      email: "",
      pickup: "",
      drop: "",
      vehicleType: "",
      tripType: "one-way",
      pickupDate: "",
      pickupTime: "",
      passengers: "1",
      notes: "",
    });
    formRef.current?.reset();
  };

  return (
    <section
      id="contact"
      className="py-16 sm:py-20 lg:py-24 bg-background"
      aria-labelledby="contact-heading"
    >
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <Badge variant="secondary" className="mb-3">
            Book a Cab
          </Badge>
          <h2 id="contact-heading" className="text-3xl sm:text-4xl font-bold text-foreground">
            Book Your Cab in 60 Seconds
          </h2>
          <p className="mt-4 text-muted-foreground text-base sm:text-lg">
            Fill the form below and our team will call you back within 15 minutes to confirm.
            For instant confirmation, use WhatsApp or Call — your enquiry details go straight to
            us.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: contact info cards (1 col) */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5 }}
            className="space-y-4 order-2 lg:order-1"
          >
            <div className="bg-navy-gradient text-white rounded-xl p-6">
              <h3 className="text-lg font-bold mb-4">Reach Us Directly</h3>
              <div className="space-y-4 text-sm">
                <a href={buildTelLink()} className="flex items-start gap-3 hover:text-gold transition-colors">
                  <Phone className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                  <div>
                    <p className="text-white/70 text-xs">Call us</p>
                    <p className="font-semibold">{siteConfig.phoneDisplay}</p>
                  </div>
                </a>
                <a
                  href={buildWhatsAppLink(`Hello ${siteConfig.shortName}, I would like to book a cab.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 hover:text-gold transition-colors"
                >
                  <MessageCircle className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                  <div>
                    <p className="text-white/70 text-xs">WhatsApp</p>
                    <p className="font-semibold">{siteConfig.whatsappDisplay}</p>
                  </div>
                </a>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="flex items-start gap-3 hover:text-gold transition-colors break-all"
                >
                  <Mail className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                  <div>
                    <p className="text-white/70 text-xs">Email</p>
                    <p className="font-semibold">{siteConfig.email}</p>
                  </div>
                </a>
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                  <div>
                    <p className="text-white/70 text-xs">Office</p>
                    <p className="font-semibold leading-relaxed">
                      {siteConfig.address.line1}, {siteConfig.address.line2},{" "}
                      {siteConfig.address.city}, {siteConfig.address.state} —{" "}
                      {siteConfig.address.pincode}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                  <div>
                    <p className="text-white/70 text-xs">Hours</p>
                    <p className="font-semibold">{siteConfig.businessHours}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick action buttons */}
            <div className="grid grid-cols-2 gap-3">
              <a href={buildTelLink()}>
                <Button variant="outline" className="w-full gap-2">
                  <Phone className="w-4 h-4" /> Call
                </Button>
              </a>
              <a
                href={buildWhatsAppLink(
                  `Hello ${siteConfig.shortName}, I would like to enquire about a cab.`
                )}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outline" className="w-full gap-2">
                  <MessageCircle className="w-4 h-4" /> WhatsApp
                </Button>
              </a>
            </div>
          </motion.div>

          {/* Right: form / success card (2 cols) */}
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-2 order-1 lg:order-2"
          >
            {!result ? (
              <form
                ref={formRef}
                onSubmit={handleSubmit}
                className="bg-background border border-border rounded-xl p-6 sm:p-8 shadow-sm"
                aria-label="Booking enquiry form"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      required
                      value={form.name}
                      onChange={(e) => update("name", e.target.value)}
                      placeholder="Your name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      required
                      type="tel"
                      value={form.phone}
                      onChange={(e) => update("phone", e.target.value)}
                      placeholder="+91 ..."
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email (optional)</Label>
                    <Input
                      id="email"
                      type="email"
                      value={form.email}
                      onChange={(e) => update("email", e.target.value)}
                      placeholder="you@example.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="passengers">Passengers</Label>
                    <Input
                      id="passengers"
                      type="number"
                      min="1"
                      value={form.passengers}
                      onChange={(e) => update("passengers", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="pickup">Pickup Location *</Label>
                    <Input
                      id="pickup"
                      required
                      value={form.pickup}
                      onChange={(e) => update("pickup", e.target.value)}
                      placeholder="City / address / airport"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="drop">Drop Location *</Label>
                    <Input
                      id="drop"
                      required
                      value={form.drop}
                      onChange={(e) => update("drop", e.target.value)}
                      placeholder="City / address / airport"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="vehicleType">Vehicle Type</Label>
                    <Select
                      value={form.vehicleType}
                      onValueChange={(v) => update("vehicleType", v)}
                    >
                      <SelectTrigger id="vehicleType">
                        <SelectValue placeholder="Select vehicle" />
                      </SelectTrigger>
                      <SelectContent>
                        {vehicles.map((v) => (
                          <SelectItem key={v.id} value={v.name}>
                            {v.name} ({v.seating})
                          </SelectItem>
                        ))}
                        <SelectItem value="Not sure">Not sure — please suggest</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="tripType">Trip Type</Label>
                    <Select
                      value={form.tripType}
                      onValueChange={(v) => update("tripType", v)}
                    >
                      <SelectTrigger id="tripType">
                        <SelectValue placeholder="Select trip type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="one-way">One-way</SelectItem>
                        <SelectItem value="round-trip">Round-trip</SelectItem>
                        <SelectItem value="local">Local / hourly</SelectItem>
                        <SelectItem value="airport">Airport transfer</SelectItem>
                        <SelectItem value="tour-package">Tour package</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="pickupDate">Pickup Date</Label>
                    <Input
                      id="pickupDate"
                      type="date"
                      value={form.pickupDate}
                      onChange={(e) => update("pickupDate", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="pickupTime">Pickup Time</Label>
                    <Input
                      id="pickupTime"
                      type="time"
                      value={form.pickupTime}
                      onChange={(e) => update("pickupTime", e.target.value)}
                    />
                  </div>

                  <div className="sm:col-span-2 space-y-2">
                    <Label htmlFor="notes">Notes (optional)</Label>
                    <Textarea
                      id="notes"
                      rows={3}
                      value={form.notes}
                      onChange={(e) => update("notes", e.target.value)}
                      placeholder="Any special request — child seat, stops, flight number, luggage, etc."
                    />
                  </div>
                </div>

                <div className="mt-6 flex flex-col sm:flex-row items-center gap-3">
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full sm:w-auto gap-2"
                    disabled={submitting}
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" /> Submitting...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" /> Submit Enquiry
                      </>
                    )}
                  </Button>
                  <p className="text-xs text-muted-foreground text-center sm:text-left">
                    By submitting, you agree to be contacted about your enquiry. We never share
                    your details.
                  </p>
                </div>
              </form>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="bg-background border border-border rounded-xl p-8 shadow-sm text-center"
              >
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-9 h-9 text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-foreground">Enquiry Received!</h3>
                <p className="mt-2 text-muted-foreground max-w-md mx-auto">
                  Thank you, <strong className="text-foreground">{form.name}</strong>. Your
                  enquiry has been saved. For <strong>instant confirmation</strong>, please push
                  the same details to us via any of the channels below — we will confirm your
                  booking right away.
                </p>

                <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-lg mx-auto">
                  <a
                    href={result.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center gap-2 p-4 rounded-lg border border-border hover:border-primary hover:bg-muted transition-colors"
                  >
                    <MessageCircle className="w-6 h-6 text-primary" />
                    <span className="text-sm font-semibold">WhatsApp</span>
                    <span className="text-xs text-muted-foreground">Fastest response</span>
                  </a>
                  <a
                    href={result.phone}
                    className="flex flex-col items-center gap-2 p-4 rounded-lg border border-border hover:border-primary hover:bg-muted transition-colors"
                  >
                    <Phone className="w-6 h-6 text-primary" />
                    <span className="text-sm font-semibold">Call Now</span>
                    <span className="text-xs text-muted-foreground">Talk directly</span>
                  </a>
                  <a
                    href={result.email}
                    className="flex flex-col items-center gap-2 p-4 rounded-lg border border-border hover:border-primary hover:bg-muted transition-colors"
                  >
                    <Mail className="w-6 h-6 text-primary" />
                    <span className="text-sm font-semibold">Email</span>
                    <span className="text-xs text-muted-foreground">Official record</span>
                  </a>
                </div>

                <div className="mt-6 bg-muted/60 rounded-lg p-4 text-left max-w-lg mx-auto">
                  <p className="text-xs text-muted-foreground mb-1">Your enquiry reference:</p>
                  <p className="text-xs font-mono text-foreground break-all">{result.enquiryId}</p>
                  <details className="mt-3">
                    <summary className="text-xs text-primary cursor-pointer flex items-center gap-1">
                      Preview message <ExternalLink className="w-3 h-3" />
                    </summary>
                    <pre className="mt-2 text-[11px] whitespace-pre-wrap text-muted-foreground font-sans">
                      {result.messagePreview}
                    </pre>
                  </details>
                </div>

                <Button variant="outline" className="mt-6" onClick={handleReset}>
                  Submit Another Enquiry
                </Button>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
