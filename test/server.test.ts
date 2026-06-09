import { describe, expect, it } from "vitest";

import { buildServer } from "../src/server.js";

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
