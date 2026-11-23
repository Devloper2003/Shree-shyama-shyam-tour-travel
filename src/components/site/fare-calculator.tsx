"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Calculator, MapPin, ArrowRight, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { vehicles } from "@/lib/site-data";
import { usePageStore } from "@/lib/page-store";

export function FareCalculator() {
  const navigate = usePageStore((s) => s.navigate);
  const [pickup, setPickup] = useState("");
  const [drop, setDrop] = useState("");
  const [vehicleId, setVehicleId] = useState<string>(vehicles[0].id);
  const [tripType, setTripType] = useState<"one-way" | "round-trip">("one-way");
  const [distance, setDistance] = useState<string>("");
  const [submitted, setSubmitted] = useState(false);

  const vehicle = useMemo(
    () => vehicles.find((v) => v.id === vehicleId) ?? vehicles[0],
    [vehicleId]
  );

  // Parse distance — accept either user-entered km or estimate 10 km if both cities given
  const km = useMemo(() => {
    const parsed = parseFloat(distance);
    if (!isNaN(parsed) && parsed > 0) return parsed;
    // crude fallback: if both cities present and no km, assume 200 km
    if (pickup && drop) return 200;
    return 0;
  }, [distance, pickup, drop]);

  const fare = useMemo(() => {
    if (km <= 0) return 0;
    const baseKm = tripType === "round-trip" ? km * 2 : km;
    // One-way trips in India typically charge for return kms too (industry norm),
    // but for the calculator we show the straightforward km × rate for clarity,
    // and add a note below about the one-way return-km convention.
    const perKm = vehicle.perKmRate;
    let total = baseKm * perKm;
    // Add driver allowance for outstation (assumed flat ₹300 per day)
    total += 300;
    // Ensure at least the vehicle's minimum
    if (total < vehicle.startingFrom) total = vehicle.startingFrom;
    return Math.round(total);
  }, [km, tripType, vehicle]);

  const handleBookFare = () => {
    setSubmitted(true);
    navigate("contact", {
      contactPrefill: {
        pickup,
        drop,
        vehicleType: vehicle.name,
        tripType,
        notes: `Approx distance: ${km} km. Estimated fare: ₹${fare.toLocaleString("en-IN")}.`,
        source: "fare-calculator",
      },
    });
  };

  return (
    <section
      id="fare-calculator"
      className="py-16 sm:py-20 lg:py-24 bg-background"
      aria-labelledby="fare-heading"
    >
      <div className="container mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <Badge variant="secondary" className="mb-3">
            <Calculator className="w-3 h-3 mr-1" /> Yatra Fare Estimator
          </Badge>
          <h2 id="fare-heading" className="text-3xl sm:text-4xl font-bold text-foreground">
            Estimate Your Braj Yatra Fare
          </h2>
          <p className="mt-4 text-muted-foreground text-base sm:text-lg">
            Pick your vehicle, enter your pickup and Braj destination, and get a transparent
            estimated fare. Final fare may vary based on tolls, stops, and yatra package
            inclusions.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="bg-muted/40 border border-border rounded-2xl p-6 sm:p-8 shadow-sm"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Pickup */}
            <div className="space-y-2">
              <Label htmlFor="calc-pickup" className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-primary" /> Pickup City / Location
              </Label>
              <Input
                id="calc-pickup"
                placeholder="e.g. Delhi"
                value={pickup}
                onChange={(e) => setPickup(e.target.value)}
              />
            </div>

            {/* Drop */}
            <div className="space-y-2">
              <Label htmlFor="calc-drop" className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-primary" /> Braj Destination
              </Label>
              <Input
                id="calc-drop"
                placeholder="e.g. Mathura / Vrindavan"
                value={drop}
                onChange={(e) => setDrop(e.target.value)}
              />
            </div>

            {/* Vehicle select */}
            <div className="space-y-2">
              <Label htmlFor="calc-vehicle" className="flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-primary" /> Vehicle Type
              </Label>
              <Select value={vehicleId} onValueChange={setVehicleId}>
                <SelectTrigger id="calc-vehicle">
                  <SelectValue placeholder="Select vehicle" />
                </SelectTrigger>
                <SelectContent>
                  {vehicles.map((v) => (
                    <SelectItem key={v.id} value={v.id}>
                      {v.name} — ₹{v.perKmRate}/km ({v.seating})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Distance */}
            <div className="space-y-2">
              <Label htmlFor="calc-distance" className="flex items-center gap-1.5">
                <ArrowRight className="w-3.5 h-3.5 text-primary" /> Approx Distance (km)
              </Label>
              <Input
                id="calc-distance"
                type="number"
                inputMode="numeric"
                min="0"
                placeholder="e.g. 280"
                value={distance}
                onChange={(e) => setDistance(e.target.value)}
              />
            </div>
          </div>

          {/* Trip type toggle */}
          <div className="mt-5 flex items-center gap-3 flex-wrap">
            <Label className="text-sm text-muted-foreground">Trip type:</Label>
            <div className="inline-flex rounded-md border border-border overflow-hidden">
              <button
                type="button"
                onClick={() => setTripType("one-way")}
                className={`px-4 py-1.5 text-sm font-medium transition-colors ${
                  tripType === "one-way"
                    ? "bg-primary text-primary-foreground"
                    : "bg-background text-foreground hover:bg-muted"
                }`}
              >
                One-way
              </button>
              <button
                type="button"
                onClick={() => setTripType("round-trip")}
                className={`px-4 py-1.5 text-sm font-medium transition-colors ${
                  tripType === "round-trip"
                    ? "bg-primary text-primary-foreground"
                    : "bg-background text-foreground hover:bg-muted"
                }`}
              >
                Round-trip
              </button>
            </div>
          </div>

          {/* Result */}
          <div className="mt-6 bg-braj-deep text-white rounded-xl p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <p className="text-sm text-white/70">Estimated Total Fare</p>
              <p className="text-3xl sm:text-4xl font-bold text-gold mt-1">
                ₹{fare.toLocaleString("en-IN")}
              </p>
              <p className="text-xs text-white/70 mt-2">
                Includes {vehicle.name} @ ₹{vehicle.perKmRate}/km
                {km > 0 && ` × ${tripType === "round-trip" ? km * 2 : km} km`}
                {" + driver allowance"}
              </p>
              {tripType === "one-way" && km > 0 && (
                <p className="text-xs text-white/50 mt-1">
                  Note: For one-way outstation trips, return-km charges may apply per industry
                  norm. Confirm with us for the exact quote.
                </p>
              )}
            </div>
            <Button
              size="lg"
              className="bg-gold text-accent-foreground hover:bg-gold/90 shrink-0"
              onClick={handleBookFare}
              disabled={!pickup || !drop}
            >
              Book This Yatra
            </Button>
          </div>

          {submitted && (
            <p className="mt-3 text-sm text-primary text-center">
              Your details have been pre-filled in the booking form below. Please complete the
              remaining fields and submit.
            </p>
          )}
        </motion.div>
      </div>
    </section>
  );
}
