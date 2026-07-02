import { getAllProducts } from "@/lib/data";
import { ProductBrowser } from "@/components/ProductBrowser";

export default async function HomePage() {
  const products = await getAllProducts();

  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <div className="mb-10 max-w-2xl">
        <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-teal mb-2">
          Environmental Product Declarations
        </p>
        <h1 className="font-display text-3xl sm:text-4xl leading-tight text-ink">
          Compare embodied carbon across concrete products.
        </h1>
        <p className="mt-3 text-sm text-ink-muted leading-relaxed">
          Every figure below is extracted from a published EPD and traceable to its source page.
          Select products to compare their GWPt across lifecycle stages, or open one to inspect it in full.
        </p>
      </div>

      <ProductBrowser products={products} />
    </div>
  );
}
