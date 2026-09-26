interface Env {
  ASSETS: { fetch(request: Request): Promise<Response> };
  RESEND_API_KEY?: string;
  CONTACT_FROM_EMAIL?: string;
  CONTACT_TO_EMAIL?: string;
}

interface ContactBody {
  name?: unknown;
  email?: unknown;
  subject?: unknown;
  message?: unknown;
  website?: unknown;
}

const emailPattern = /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/;
const rateLimitWindowMs = 15 * 60 * 1000;
const maxAttempts = 5;
const attempts = new Map<string, { count: number; resetAt: number }>();

function json(data: unknown, status = 200, headers: HeadersInit = {}): Response {
  return Response.json(data, { status, headers });
}

function clean(value: unknown, max: number, multiline = false): string | null {
  if (typeof value !== "string") return null;
  const result = value.trim();
  const checked = multiline ? result.replace(/\n/g, "") : result;
  if (!result || result.length > max || /[\u0000-\u001f\u007f]/.test(checked)) return null;
  return result;
}

async function sendContact(request: Request, env: Env): Promise<Response> {
  if (request.method !== "POST") {
    return json({ error: "Method not allowed." }, 405, { Allow: "POST" });
  }

  const contentLength = Number(request.headers.get("content-length") ?? 0);
  if (contentLength > 16 * 1024) return json({ error: "Please complete the contact form." }, 413);

  let body: ContactBody;
  try {
    body = await request.json() as ContactBody;
  } catch {
    return json({ error: "Please complete the contact form." }, 400);
  }
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return json({ error: "Please complete the contact form." }, 400);
  }

  const name = clean(body.name, 100);
  const email = clean(body.email, 254);
  const subject = clean(body.subject, 150);
  const message = clean(body.message, 5000, true);
  if (!name || !email || !emailPattern.test(email) || !subject || !message) {
    return json({ error: "Please check all fields and try again." }, 400);
  }

  // Silently accept automated submissions caught by the hidden spam trap.
  if (body.website) return json({ ok: true });

  const apiKey = env.RESEND_API_KEY;
  const from = env.CONTACT_FROM_EMAIL;
  const to = env.CONTACT_TO_EMAIL;
  if (!apiKey || !from || !to) {
    console.error("Contact email is not configured");
    return json({ error: "The form is temporarily unavailable. Please email me directly." }, 503);
  }

  const now = Date.now();
  if (attempts.size >= 10_000) {
    for (const [key, value] of attempts) if (value.resetAt <= now) attempts.delete(key);
  }
  const ip = request.headers.get("cf-connecting-ip") ?? "unknown";
  const current = attempts.get(ip);
  if (current && current.resetAt > now && current.count >= maxAttempts) {
    return json(
      { error: "Too many messages. Please try again later." },
      429,
      { "Retry-After": String(Math.ceil((current.resetAt - now) / 1000)) },
    );
  }
  attempts.set(ip, {
    count: current && current.resetAt > now ? current.count + 1 : 1,
    resetAt: current && current.resetAt > now ? current.resetAt : now + rateLimitWindowMs,
  });

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: email,
        subject: `Portfolio: ${subject}`,
        text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\n\n${message}`,
      }),
      signal: AbortSignal.timeout(10_000),
    });
    if (!response.ok) {
      console.error("Contact email provider rejected request", response.status);
      return json({ error: "Your message could not be sent. Please try again or email me directly." }, 502);
    }
    return json({ ok: true });
  } catch (error) {
    console.error("Contact email provider unavailable", error);
    return json({ error: "Your message could not be sent. Please try again or email me directly." }, 502);
  }
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    if (url.pathname === "/api/contact") return sendContact(request, env);
    if (url.pathname.startsWith("/api/")) return json({ error: "Not found." }, 404);
    return env.ASSETS.fetch(request);
  },
} satisfies ExportedHandler<Env>;
