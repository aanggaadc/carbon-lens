"use client";

import { useId, useState } from "react";
import type { EPDProvenance } from "@/types/epd";

interface ProvenanceStampProps {
  provenance: EPDProvenance;
  sourceFileName: string;
}

/**
 * A small verification tag attached to a GWPt value. Click to unfold
 * the underlying provenance: source page, section, table and the raw
 * extracted text — so every number in the app can be traced back to
 * the original EPD document.
 */
export function ProvenanceStamp({ provenance, sourceFileName }: ProvenanceStampProps) {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  return (
    <div className="relative inline-block">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center gap-1 rounded-full border border-teal/40 bg-teal-soft px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.08em] text-teal hover:border-teal transition-colors cursor-pointer"
        title="View provenance"
      >
        <span aria-hidden className="inline-block h-1.5 w-1.5 rounded-full bg-teal" />
        p.{provenance.page ?? "—"}
      </button>

      {open && (
        <div
          id={panelId}
          role="dialog"
          className="absolute z-30 mt-2 w-72 -translate-x-1/2 left-1/2 rounded-md border border-rule bg-surface shadow-lg shadow-ink/5"
        >
          <div className="stamp-perforation h-2 rounded-t-md" />
          <div className="p-3 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-teal">
                Verified value
              </span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="text-ink-muted hover:text-ink text-xs cursor-pointer"
                aria-label="Close provenance"
              >
                ✕
              </button>
            </div>

            <dl className="space-y-1.5 text-xs">
              <div className="flex justify-between gap-3">
                <dt className="text-ink-muted">Page</dt>
                <dd className="font-mono text-ink">{provenance.page ?? "—"}</dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt className="text-ink-muted shrink-0">Section</dt>
                <dd className="text-right text-ink">{provenance.section ?? "—"}</dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt className="text-ink-muted shrink-0">Table</dt>
                <dd className="text-right text-ink">{provenance.table ?? "—"}</dd>
              </div>
            </dl>

            {provenance.rawText && (
              <div className="pt-1 border-t border-rule">
                <p className="text-ink-muted text-[10px] uppercase tracking-[0.08em] mb-1">Raw extracted text</p>
                <p className="font-mono text-[11px] leading-relaxed text-ink break-words">{provenance.rawText}</p>
              </div>
            )}

            <p className="pt-1 text-[10px] text-ink-muted truncate" title={sourceFileName}>
              Source: {sourceFileName}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
