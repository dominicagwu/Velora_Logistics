import { Resend } from "resend";

const resend = new Resend(import.meta.env.VITE_RESEND_API_KEY);

export async function sendTrackingEmail({
  customerName,
  customerEmail,
  trackingNumber,
}) {
  try {
    const { data, error } = await resend.emails.send({
      from: "Velora Logistics <onboarding@resend.dev>",
      to: customerEmail,
      subject: "Your Velora Shipment Tracking Number",
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2>Hello ${customerName},</h2>
          <p>Your shipment has been created successfully.</p>

          <div style="background: #f4f4f4; padding: 15px; border-radius: 8px;">
            <strong>Tracking Number:</strong><br/>
            <span style="font-size: 20px; color: #2563eb;">${trackingNumber}</span>
          </div>

          <p style="margin-top: 20px;">
            Track your shipment on the Velora Logistics tracking page.
          </p>

          <p>
            Thank you for choosing <strong>Velora Logistics</strong> 🚚
          </p>
        </div>
      `,
    });

    if (error) {
      console.error("Email error:", error);
      return false;
    }

    console.log("Email sent:", data);
    return true;
  } catch (err) {
    console.error("Send failed:", err);
    return false;
  }
}