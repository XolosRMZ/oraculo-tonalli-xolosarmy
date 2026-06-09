import { describe, expect, it } from "vitest";

import { buildTonalReading } from "../src/buildReading.js";
import { calculateTonalpohualli } from "../src/tonalpohualli.js";

describe("buildTonalReading", () => {
  it("builds a deterministic cultural reading for 1992-03-18", () => {
    const result = calculateTonalpohualli("1992-03-18");
    const reading = buildTonalReading(result);

    expect(result.tonalName).toBe("13 Ollin");
    expect(result.trecenaName).toBe("1 Coatl");
    expect(reading).toContain("Movimiento");
    expect(reading).toContain("Serpiente");
    expect(reading).toContain("xolosArmy");
  });
});
