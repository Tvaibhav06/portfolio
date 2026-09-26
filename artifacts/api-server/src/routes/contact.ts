import { Router, type IRouter } from "express";
import { logger } from "../lib/logger";

const router: IRouter = Router();
const emailPattern = /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/;
const attempts = new Map<string, { count: number; resetAt: number }>();
const windowMs = 15 * 60 * 1000;
const maxAttempts = 5;

function clean(value: unknown, max: number, multiline = false): string | null {
  if (typeof value !== "string") return null;
  const result = value.trim();
  return result && result.length <= max && !/[\u0000-\u001f\u007f]/.test(multiline ? result.replace(/\n/g, "") : result) ? result : null;
}

router.post("/contact", async (req, res) => {
  const ip = req.ip ?? "unknown";
  const now = Date.now();
  if (attempts.size >= 10000) {
    for (const [key, value] of attempts) if (value.resetAt <= now) attempts.delete(key);
  }
  if (attempts.size >= 10000 && !attempts.has(ip)) {
    res.status(429).json({ error: "Too many messages. Please try again later." });
    return;
  }
  const current = attempts.get(ip);
  if (current && current.resetAt > now && current.count >= maxAttempts) {
    res.set("Retry-After", String(Math.ceil((current.resetAt - now) / 1000)));
    res.status(429).json({ error: "Too many messages. Please try again later." });
    return;
  }

  const body = req.body;
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    res.status(400).json({ error: "Please complete the contact form." });
    return;
  }

  const name = clean(body.name, 100);
  const email = clean(body.email, 254);
  const subject = clean(body.subject, 150);
  const message = clean(body.message, 5000, true);
  if (!name || !email || !emailPattern.test(email) || !subject || !message) {
    res.status(400).json({ error: "Please check all fields and try again." });
    return;
  }

  // An empty, hidden field catches simple automated submissions.
  if (body.website) {
    res.status(200).json({ ok: true });
    return;
  }

  const key = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL;
  const to = process.env.CONTACT_TO_EMAIL;
  if (!key || !from || !to) {
    logger.error("Contact email is not configured");
    res.status(503).json({ error: "The form is temporarily unavailable. Please email me directly." });
    return;
  }

  attempts.set(ip, { count: current && current.resetAt > now ? current.count + 1 : 1, resetAt: current && current.resetAt > now ? current.resetAt : now + windowMs });

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: email,
        subject: `Portfolio: ${subject}`,
        text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\n\n${message}`,
      }),
      signal: AbortSignal.timeout(10000),
    });
    if (!response.ok) {
      logger.error({ status: response.status }, "Contact email provider rejected request");
      res.status(502).json({ error: "Your message could not be sent. Please try again or email me directly." });
      return;
    }
    res.status(200).json({ ok: true });
  } catch (err) {
    logger.error({ err }, "Contact email provider unavailable");
    res.status(502).json({ error: "Your message could not be sent. Please try again or email me directly." });
  }
});

export default router;
