
/**
 * Utility to group entries by day, month, or year for analytics.
 */
export type GroupByView = "daily" | "monthly" | "yearly";

function getGroupKey(dateStr: string, view: GroupByView) {
  const date = new Date(dateStr);
  if (view === "daily")
    return date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: '2-digit' });
  if (view === "monthly")
    return date.toLocaleDateString('en-GB', { month: 'short', year: '2-digit' });
  if (view === "yearly")
    return date.getFullYear().toString();
  return "";
}

export function groupEntries(entries: any[], view: GroupByView) {
  const groups: Record<string, any[]> = {};
  entries.forEach(e => {
    const key = getGroupKey(e.date, view);
    if (!groups[key]) groups[key] = [];
    groups[key].push(e);
  });
  return groups;
}

export function barMonths(view: GroupByView) {
  const now = new Date();
  if (view === "daily") {
    // Last 14 days
    return [...Array(14)].map((_, i) => {
      const d = new Date(now);
      d.setDate(d.getDate() - (13 - i));
      return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: '2-digit' });
    });
  }
  if (view === "monthly") {
    // Last 6 months
    return [...Array(6)].map((_, i) => {
      const d = new Date(now);
      d.setMonth(d.getMonth() - (5 - i));
      return d.toLocaleDateString('en-GB', { month: 'short', year: '2-digit' });
    });
  }
  if (view === "yearly") {
    // Last 5 years
    return [...Array(5)].map((_, i) => {
      const y = now.getFullYear() - (4 - i);
      return y.toString();
    });
  }
  return [];
}

