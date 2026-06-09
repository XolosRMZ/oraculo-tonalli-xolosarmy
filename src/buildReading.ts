import type { TonalpohualliResult } from "./tonalpohualli.js";
import { ritualNumbers } from "./data/numbers.js";
import { tonalSigns } from "./data/signs.js";
import { trecenas } from "./data/trecenas.js";

function requireEntry<T>(entry: T | undefined, label: string): T {
  if (!entry) {
    throw new Error(`Missing static reading data for ${label}.`);
  }

  return entry;
}

export function buildTonalReading(result: TonalpohualliResult): string {
  const numberReading = requireEntry(
    ritualNumbers.find((entry) => entry.number === result.tonalNumber),
    `number ${result.tonalNumber}`
  );
  const signReading = requireEntry(
    tonalSigns.find((entry) => entry.nahuatl === result.tonalSignNahuatl),
    `sign ${result.tonalSignNahuatl}`
  );
  const trecenaReading = requireEntry(
    trecenas.find((entry) => entry.startSignNahuatl === result.trecenaSignNahuatl),
    `trecena ${result.trecenaSignNahuatl}`
  );

  return [
    `Lectura cultural para ${result.inputDate}`,
    `Tonal: ${result.tonalName} (${signReading.spanish})`,
    `Numero ${numberReading.number}: ${numberReading.meaning} Energia: ${numberReading.energy} Reto: ${numberReading.challenge}`,
    `Signo ${signReading.nahuatl} - ${signReading.spanish}: ${signReading.shortMeaning} ${signReading.longMeaning}`,
    `Dones: ${signReading.gifts.join(", ")}.`,
    `Desafios: ${signReading.challenges.join(", ")}.`,
    `Lectura xolosArmy: ${signReading.xolosArmyInterpretation}`,
    `Trecena: ${result.trecenaName} (${trecenaReading.startSignSpanish}) - ${trecenaReading.theme}. ${trecenaReading.meaning} Reto: ${trecenaReading.challenge}`,
    `Trecena xolosArmy: ${trecenaReading.xolosArmyInterpretation}`,
    "Cierre xolosArmy: Esta lectura se ofrece como simbolo cultural del tiempo sagrado, no como profecia absoluta. Que sirva para recordar memoria, identidad, movimiento, linaje y responsabilidad comunitaria dentro de xolosArmy Network."
  ].join("\n\n");
}
