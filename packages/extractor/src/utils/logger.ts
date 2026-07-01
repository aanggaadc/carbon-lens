import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

export async function saveDebugFile(
  filename: string,
  content: string
) {
  await mkdir("logs", {
    recursive: true,
  });

  await writeFile(
    path.join("logs", filename),
    content,
    "utf8"
  );
}