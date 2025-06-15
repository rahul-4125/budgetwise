
import { ReactNode } from "react";

export function ChartCard({
  title,
  children
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div
      className="bg-card rounded-lg shadow-sm p-6 flex flex-col flex-1 border border-border min-w-[295px]
        transition-transform duration-300 hover:scale-105 hover:shadow-lg
        animate-fade-in-up
      "
      style={{ animationDelay: "0.25s" }}
    >
      <div className="mb-2 font-semibold text-lg select-none">{title}</div>
      <div style={{ minHeight: "180px" }}>{children}</div>
    </div>
  );
}
