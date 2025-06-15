
import { Link, useLocation } from "react-router-dom";
import { ChartPie, Calendar, FilePlus, FileMinus, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

const sidebarItems = [
  { label: "Dashboard", icon: ChartPie, path: "/dashboard" },
  { label: "Add Entry", icon: FilePlus, path: "/add" },
  { label: "History", icon: Calendar, path: "/history" },
  { label: "Settings", icon: Settings, path: "/settings" }
];

export function Sidebar() {
  const location = useLocation();

  return (
    <aside className="hidden md:flex flex-col min-h-screen w-56 border-r border-border bg-sidebar p-6 gap-4">
      <div className="mb-10 text-2xl font-bold text-primary">
        <span role="img" aria-label="BudgetWise">💸</span> BudgetWise
      </div>
      <nav className="flex flex-col gap-2">
        {sidebarItems.map(({ label, icon: Icon, path }) => (
          <Link
            to={path}
            key={label}
            className={cn(
              "flex items-center gap-3 px-3 py-2 rounded-lg font-semibold hover:bg-accent/60 transition",
              location.pathname === path
                ? "bg-secondary text-primary"
                : "text-muted-foreground"
            )}
          >
            <Icon className="w-5 h-5" />
            {label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
