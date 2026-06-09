import { buildTonalReading } from "../src/buildReading.js";
import { calculateTonalpohualli } from "../src/tonalpohualli.js";

const inputDate = process.argv[2];

if (!inputDate) {
  console.error("Usage: npm run read:tonalli -- YYYY-MM-DD");
  process.exit(1);
}

const result = calculateTonalpohualli(inputDate);
const reading = buildTonalReading(result);

console.log(`Tonal: ${result.tonalName}`);
console.log(`Trecena: ${result.trecenaName}`);
console.log("");
console.log(reading);
