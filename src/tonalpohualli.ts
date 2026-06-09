export type TonalpohualliSign = {
  readonly nahuatl: string;
  readonly spanish: string;
};

export type TonalpohualliResult = {
  inputDate: string;
  deltaDaysFromAnchor: number;
  tonalNumber: number;
  tonalSignIndex: number;
  tonalSignNahuatl: string;
  tonalSignSpanish: string;
  tonalName: string;
  trecenaNumber: number;
  trecenaSignIndex: number;
  trecenaSignNahuatl: string;
  trecenaSignSpanish: string;
  trecenaName: string;
};

const DAY_MS = 86_400_000;
const INPUT_DATE_PATTERN = /^(\d{4})-(\d{2})-(\d{2})$/;

// Alfonso Caso / Nicholson correlation used by this engine:
// August 23, 1521 in the proleptic Gregorian calendar is 1 Coatl.
// The same historical day is August 13, 1521 in the Julian calendar.
const anchorDateUtcNoon = Date.UTC(1521, 7, 23, 12);
const anchorNumber = 1;
const anchorSignIndex = 4; // Coatl, zero-based.

export const signs = [
  { nahuatl: "Cipactli", spanish: "Caiman" },
  { nahuatl: "Ehecatl", spanish: "Viento" },
  { nahuatl: "Calli", spanish: "Casa" },
  { nahuatl: "Cuetzpalin", spanish: "Lagartija" },
  { nahuatl: "Coatl", spanish: "Serpiente" },
  { nahuatl: "Miquiztli", spanish: "Muerte" },
  { nahuatl: "Mazatl", spanish: "Venado" },
  { nahuatl: "Tochtli", spanish: "Conejo" },
  { nahuatl: "Atl", spanish: "Agua" },
  { nahuatl: "Itzcuintli", spanish: "Perro" },
  { nahuatl: "Ozomatli", spanish: "Mono" },
  { nahuatl: "Malinalli", spanish: "Hierba" },
  { nahuatl: "Acatl", spanish: "Cana" },
  { nahuatl: "Ocelotl", spanish: "Jaguar" },
  { nahuatl: "Cuauhtli", spanish: "Aguila" },
  { nahuatl: "Cozcacuauhtli", spanish: "Buitre" },
  { nahuatl: "Ollin", spanish: "Movimiento" },
  { nahuatl: "Tecpatl", spanish: "Pedernal" },
  { nahuatl: "Quiahuitl", spanish: "Lluvia" },
  { nahuatl: "Xochitl", spanish: "Flor" }
] as const satisfies readonly TonalpohualliSign[];

// JavaScript/TypeScript `%` is remainder, not mathematical modulo.
// This keeps cycle indexes valid for negative deltas before the 1521 anchor.
export const mod = (n: number, m: number): number => ((n % m) + m) % m;

function parseUtcNoon(inputDate: string): number {
  const match = INPUT_DATE_PATTERN.exec(inputDate);
  if (!match) {
    throw new Error(`Invalid date format: "${inputDate}". Expected YYYY-MM-DD.`);
  }

  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);

  if (month < 1 || month > 12) {
    throw new Error(`Invalid month in "${inputDate}". Month must be 01 through 12.`);
  }

  if (day < 1 || day > 31) {
    throw new Error(`Invalid day in "${inputDate}". Day must be 01 through 31.`);
  }

  // Parse as UTC at noon rather than local midnight so browser/server timezone
  // offsets and daylight-saving transitions cannot shift the calendar date.
  const utcNoon = Date.UTC(year, month - 1, day, 12);
  const parsed = new Date(utcNoon);

  if (
    parsed.getUTCFullYear() !== year ||
    parsed.getUTCMonth() !== month - 1 ||
    parsed.getUTCDate() !== day
  ) {
    throw new Error(`Invalid Gregorian date: "${inputDate}".`);
  }

  return utcNoon;
}

export function calculateTonalpohualli(inputDate: string): TonalpohualliResult {
  const inputUtcNoon = parseUtcNoon(inputDate);
  const deltaDaysFromAnchor = Math.round((inputUtcNoon - anchorDateUtcNoon) / DAY_MS);

  // The tonalpohualli advances one step per day through two independent cycles:
  // a 13-number cycle and a 20-sign cycle. Both are zero-based internally.
  const tonalNumber = mod(anchorNumber - 1 + deltaDaysFromAnchor, 13) + 1;
  const tonalSignIndex = mod(anchorSignIndex + deltaDaysFromAnchor, signs.length);
  const tonalSign = signs[tonalSignIndex];

  // A trecena is the 13-day period named for its first day, found by stepping
  // backward tonalNumber - 1 days from the current tonal date.
  const trecenaOffset = tonalNumber - 1;
  const trecenaSignIndex = mod(tonalSignIndex - trecenaOffset, signs.length);
  const trecenaSign = signs[trecenaSignIndex];
  const trecenaNumber = 1;

  return {
    inputDate,
    deltaDaysFromAnchor,
    tonalNumber,
    tonalSignIndex,
    tonalSignNahuatl: tonalSign.nahuatl,
    tonalSignSpanish: tonalSign.spanish,
    tonalName: `${tonalNumber} ${tonalSign.nahuatl}`,
    trecenaNumber,
    trecenaSignIndex,
    trecenaSignNahuatl: trecenaSign.nahuatl,
    trecenaSignSpanish: trecenaSign.spanish,
    trecenaName: `${trecenaNumber} ${trecenaSign.nahuatl}`
  };
}
