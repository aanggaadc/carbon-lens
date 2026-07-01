import { ai } from "./gemini.service";
import { validateExtraction } from "./validator.service";

import { EXTRACTION_PROMPT } from "../prompts/extraction.prompt";

import { saveDebugFile } from "../utils/logger";

import { ProductEPDJsonSchema } from "../schemas/epd.schema";

import { retry } from "./retry.service";

export async function extractPdf(pdfPath: string) {
  const pdf = await retry(() =>
    ai.files.upload({
      file: pdfPath,
      config: {
        mimeType: "application/pdf",
        displayName: pdfPath.split("/").pop(),
      },
    }),
  );

  try {
    console.log("Generating...");

    const response = await retry(() =>
      ai.models.generateContent({
        model: "gemini-2.5-flash",

        contents: [
          {
            text: EXTRACTION_PROMPT,
          },
          {
            fileData: {
              fileUri: pdf.uri,
              mimeType: pdf.mimeType,
            },
          },
        ],

        config: {
          temperature: 0,
          responseMimeType: "application/json",
          responseSchema: ProductEPDJsonSchema,
        },
      }),
    );

    console.log("DONE");

    const text = response.text!;

    await saveDebugFile("gemini-response.json", text);

    const jsonParse = JSON.parse(text);

    const json = validateExtraction(jsonParse);

    json.id = crypto.randomUUID();
    json.extraction = {
      model: "gemini-2.5-flash",
      timestamp: new Date().toISOString(),
      warnings: [],
    };

    return json;
  } catch (err) {
    await saveDebugFile("gemini-error.txt", String(err));

    throw err;
  }
}
