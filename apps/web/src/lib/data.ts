import "server-only";
import fs from "node:fs/promises";
import path from "node:path";
import type { EPDRecord } from "@/types/epd";
import type { Product } from "@/types/product";
import { normalizeEPD } from "./normalize";

// The extraction engine writes one JSON file per EPD into /data at the
// repo root (carbon-lens/data). This app only ever reads from there —
// never from the extractor package, and never by calling Gemini.
const DATA_DIR = path.resolve(process.cwd(), "..", "..", "data");

let cache: Product[] | null = null;

async function readAllRecords(): Promise<EPDRecord[]> {
  const entries = await fs.readdir(DATA_DIR, { withFileTypes: true });
  const jsonFiles = entries.filter((e) => e.isFile() && e.name.endsWith(".json"));

  const records = await Promise.all(
    jsonFiles.map(async (file) => {
      const raw = await fs.readFile(path.join(DATA_DIR, file.name), "utf-8");
      try {
        return JSON.parse(raw) as EPDRecord;
      } catch {
        throw new Error(`Failed to parse ${file.name} as JSON`);
      }
    })
  );

  return records;
}

/** All products, normalized, sorted by manufacturer then name. */
export async function getAllProducts(): Promise<Product[]> {
  if (cache) return cache;

  const records = await readAllRecords();
  const products = records.map(normalizeEPD).sort((a, b) => {
    const byManufacturer = a.manufacturer.localeCompare(b.manufacturer);
    return byManufacturer !== 0 ? byManufacturer : a.name.localeCompare(b.name);
  });

  cache = products;
  return products;
}

export async function getProductById(id: string): Promise<Product | undefined> {
  const products = await getAllProducts();
  return products.find((p) => p.id === id);
}

export async function getProductsByIds(ids: string[]): Promise<Product[]> {
  const products = await getAllProducts();
  const idSet = new Set(ids);
  return products.filter((p) => idSet.has(p.id));
}
