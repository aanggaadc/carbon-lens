import type { Product } from "@/types/product";
import { formatDate } from "@/lib/format";

interface MetadataCardProps {
  product: Product;
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4 py-1.5 border-b border-rule/60 last:border-none">
      <dt className="text-ink-muted">{label}</dt>
      <dd className="text-right text-ink">{value}</dd>
    </div>
  );
}

export function MetadataCard({ product }: MetadataCardProps) {
  return (
    <dl className="text-sm">
      <Row label="Declaration No." value={product.declarationNumber} />
      <Row label="Program operator" value={product.programOperator} />
      <Row label="Standard" value={product.standard} />
      <Row label="Issued" value={formatDate(product.issueDate)} />
      <Row label="Valid until" value={formatDate(product.validUntil)} />
      <Row label="Declared unit" value={product.declaredUnit} />
      <Row
        label="Compressive strength"
        value={
          product.compressiveStrength !== null
            ? `${product.compressiveStrength} ${product.compressiveStrengthUnit ?? ""}`.trim()
            : "Not specified"
        }
      />
      <Row label="Manufacturing location" value={product.manufacturingLocation} />
    </dl>
  );
}
