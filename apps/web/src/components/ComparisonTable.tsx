import type { Product } from "@/types/product";
import { STAGE_ORDER } from "@/lib/stages";
import { formatGWP } from "@/lib/format";
import { ProvenanceStamp } from "./ProvenanceStamp";

interface ComparisonTableProps {
  products: Product[];
}

export function ComparisonTable({ products }: ComparisonTableProps) {
  const stagesPresent = STAGE_ORDER.filter((stage) => products.some((p) => p.stages.some((s) => s.stage === stage)));

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse text-sm min-w-[640px]">
        <thead>
          <tr className="border-b border-rule text-left font-mono text-[10px] uppercase tracking-[0.1em] text-ink-muted">
            <th className="py-2 pr-3 font-medium sticky left-0 bg-paper">Module</th>
            {products.map((p) => (
              <th key={p.id} className="py-2 px-3 font-medium text-right whitespace-nowrap">
                {p.declarationNumber}
              </th>
            ))}
          </tr>
          <tr className="border-b border-rule text-left">
            <th className="py-1 pr-3" />
            {products.map((p) => (
              <th key={p.id} className="py-1 px-3 text-right font-display font-normal text-ink text-[13px] normal-case whitespace-nowrap">
                {p.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {stagesPresent.map((stage) => (
            <tr key={stage} className="border-b border-rule/70">
              <td className="py-2 pr-3 font-mono text-ink sticky left-0 bg-paper">{stage}</td>
              {products.map((p) => {
                const s = p.stages.find((st) => st.stage === stage);
                if (!s) {
                  return (
                    <td key={p.id} className="py-2 px-3 text-right text-ink-muted">
                      —
                    </td>
                  );
                }
                const notDeclared = s.status === "NOT_DECLARED";
                const isCredit = stage === "D" && s.value !== null && s.value < 0;
                return (
                  <td key={p.id} className="py-2 px-3">
                    <div className="flex items-center justify-end gap-2">
                      <span
                        className={`font-mono tabular-nums ${
                          notDeclared ? "text-ink-muted" : isCredit ? "text-clay" : "text-ink"
                        }`}
                      >
                        {notDeclared ? "ND" : formatGWP(s.value)}
                      </span>
                      {!notDeclared && <ProvenanceStamp provenance={s.provenance} sourceFileName={p.sourceFileName} />}
                    </div>
                  </td>
                );
              })}
            </tr>
          ))}
          <tr className="border-t-2 border-ink/20">
            <td className="py-2.5 pr-3 font-mono text-ink font-medium sticky left-0 bg-paper">Total declared</td>
            {products.map((p) => (
              <td key={p.id} className="py-2.5 px-3 text-right font-mono font-medium tabular-nums text-ink">
                {formatGWP(p.totalDeclaredGWP)}
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
}
