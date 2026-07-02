interface DataNoticeProps {
  tone?: "flag" | "clay";
  children: React.ReactNode;
}

/** Small stamped-note style callout, used to explain data gaps inline. */
export function DataNotice({ tone = "flag", children }: DataNoticeProps) {
  const colorClass = tone === "flag" ? "border-flag/40 bg-flag-soft text-flag" : "border-clay/40 bg-clay-soft text-clay";

  return (
    <div className={`flex gap-2.5 rounded-md border px-3.5 py-2.5 text-xs leading-relaxed ${colorClass}`}>
      <span aria-hidden className="font-mono text-sm leading-none">!</span>
      <p>{children}</p>
    </div>
  );
}
