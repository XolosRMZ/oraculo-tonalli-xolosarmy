import { afterEach, describe, expect, it, vi } from "vitest";

import { buildServer } from "../src/server.js";

type FakeElement = {
  hidden: boolean;
  textContent: string;
  value: string;
  listeners: Record<string, () => void>;
  classList: { toggle: ReturnType<typeof vi.fn> };
  style: Record<string, string>;
  addEventListener: (type: string, listener: () => void) => void;
  querySelector: ReturnType<typeof vi.fn>;
  replaceChildren: ReturnType<typeof vi.fn>;
  setAttribute: ReturnType<typeof vi.fn>;
  append: ReturnType<typeof vi.fn>;
  select: ReturnType<typeof vi.fn>;
  remove: ReturnType<typeof vi.fn>;
};

function createFakeElement(): FakeElement {
  const element: FakeElement = {
    hidden: false,
    textContent: "",
    value: "",
    listeners: {},
    classList: { toggle: vi.fn() },
    style: {},
    addEventListener(type, listener) {
      this.listeners[type] = listener;
    },
    querySelector: vi.fn(),
    replaceChildren: vi.fn(),
    setAttribute: vi.fn(),
    append: vi.fn(),
    select: vi.fn(),
    remove: vi.fn()
  };

  return element;
}

async function loadPaymentScript() {
  const submitButton = createFakeElement();
  const form = createFakeElement();
  form.querySelector.mockReturnValue(submitButton);

  const elements = new Map<string, FakeElement>([
    ["#tonalli-form", form],
    ["#birth-date", createFakeElement()],
    ["#result", createFakeElement()],
    ["#tonal-name", createFakeElement()],
    ["#trecena-name", createFakeElement()],
    ["#reading-preview", createFakeElement()],
    ["#unlock-button", createFakeElement()],
    ["#payment-panel", createFakeElement()],
    ["#copy-address-button", createFakeElement()],
    ["#copy-address-status", createFakeElement()],
    ["#payment-txid", createFakeElement()],
    ["#payment-confirm-button", createFakeElement()],
    ["#full-reading-block", createFakeElement()],
    ["#full-reading", createFakeElement()],
    ["#status", createFakeElement()]
  ]);

  vi.stubGlobal("document", {
    body: { append: vi.fn() },
    createElement: vi.fn(() => createFakeElement()),
    execCommand: vi.fn(),
    querySelector: vi.fn((selector: string) => elements.get(selector) ?? null)
  });
  vi.stubGlobal("navigator", {});

  await import(`${new URL("../src/public/app.js", import.meta.url).href}?test=${Date.now()}-${Math.random()}`);

  return elements;
}

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("server", () => {
  it("returns service health", async () => {
    const server = buildServer();

    const response = await server.inject({
      method: "GET",
      url: "/health"
    });

    expect(response.statusCode).toBe(200);
    expect(response.json()).toEqual({
      ok: true,
      service: "oraculo-tonalli-xolosarmy"
    });
  });

  it("serves the payment-gated Tonalli shell", async () => {
    const server = buildServer();

    const response = await server.inject({
      method: "GET",
      url: "/"
    });

    expect(response.statusCode).toBe(200);
    expect(response.body).toContain("Descubrir mi Tonalli");
    expect(response.body).toContain(
      "El tonalpohualli es una cuenta sagrada mesoamericana de 260 días."
    );
    expect(response.body).toContain("La lectura completa se desbloquea con XEC.");
    expect(response.body).toContain("Activar lectura completa con XEC");
    expect(response.body).toContain("5,000 XEC");
    expect(response.body).toContain("ecash:qq7qn90ev23ecastqmn8as00u8mcp4tzsspvt5dtlk");
    expect(response.body).toContain("Copiar dirección");
    expect(response.body).toContain('id="payment-qr-container"');
    expect(response.body).toContain('src="/payment-qr.svg"');
    expect(response.body).toContain("Escanea este código QR desde tu wallet eCash.");
    expect(response.body).toContain("TXID o comprobante de pago");
    expect(response.body).toContain("id=\"payment-txid\"");
    expect(response.body).toContain(
      "En esta versión MVP, la verificación del pago es manual. La verificación automática con"
    );
    expect(response.body).toContain(
      "Lectura simbólica basada en la correlación Caso/Nicholson."
    );
    expect(response.body).toContain("Continuar hacia xolosArmy.xyz");
  });

  it("serves Google-readable sitemap and robots files from the domain root", async () => {
    const server = buildServer();

    const sitemapResponse = await server.inject({
      method: "GET",
      url: "/sitemap.xml"
    });
    const robotsResponse = await server.inject({
      method: "GET",
      url: "/robots.txt"
    });

    expect(sitemapResponse.statusCode).toBe(200);
    expect(sitemapResponse.headers["content-type"]).toContain("application/xml");
    expect(sitemapResponse.body).toBe(`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://tonalli.xolosarmy.xyz/</loc>
    <lastmod>2026-06-13</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
`);
    expect(robotsResponse.statusCode).toBe(200);
    expect(robotsResponse.body).toBe(`User-agent: *
Allow: /

Sitemap: https://tonalli.xolosarmy.xyz/sitemap.xml
`);
  });

  it("renders a manual review confirmation when payment is reported without TXID", async () => {
    const elements = await loadPaymentScript();

    elements.get("#payment-confirm-button")?.listeners.click();

    expect(elements.get("#status")?.textContent).toBe("Pago reportado para revisión manual.");
    expect(elements.get("#full-reading-block")?.hidden).toBe(false);
    expect(elements.get("#payment-panel")?.hidden).toBe(true);
  });

  it("renders a TXID confirmation when payment is reported with TXID text", async () => {
    const elements = await loadPaymentScript();

    const txidInput = elements.get("#payment-txid");
    txidInput!.value = "  sample-txid  ";
    elements.get("#payment-confirm-button")?.listeners.click();

    expect(elements.get("#status")?.textContent).toBe("Pago reportado. TXID recibido.");
    expect(elements.get("#full-reading-block")?.hidden).toBe(false);
    expect(elements.get("#payment-panel")?.hidden).toBe(true);
  });

  it("serves a real eCash payment QR SVG", async () => {
    const server = buildServer();

    const response = await server.inject({
      method: "GET",
      url: "/payment-qr.svg"
    });

    expect(response.statusCode).toBe(200);
    expect(response.headers["content-type"]).toContain("image/svg+xml");
    expect(response.body).toContain("<svg");
    expect(response.body).toContain("<path");
  });

  it("returns a Tonalli result and reading for a valid date", async () => {
    const server = buildServer();

    const response = await server.inject({
      method: "GET",
      url: "/api/tonalli/1992-03-18"
    });

    const body = response.json();

    expect(response.statusCode).toBe(200);
    expect(body.ok).toBe(true);
    expect(body.result.tonalName).toBe("13 Ollin");
    expect(body.result.trecenaName).toBe("1 Coatl");
    expect(body.reading).toContain("Lectura cultural para 1992-03-18");
  });

  it("returns HTTP 400 for an invalid date", async () => {
    const server = buildServer();

    const response = await server.inject({
      method: "GET",
      url: "/api/tonalli/1992-02-31"
    });

    const body = response.json();

    expect(response.statusCode).toBe(400);
    expect(body.ok).toBe(false);
    expect(body.error).toMatch(/Invalid Gregorian date/);
  });
});
