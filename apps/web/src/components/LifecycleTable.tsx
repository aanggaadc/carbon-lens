import type { StageImpact } from "@/types/product";
import { STAGE_GROUP, STAGE_LABEL } from "@/lib/stages";
import { formatGWP } from "@/lib/format";
import { ProvenanceStamp } from "./ProvenanceStamp";

interface LifecycleTableProps {
  stages: StageImpact[];
  sourceFileName: string;
}

export function LifecycleTable({ stages, sourceFileName }: LifecycleTableProps) {
  return (
    <table className="w-full border-collapse text-sm">
      <thead>
        <tr className="border-b border-rule text-left font-mono text-[10px] uppercase tracking-[0.1em] text-ink-muted">
          <th className="py-2 pr-3 font-medium">Module</th>
          <th className="py-2 pr-3 font-medium">Description</th>
          <th className="py-2 pr-3 font-medium text-right">GWPt</th>
          <th className="py-2 font-medium">Provenance</th>
        </tr>
      </thead>
      <tbody>
        {stages.map((s) => {
          const isCredit = s.stage === "D" && s.value !== null && s.value < 0;
          const notDeclared = s.status === "NOT_DECLARED";

          return (
            <tr key={s.stage} className="border-b border-rule/70 last:border-none">
              <td className="py-2 pr-3 font-mono text-ink whitespace-nowrap">
                <span className="inline-flex items-center gap-1.5">
                  {s.stage}
                  <span className="text-[10px] text-ink-muted font-sans">{STAGE_GROUP[s.stage] ?? ""}</span>
                </span>
              </td>
              <td className="py-2 pr-3 text-ink-muted">{STAGE_LABEL[s.stage] ?? "—"}</td>
              <td
                className={`py-2 pr-3 text-right font-mono tabular-nums ${
                  notDeclared ? "text-ink-muted" : isCredit ? "text-clay" : "text-ink"
                }`}
              >
                {notDeclared ? "ND" : `${formatGWP(s.value)} ${s.unit}`}
              </td>
              <td className="py-2">
                {notDeclared ? (
                  <span className="inline-flex items-center gap-1 rounded-full border border-flag/40 bg-flag-soft px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.08em] text-flag">
                    Not declared
                  </span>
                ) : (
                  <ProvenanceStamp provenance={s.provenance} sourceFileName={sourceFileName} />
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
