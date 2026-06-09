import { describe, expect, it } from "vitest";

import { calculateTonalpohualli, mod, signs } from "../src/tonalpohualli.js";

describe("mod", () => {
  it("returns positive mathematical modulo values", () => {
    expect(mod(-1, 20)).toBe(19);
    expect(mod(-21, 20)).toBe(19);
    expect(mod(21, 20)).toBe(1);
  });
});

describe("calculateTonalpohualli", () => {
  it("returns 1 Coatl for the Caso/Nicholson anchor date", () => {
    const result = calculateTonalpohualli("1521-08-23");

    expect(result.inputDate).toBe("1521-08-23");
    expect(result.deltaDaysFromAnchor).toBe(0);
    expect(result.tonalNumber).toBe(1);
    expect(result.tonalSignIndex).toBe(4);
    expect(result.tonalSignNahuatl).toBe("Coatl");
    expect(result.tonalSignSpanish).toBe("Serpiente");
    expect(result.tonalName).toBe("1 Coatl");
  });

  it("returns 13 Ollin and trecena 1 Cuetzpalin for 1992-03-18", () => {
    const result = calculateTonalpohualli("1992-03-18");

    expect(result.tonalNumber).toBe(13);
    expect(result.tonalSignIndex).toBe(16);
    expect(result.tonalSignNahuatl).toBe("Ollin");
    expect(result.tonalSignSpanish).toBe("Movimiento");
    expect(result.tonalName).toBe("13 Ollin");
    expect(result.trecenaNumber).toBe(1);
    expect(result.trecenaSignIndex).toBe(3);
    expect(result.trecenaSignNahuatl).toBe("Cuetzpalin");
    expect(result.trecenaSignSpanish).toBe("Lagartija");
    expect(result.trecenaName).toBe("1 Cuetzpalin");
  });

  it("returns defined tonal data for 1492-10-12", () => {
    const result = calculateTonalpohualli("1492-10-12");

    expect(result.tonalNumber).toBeGreaterThanOrEqual(1);
    expect(result.tonalNumber).toBeLessThanOrEqual(13);
    expect(result.tonalSignIndex).toBeGreaterThanOrEqual(0);
    expect(result.tonalSignIndex).toBeLessThan(signs.length);
    expect(Object.values(result).every((value) => value !== undefined)).toBe(true);
  });

  it("throws for impossible dates", () => {
    expect(() => calculateTonalpohualli("1992-02-31")).toThrow(/Invalid Gregorian date/);
    expect(() => calculateTonalpohualli("2026-13-01")).toThrow(/Invalid month/);
  });

  it("throws for malformed input", () => {
    expect(() => calculateTonalpohualli("18/03/1992")).toThrow(/Expected YYYY-MM-DD/);
  });
});
