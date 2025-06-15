
import { ReactNode } from "react";

export function ChartCard({
  title,
  children
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="bg-card rounded-lg shadow-sm p-6 flex flex-col flex-1 border border-border min-w-[295px]">
      <div className="mb-2 font-semibold text-lg">{title}</div>
      <div style={{ minHeight: "180px" }}>{children}</div>
    </div>
  );
}
