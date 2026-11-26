import { Resend } from "resend";

/**
 * Email utility for sending enquiry notifications via Resend API.
 *
 * Setup:
 * 1. Sign up at https://resend.com
 * 2. Get your API key from https://resend.com/api-keys
 * 3. Set RESEND_API_KEY in your .env file
 * 4. Set ENQUIRY_NOTIFY_EMAIL (where notifications are sent)
 * 5. Set RESEND_FROM_EMAIL (the sender address — must be a verified domain)
 *
 * For testing: use "onboarding@resend.dev" as the from email.
 * This only sends to the email address associated with your Resend account.
 *
 * For production: verify your domain at https://resend.com/domains
 * and use an email from your verified domain (e.g., noreply@shrishyamashyamtravels.in)
 */

type EnquiryEmailData = {
  enquiryId: string;
  name: string;
  phone: string;
  email?: string | null;
  pickup: string;
  drop: string;
  yatraPackage?: string | null;
  vehicleType?: string | null;
  tripType?: string | null;
  pickupDate?: string | null;
  pickupTime?: string | null;
  passengers?: string | null;
  notes?: string | null;
  source?: string;
};

/**
 * Sends an enquiry notification email via Resend.
 * Returns true if email was sent, false if it failed or Resend is not configured.
 * This function never throws — email failures are logged but don't block
 * the enquiry from being saved.
 */
export async function sendEnquiryEmail(data: EnquiryEmailData): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;

  // If no API key is set, skip email sending gracefully
  if (!apiKey) {
    console.log("[email] RESEND_API_KEY not set — skipping email notification");
    return false;
  }

  const notifyEmail = process.env.ENQUIRY_NOTIFY_EMAIL || "bookings@shrishyamashyamtravels.in";
  const fromEmail = process.env.RESEND_FROM_EMAIL || "Sri Shyama Travels <onboarding@resend.dev>";

  try {
    const resend = new Resend(apiKey);

    // Build the HTML email content
    const rows = [
      `<tr><td style="padding:8px 12px;color:#666;">Name</td><td style="padding:8px 12px;font-weight:bold;">${data.name}</td></tr>`,
      `<tr><td style="padding:8px 12px;color:#666;">Phone</td><td style="padding:8px 12px;font-weight:bold;">${data.phone}</td></tr>`,
      data.email ? `<tr><td style="padding:8px 12px;color:#666;">Email</td><td style="padding:8px 12px;">${data.email}</td></tr>` : "",
      `<tr><td style="padding:8px 12px;color:#666;">Pickup</td><td style="padding:8px 12px;">${data.pickup}</td></tr>`,
      `<tr><td style="padding:8px 12px;color:#666;">Drop</td><td style="padding:8px 12px;">${data.drop}</td></tr>`,
      data.yatraPackage ? `<tr><td style="padding:8px 12px;color:#666;">Yatra Package</td><td style="padding:8px 12px;">${data.yatraPackage}</td></tr>` : "",
      data.vehicleType ? `<tr><td style="padding:8px 12px;color:#666;">Vehicle</td><td style="padding:8px 12px;">${data.vehicleType}</td></tr>` : "",
      data.tripType ? `<tr><td style="padding:8px 12px;color:#666;">Yatra Type</td><td style="padding:8px 12px;">${data.tripType}</td></tr>` : "",
      data.pickupDate ? `<tr><td style="padding:8px 12px;color:#666;">Date</td><td style="padding:8px 12px;">${data.pickupDate}</td></tr>` : "",
      data.pickupTime ? `<tr><td style="padding:8px 12px;color:#666;">Time</td><td style="padding:8px 12px;">${data.pickupTime}</td></tr>` : "",
      data.passengers ? `<tr><td style="padding:8px 12px;color:#666;">Pilgrims</td><td style="padding:8px 12px;">${data.passengers}</td></tr>` : "",
      data.notes ? `<tr><td style="padding:8px 12px;color:#666;">Notes</td><td style="padding:8px 12px;">${data.notes}</td></tr>` : "",
    ].filter(Boolean).join("");

    const { error } = await resend.emails.send({
      from: fromEmail,
      to: [notifyEmail],
      subject: `Radhe Radhe! New Yatra Enquiry — ${data.name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #1e3a5f, #2c5282); padding: 20px; border-radius: 8px 8px 0 0;">
            <h1 style="color: #ffd700; margin: 0; font-size: 22px;">Radhe Radhe!</h1>
            <p style="color: white; margin: 5px 0 0;">New Braj Yatra Enquiry Received</p>
          </div>
          <div style="background: #f9fafb; padding: 20px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 8px 8px;">
            <p style="color: #374151; margin-bottom: 16px;">A new enquiry has been submitted on your website. Details below:</p>
            <table style="width: 100%; border-collapse: collapse;">
              ${rows}
            </table>
            <div style="margin-top: 20px; padding-top: 16px; border-top: 1px solid #e5e7eb;">
              <p style="color: #6b7280; font-size: 13px; margin: 0;">
                Enquiry ID: <code style="background: #e5e7eb; padding: 2px 6px; border-radius: 4px;">${data.enquiryId}</code><br>
                Source: ${data.source || "contact-form"}<br>
                Received: ${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}
              </p>
            </div>
            <div style="margin-top: 20px; text-align: center;">
              <a href="https://wa.me/91${data.phone.replace(/\D/g, "")}" style="display: inline-block; background: #25d366; color: white; padding: 10px 24px; border-radius: 6px; text-decoration: none; font-weight: bold;">
                Reply on WhatsApp
              </a>
            </div>
          </div>
          <p style="color: #9ca3af; font-size: 12px; text-align: center; margin-top: 16px;">
            This is an automated notification from Sri Shyama Tour & Travels website.
          </p>
        </div>
      `,
    });

    if (error) {
      console.error("[email] Resend error:", error);
      return false;
    }

    console.log("[email] Enquiry notification sent to:", notifyEmail);
    return true;
  } catch (err) {
    console.error("[email] Failed to send enquiry email:", err);
    return false;
  }
}
