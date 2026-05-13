import * as brevo from '@getbrevo/brevo';

const BREVO_API_KEY = process.env.BREVO_API_KEY!;
const FROM_EMAIL = process.env.FROM_EMAIL || "hello@justinch.dev";
const SENDER_NAME = "Start Smart Event";

const EVENT_DATE = process.env.EVENT_DATE || "May 23, 2026";
const EVENT_TIME = process.env.EVENT_TIME || "10:00 AM – 4:00 PM WAT";
const EVENT_LOCATION = "Google Meet";
const GOOGLE_MEET_LINK = process.env.GOOGLE_MEET_LINK || "https://meet.google.com/xyz-abcd-efg";
const EVENT_DTSTART = process.env.EVENT_DTSTART || "20260523T090000Z";
const EVENT_DTEND = process.env.EVENT_DTEND || "20260523T150000Z";
const EVENT_NAME = "Start Smart: Syncing Academic Excellence with Tech Industry";

function generateICS(): string {
  const stamp = new Date().toISOString().replace(/[-:.]/g, "").slice(0, 15) + "Z";
  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Start Smart Event//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:startsmart-${Date.now()}@justinch.dev`,
    `DTSTAMP:${stamp}`,
    `DTSTART:${EVENT_DTSTART}`,
    `DTEND:${EVENT_DTEND}`,
    `SUMMARY:${EVENT_NAME}`,
    "DESCRIPTION:Join us for an inspiring day where academic brilliance meets real-world tech industry mastery. Meet Link: " + GOOGLE_MEET_LINK,
    `LOCATION:${GOOGLE_MEET_LINK}`,
    `URL:${GOOGLE_MEET_LINK}`,
    "STATUS:CONFIRMED",
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
}

function getGoogleCalendarLink(): string {
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: EVENT_NAME,
    dates: `${EVENT_DTSTART}/${EVENT_DTEND}`,
    details: "Join us for an inspiring day where academic brilliance meets real-world tech industry mastery.\n\nMeet Link: " + GOOGLE_MEET_LINK,
    location: GOOGLE_MEET_LINK,
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

const calendarIcon = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>`;
const clockIcon = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`;
const videoIcon = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15.6 11.6L22 7v10l-6.4-4.6v4.6H2V7h13.6v4.6z"/></svg>`;

export function buildConfirmationHtml(name: string): string {
  const gcal = getGoogleCalendarLink();
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <style>
    @media only screen and (max-width:600px){
      .outer{padding:16px !important;}
      .card{padding:14px 16px !important;}
      .cta-btn{padding:11px 20px !important;font-size:13px !important;}
    }
  </style>
</head>
<body style="margin:0;padding:0;background:#f6f6f8;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,sans-serif;">
<div class="outer" style="max-width:520px;margin:0 auto;padding:36px 24px;">

  <p style="font-size:12px;font-weight:600;color:#7c3aed;letter-spacing:0.08em;text-transform:uppercase;margin:0 0 28px;">Start Smart Event</p>

  <p style="font-size:22px;font-weight:700;color:#111;margin:0 0 10px;">Hello, ${name}</p>
  <p style="font-size:15px;color:#555;line-height:1.7;margin:0 0 28px;">You're officially registered. We're excited to have you join us for a day where academic excellence meets the tech industry.</p>

  <div class="card" style="background:#fff;border:1px solid #e5e7eb;border-radius:12px;padding:20px 24px;margin-bottom:28px;">
    <p style="font-size:11px;font-weight:600;color:#9ca3af;letter-spacing:0.1em;text-transform:uppercase;margin:0 0 14px;">Event Details</p>
    <table width="100%" style="border-collapse:collapse;">
      <tr>
        <td style="width:24px;vertical-align:middle;padding:10px 0;border-bottom:1px solid #f3f4f6;">${calendarIcon}</td>
        <td style="padding:10px 0 10px 12px;border-bottom:1px solid #f3f4f6;vertical-align:middle;">
          <span style="display:block;font-size:11px;color:#9ca3af;text-transform:uppercase;letter-spacing:0.07em;margin-bottom:2px;">Date</span>
          <span style="font-size:14px;color:#111;font-weight:600;">${EVENT_DATE}</span>
        </td>
      </tr>
      <tr>
        <td style="width:24px;vertical-align:middle;padding:10px 0;border-bottom:1px solid #f3f4f6;">${clockIcon}</td>
        <td style="padding:10px 0 10px 12px;border-bottom:1px solid #f3f4f6;vertical-align:middle;">
          <span style="display:block;font-size:11px;color:#9ca3af;text-transform:uppercase;letter-spacing:0.07em;margin-bottom:2px;">Time</span>
          <span style="font-size:14px;color:#111;font-weight:600;">${EVENT_TIME}</span>
        </td>
      </tr>
      <tr>
        <td style="width:24px;vertical-align:middle;padding:10px 0;">${videoIcon}</td>
        <td style="padding:10px 0 0 12px;vertical-align:middle;">
          <span style="display:block;font-size:11px;color:#9ca3af;text-transform:uppercase;letter-spacing:0.07em;margin-bottom:2px;">Location</span>
          <span style="font-size:14px;color:#111;font-weight:600;"><a href="${GOOGLE_MEET_LINK}" style="color:#7c3aed;text-decoration:underline;">Google Meet</a></span>
        </td>
      </tr>
    </table>
  </div>

  <table width="100%" style="border-collapse:collapse;margin-bottom:32px;">
    <tr>
      <td align="center">
        <a href="${gcal}" class="cta-btn" style="display:inline-block;background:#7c3aed;color:#fff;font-weight:600;font-size:14px;padding:12px 28px;border-radius:8px;text-decoration:none;">Add to Google Calendar</a>
      </td>
    </tr>
    <tr>
      <td align="center" style="padding-top:8px;">
        <span style="font-size:12px;color:#9ca3af;">An .ics file is also attached for any calendar app.</span>
      </td>
    </tr>
  </table>

  <p style="font-size:12px;color:#9ca3af;margin:0;text-align:center;">Questions? <a href="https://wa.me/2349017165458" style="color:#7c3aed;text-decoration:none;">Chat with us on WhatsApp</a></p>
  <p style="font-size:11px;color:#c9cace;margin:8px 0 0;text-align:center;">© 2026 Start Smart Event. The SYNC agenda</p>
</div>
</body>
</html>`;
}

export function buildBroadcastHtml(bodyText: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <style>
    @media only screen and (max-width:600px){
      .outer{padding:16px !important;}
      .card{padding:14px 16px !important;}
    }
  </style>
</head>
<body style="margin:0;padding:0;background:#f6f6f8;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,sans-serif;">
<div class="outer" style="max-width:520px;margin:0 auto;padding:36px 24px;">

  <p style="font-size:12px;font-weight:600;color:#7c3aed;letter-spacing:0.08em;text-transform:uppercase;margin:0 0 28px;">Start Smart Event</p>

  <div class="card" style="background:#fff;border:1px solid #e5e7eb;border-radius:12px;padding:24px;margin-bottom:28px;">
    <div style="color:#333;font-size:15px;line-height:1.8;white-space:pre-wrap;">${bodyText}</div>
  </div>

  <p style="font-size:12px;color:#9ca3af;margin:0;text-align:center;">Questions? <a href="https://wa.me/2349017165458" style="color:#7c3aed;text-decoration:none;">Chat with us on WhatsApp</a></p>
  <p style="font-size:11px;color:#c9cace;margin:8px 0 0;text-align:center;">© 2026 Start Smart Event. The SYNC agenda</p>
</div>
</body>
</html>`;
}

// Initialize API instance
const apiInstance = new brevo.TransactionalEmailsApi();
(apiInstance as any).authentications.apiKey.apiKey = BREVO_API_KEY;

export async function sendConfirmationEmail(name: string, email: string) {
  const ics = Buffer.from(generateICS()).toString("base64");

  const sendSmtpEmail = new brevo.SendSmtpEmail();
  sendSmtpEmail.sender = { email: FROM_EMAIL, name: SENDER_NAME };
  sendSmtpEmail.to = [{ email, name }];
  sendSmtpEmail.subject = "You're Registered – Start Smart Event";
  sendSmtpEmail.htmlContent = buildConfirmationHtml(name);
  (sendSmtpEmail as any).attachment = [{ name: "start-smart-event.ics", content: ics }];

  try {
    const response = await apiInstance.sendTransacEmail(sendSmtpEmail);
    const msgId = (response as any).body?.messageId || (response as any).messageId;
    console.log("Confirmation email sent:", msgId);
  } catch (error: any) {
    console.error("Brevo email error:", error);
    throw new Error(`Brevo error: ${error.message || 'Failed to send confirmation email'}`);
  }
}

export async function sendBroadcastEmail(
  recipients: { name: string; email: string }[],
  subject: string,
  body: string
) {
  const html = buildBroadcastHtml(body);
  const batches: typeof recipients[] = [];

  for (let i = 0; i < recipients.length; i += 50) {
    batches.push(recipients.slice(i, i + 50));
  }

  for (const batch of batches) {
    const sendSmtpEmail = new brevo.SendSmtpEmail();
    sendSmtpEmail.sender = { email: FROM_EMAIL, name: SENDER_NAME };
    sendSmtpEmail.to = batch.map((r) => ({ email: r.email, name: r.name }));
    sendSmtpEmail.subject = subject;
    sendSmtpEmail.htmlContent = html;

    try {
      const response = await apiInstance.sendTransacEmail(sendSmtpEmail);
      const msgId = (response as any).body?.messageId || (response as any).messageId;
      console.log("Broadcast batch sent:", msgId);
    } catch (error: any) {
      console.error("Brevo broadcast email error:", error);
      throw new Error(`Brevo broadcast error: ${error.message || 'Failed to send broadcast batch'}`);
    }
  }
}
