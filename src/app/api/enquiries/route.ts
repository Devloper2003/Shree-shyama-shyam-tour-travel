
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { siteConfig, buildWhatsAppLink, buildTelLink, buildMailtoLink } from "@/lib/site-config";
import { sendEnquiryEmail } from "@/lib/email";

/**
 * POST /api/enquiries
 *
 * Receives a Braj Yatra booking/enquiry submission from the website's contact
 * form, the popular-route "Book this route" buttons, or the fare calculator's
 * "Book this fare" button. Persists the enquiry to the SQLite database so the
 * business always has a record, then returns three deep links so the customer
 * can also push the same enquiry to WhatsApp, Email, or Phone in one click —
 * guaranteeing the enquiry actually reaches the business even if email
 * delivery is delayed.
 *
 * Request body (JSON):
 *   name, phone, email?, pickup, drop, yatraPackage?, vehicleType?,
 *   tripType?, pickupDate?, pickupTime?, passengers?, notes?, source?
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Minimal validation — only the essentials are required.
    const required = ["name", "phone", "pickup", "drop"];
    for (const key of required) {
      const value = body?.[key];
      if (!value || typeof value !== "string" || value.trim().length === 0) {
        return NextResponse.json(
          { ok: false, error: `Missing required field: ${key}` },
          { status: 400 }
        );
      }
    }

    const enquiry = await db.enquiry.create({
      data: {
        name: String(body.name).trim().slice(0, 120),
        phone: String(body.phone).trim().slice(0, 30),
        email: body.email ? String(body.email).trim().slice(0, 160) : null,
        pickup: String(body.pickup).trim().slice(0, 200),
        drop: String(body.drop).trim().slice(0, 200),
        yatraPackage: body.yatraPackage ? String(body.yatraPackage).slice(0, 100) : null,
        vehicleType: body.vehicleType ? String(body.vehicleType).slice(0, 60) : null,
        tripType: body.tripType ? String(body.tripType).slice(0, 40) : null,
        pickupDate: body.pickupDate ? String(body.pickupDate).slice(0, 20) : null,
        pickupTime: body.pickupTime ? String(body.pickupTime).slice(0, 20) : null,
        passengers: body.passengers ? String(body.passengers).slice(0, 20) : null,
        notes: body.notes ? String(body.notes).slice(0, 1000) : null,
        source: body.source ? String(body.source).slice(0, 40) : "contact-form",
      },
    });

    // Compose the message that will be sent via WhatsApp / email so the
    // business owner instantly sees every detail of the enquiry.
    const lines = [
      `*Radhe Radhe! New Yatra Enquiry — Sri Shyama Tour & Travels*`,
      `*(Coordinator: ${siteConfig.contactPerson})*`,
      ``,
      `Name: ${enquiry.name}`,
      `Phone: ${enquiry.phone}`,
      enquiry.email ? `Email: ${enquiry.email}` : null,
      ``,
      `Pickup: ${enquiry.pickup}`,
      `Drop: ${enquiry.drop}`,
      enquiry.yatraPackage ? `Yatra Package: ${enquiry.yatraPackage}` : null,
      enquiry.vehicleType ? `Vehicle: ${enquiry.vehicleType}` : null,
      enquiry.tripType ? `Yatra Type: ${enquiry.tripType}` : null,
      enquiry.pickupDate ? `Date: ${enquiry.pickupDate}` : null,
      enquiry.pickupTime ? `Time: ${enquiry.pickupTime}` : null,
      enquiry.passengers ? `Pilgrims: ${enquiry.passengers}` : null,
      enquiry.notes ? `Sankalp/Notes: ${enquiry.notes}` : null,
      ``,
      `Source: ${enquiry.source}`,
      `Enquiry ID: ${enquiry.id}`,
    ].filter(Boolean) as string[];

    const messageText = lines.join("\n");

    // Send email notification via Resend (non-blocking — enquiry is already saved)
    // Email is skipped gracefully if RESEND_API_KEY is not set
    sendEnquiryEmail({
      enquiryId: enquiry.id,
      name: enquiry.name,
      phone: enquiry.phone,
      email: enquiry.email,
      pickup: enquiry.pickup,
      drop: enquiry.drop,
      yatraPackage: enquiry.yatraPackage,
      vehicleType: enquiry.vehicleType,
      tripType: enquiry.tripType,
      pickupDate: enquiry.pickupDate,
      pickupTime: enquiry.pickupTime,
      passengers: enquiry.passengers,
      notes: enquiry.notes,
      source: enquiry.source,
    }).catch((err) => {
      // Email failure should not affect the API response
      console.error("[/api/enquiries] email send error:", err);
    });

    return NextResponse.json({
      ok: true,
      enquiryId: enquiry.id,
      whatsapp: buildWhatsAppLink(messageText),
      phone: buildTelLink(),
      email: buildMailtoLink(`New Braj Yatra Enquiry — ${enquiry.name}`, messageText),
      messagePreview: messageText,
    });
  } catch (err) {
    console.error("[/api/enquiries] error:", err);
    return NextResponse.json(
      { ok: false, error: "Failed to submit enquiry. Please try again or call us directly." },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ ok: true, message: "Enquiries endpoint is live. Use POST." });
}
