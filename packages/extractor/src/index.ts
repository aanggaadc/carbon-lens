import { mkdir, readdir, writeFile } from "node:fs/promises";
import path from "node:path";

import { extractPdf } from "./services/extractor.service";

async function main() {
  const inputDir = path.resolve("epds");
  const outputDir = path.resolve("data");

  await mkdir(outputDir, {
    recursive: true,
  });

  const files = await readdir(inputDir);

  const pdfFiles = files.filter((file) =>
    file.toLowerCase().endsWith(".pdf")
  );

  console.log(`Found ${pdfFiles.length} PDF(s).\n`);

  let success = 0;
  let failed = 0;

  for (const file of pdfFiles) {
    const pdfPath = path.join(inputDir, file);

    const outputFile = file.replace(/\.pdf$/i, ".json");

    const outputPath = path.join(
      outputDir,
      outputFile
    );

    console.log(`Extracting ${file}...`);

    try {
      const result = await extractPdf(pdfPath);

      await writeFile(
        outputPath,
        JSON.stringify(result, null, 2),
        "utf8"
      );

      success++;

      console.log(`✓ Saved ${outputFile}\n`);
    } catch (error) {
      failed++;

      console.error(`✗ Failed ${file}`);
      console.error(error);
      console.log();
    }
  }

  console.log("===================================");

  console.log("Extraction Complete");

  console.log(`Success : ${success}`);

  console.log(`Failed  : ${failed}`);

  console.log(`Output  : ${outputDir}`);

  console.log("===================================");
}

main().catch(console.error);