import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllProducts, getProductById } from "@/lib/data";
import { MetadataCard } from "@/components/MetadataCard";
import { LifecycleTable } from "@/components/LifecycleTable";
import { ImpactChart } from "@/components/ImpactChart";
import { DataNotice } from "@/components/DataNotice";
import { formatGWP } from "@/lib/format";

export async function generateStaticParams() {
  const products = await getAllProducts();
  return products.map((p) => ({ id: p.id }));
}

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  const product = await getProductById(id);

  if (!product) notFound();

  return (
    <div className="mx-auto max-w-5xl px-6 py-10">
      <Link href="/" className="font-mono text-[11px] uppercase tracking-[0.08em] text-ink-muted hover:text-teal transition-colors">
        ← Register
      </Link>

      <div className="mt-4 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-teal mb-1">
            {product.declarationNumber} · {product.manufacturer}
          </p>
          <h1 className="font-display text-3xl text-ink leading-tight">{product.name}</h1>
        </div>
        <Link
          href={`/compare?ids=${product.id}`}
          className="rounded-full border border-teal px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.08em] text-teal hover:bg-teal-soft transition-colors whitespace-nowrap"
        >
          Add to compare →
        </Link>
      </div>

      <p className="mt-4 max-w-3xl text-sm leading-relaxed text-ink-muted">{product.description}</p>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-8">
        <div className="space-y-8">
          <section className="rounded-lg border border-rule bg-surface p-5">
            <h2 className="font-display text-lg text-ink mb-1">Lifecycle GWPt</h2>
            <p className="text-xs text-ink-muted mb-4">
              Global Warming Potential (total), kg CO2e per {product.declaredUnit}.
            </p>
            <ImpactChart stages={product.stages} />
          </section>

          <section className="rounded-lg border border-rule bg-surface p-5">
            <h2 className="font-display text-lg text-ink mb-4">Stage-by-stage detail</h2>
            {product.notDeclaredCount > 0 && (
              <div className="mb-4">
                <DataNotice>
                  <strong>{product.notDeclaredCount}</strong> stage{product.notDeclaredCount > 1 ? "s" : ""} marked{" "}
                  <span className="font-mono">ND</span> below {product.notDeclaredCount > 1 ? "were" : "was"} not
                  declared in the source EPD — that means the value is unknown, not that its impact is zero. Totals
                  on this page only sum declared stages, so this product&apos;s total isn&apos;t directly comparable
                  to a product that declared more (or fewer) stages.
                </DataNotice>
              </div>
            )}
            <LifecycleTable stages={product.stages} sourceFileName={product.sourceFileName} />
          </section>
        </div>

        <aside className="space-y-6">
          <section className="rounded-lg border border-rule bg-surface p-5">
            <h2 className="font-mono text-[10px] uppercase tracking-[0.1em] text-ink-muted mb-3">
              Production stage (A1-A3)
            </h2>
            <p className="font-mono text-3xl text-ink tabular-nums">
              {formatGWP(product.productionGWP)}
              <span className="text-sm text-ink-muted ml-1">kg CO2e</span>
            </p>
          </section>

          <section className="rounded-lg border border-rule bg-surface p-5">
            <h2 className="font-mono text-[10px] uppercase tracking-[0.1em] text-ink-muted mb-3">Declaration</h2>
            <MetadataCard product={product} />
          </section>
        </aside>
      </div>
    </div>
  );
}
