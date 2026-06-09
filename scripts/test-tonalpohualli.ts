import { calculateTonalpohualli } from "../src/tonalpohualli.js";

for (const inputDate of ["1521-08-23", "1992-03-18", "1492-10-12"]) {
  console.log(inputDate, calculateTonalpohualli(inputDate));
}
