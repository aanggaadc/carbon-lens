import Link from "next/link";
import { getAllProducts, getProductsByIds } from "@/lib/data";
import { ComparisonTable } from "@/components/ComparisonTable";
import { DataNotice } from "@/components/DataNotice";
import { analyzeComparability } from "@/lib/comparability";
import { formatGWP } from "@/lib/format";

interface ComparePageProps {
  searchParams: Promise<{ ids?: string }>;
}

export default async function ComparePage({ searchParams }: ComparePageProps) {
  const { ids } = await searchParams;
  const requestedIds = ids ? ids.split(",").filter(Boolean) : [];
  const [products, allProducts] = await Promise.all([getProductsByIds(requestedIds), getAllProducts()]);
  const comparability = analyzeComparability(products);

  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <Link href="/" className="font-mono text-[11px] uppercase tracking-[0.08em] text-ink-muted hover:text-teal transition-colors">
        ← Register
      </Link>

      <h1 className="mt-4 font-display text-3xl text-ink leading-tight">Comparison</h1>
      <p className="mt-2 text-sm text-ink-muted max-w-2xl">
        GWPt by lifecycle module, side by side. Tap a provenance chip to trace a value back to its source page.
      </p>

      {products.length === 0 ? (
        <div className="mt-8 rounded-lg border border-dashed border-rule p-8 text-center">
          <p className="text-sm text-ink-muted mb-4">No products selected yet.</p>
          <Link
            href="/"
            className="inline-block rounded-full bg-teal px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.08em] text-white hover:bg-teal/90 transition-colors"
          >
            Browse the register →
          </Link>
        </div>
      ) : (
        <>
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
            {products.map((p) => (
              <div key={p.id} className="rounded-lg border border-rule bg-surface p-4">
                <p className="font-mono text-[10px] uppercase tracking-[0.08em] text-ink-muted mb-1">
                  {p.declarationNumber}
                </p>
                <h2 className="font-display text-base text-ink leading-snug">
                  <Link href={`/products/${p.id}`} className="hover:text-teal transition-colors">
                    {p.name}
                  </Link>
                </h2>
                <p className="text-xs text-ink-muted mt-1">{p.manufacturer}</p>
                <p className="text-xs text-ink-muted">{p.manufacturingLocation}</p>
                <p className="font-mono text-xl text-ink mt-3 tabular-nums">
                  {formatGWP(p.productionGWP)}
                  <span className="text-xs text-ink-muted ml-1">kg CO2e (A1-A3)</span>
                </p>
                <p className="font-mono text-xs text-ink-muted mt-1">
                  {p.compressiveStrength !== null
                    ? `${p.compressiveStrength} ${p.compressiveStrengthUnit ?? ""}`.trim()
                    : "Strength not specified"}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8 space-y-3">
            <DataNotice>
              Cells marked <span className="font-mono">ND</span> mean that stage was{" "}
              <strong>not declared</strong> in the source EPD — an unknown value, not a zero. It is left out of
              &ldquo;Total declared&rdquo; below, so products with different sets of declared stages aren&apos;t
              being reduced to one directly comparable number.
            </DataNotice>
            {!comparability.fullyComparable && (
              <DataNotice tone="clay">
                These products don&apos;t declare the same lifecycle stages ({comparability.unevenStages.join(", ")}{" "}
                {comparability.unevenStages.length > 1 ? "are" : "is"} missing for at least one of them). Their
                &ldquo;Total declared&rdquo; figures are therefore not a strict apples-to-apples comparison — check
                the stage-by-stage rows instead.
              </DataNotice>
            )}
          </div>

          <div className="mt-4 rounded-lg border border-rule bg-surface p-5">
            <ComparisonTable products={products} />
          </div>
        </>
      )}

      {allProducts.length > products.length && (
        <div className="mt-8">
          <h2 className="font-mono text-[11px] uppercase tracking-[0.08em] text-ink-muted mb-3">
            Add more products
          </h2>
          <div className="flex flex-wrap gap-2">
            {allProducts
              .filter((p) => !products.some((sel) => sel.id === p.id))
              .map((p) => (
                <Link
                  key={p.id}
                  href={`/compare?ids=${[...products.map((sel) => sel.id), p.id].join(",")}`}
                  className="rounded-full border border-rule px-3 py-1 font-mono text-[11px] text-ink-muted hover:border-teal hover:text-teal transition-colors"
                >
                  + {p.declarationNumber}
                </Link>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}
