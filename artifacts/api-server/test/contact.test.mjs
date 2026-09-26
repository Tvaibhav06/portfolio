import assert from "node:assert/strict";
import { once } from "node:events";
import http from "node:http";
import net from "node:net";
import { after, test } from "node:test";

const reservation = net.createServer();
reservation.listen(0, "127.0.0.1");
await once(reservation, "listening");
const port = reservation.address().port;
await new Promise((resolve) => reservation.close(resolve));
process.env.PORT = String(port);
delete process.env.RESEND_API_KEY;
delete process.env.CONTACT_FROM_EMAIL;
delete process.env.CONTACT_TO_EMAIL;

const originalFetch = globalThis.fetch;
let providerStatus = 200;
let lastProviderRequest;
globalThis.fetch = async (url, options) => {
  lastProviderRequest = { url, options };
  return new Response(JSON.stringify({ id: "test-message-id" }), { status: providerStatus });
};

const { server } = await import("../dist/index.mjs");
if (!server.listening) await once(server, "listening");
after(async () => {
  await new Promise((resolve) => server.close(resolve));
  globalThis.fetch = originalFetch;
});

function post(body) {
  return new Promise((resolve, reject) => {
    const request = http.request({ hostname: "127.0.0.1", port, path: "/api/contact", method: "POST", headers: { "Content-Type": "application/json" } }, (response) => {
      let text = "";
      response.on("data", (chunk) => { text += chunk; });
      response.on("end", () => resolve({ status: response.statusCode, body: JSON.parse(text) }));
    });
    request.on("error", reject);
    request.end(JSON.stringify(body));
  });
}

const message = { name: "Visitor", email: "visitor@example.com", subject: "Hello", message: "A project inquiry" };

test("invalid details never reach the mail provider", async () => {
  const response = await post({ ...message, email: "bad-address" });
  assert.equal(response.status, 400);
  assert.equal(lastProviderRequest, undefined);
});

test("missing mail settings fail without claiming delivery", async () => {
  const response = await post(message);
  assert.equal(response.status, 503);
  assert.equal(lastProviderRequest, undefined);
});

test("valid details are sent to Resend with a reply address", async () => {
  process.env.RESEND_API_KEY = "test-key";
  process.env.CONTACT_FROM_EMAIL = "Portfolio <hello@example.com>";
  process.env.CONTACT_TO_EMAIL = "owner@example.com";
  const response = await post(message);
  assert.equal(response.status, 200);
  assert.deepEqual(response.body, { ok: true });
  assert.equal(lastProviderRequest.url, "https://api.resend.com/emails");
  assert.equal(lastProviderRequest.options.headers.Authorization, "Bearer test-key");
  assert.deepEqual(JSON.parse(lastProviderRequest.options.body), {
    from: "Portfolio <hello@example.com>", to: ["owner@example.com"], reply_to: "visitor@example.com",
    subject: "Portfolio: Hello", text: "Name: Visitor\nEmail: visitor@example.com\nSubject: Hello\n\nA project inquiry",
  });
});

test("provider rejection does not claim delivery", async () => {
  providerStatus = 422;
  const response = await post(message);
  assert.equal(response.status, 502);
  assert.match(response.body.error, /could not be sent/);
});

test("repeated submissions are rate limited", async () => {
  providerStatus = 200;
  for (let i = 0; i < 3; i++) assert.equal((await post(message)).status, 200);
  const response = await post(message);
  assert.equal(response.status, 429);
});
