export function formatGWP(value: number | null): string {
  if (value === null) return "—";
  const sign = value > 0 ? "+" : "";
  return `${sign}${value.toLocaleString("en-AU", { maximumFractionDigits: 2, minimumFractionDigits: 0 })}`;
}

export function formatDate(iso: string): string {
  // Metadata dates arrive either as ISO (2026-01-30) or dotted
  // (25.02.2026) depending on the source document — normalize both.
  const dotted = /^(\d{2})\.(\d{2})\.(\d{4})$/.exec(iso);
  const isoLike = dotted ? `${dotted[3]}-${dotted[2]}-${dotted[1]}` : iso;

  const date = new Date(isoLike);
  if (Number.isNaN(date.getTime())) return iso;

  return date.toLocaleDateString("en-AU", { day: "2-digit", month: "short", year: "numeric" });
}
