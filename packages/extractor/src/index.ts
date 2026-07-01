import path from "node:path";
import { writeFile } from "node:fs/promises";

import { extractPdf } from "./services/extractor.service";

async function main() {
  const pdf = path.resolve("epds/epd-australasia-com-wp-content-uploads-2023-08-epd-ies-0009353-003-hallett-ready-mix-concrete-2026-05-04-pdf.pdf");

  const result = await extractPdf(pdf);

  await writeFile(
    "data/sample.json",
    JSON.stringify(result, null, 2),
    "utf8"
  );

  console.log("Extraction completed.");
}

main().catch(console.error);