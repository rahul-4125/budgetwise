
import { Link, useLocation } from "react-router-dom";
import { ChartPie, FilePlus, Calendar, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

const tabs = [
  { label: "Dashboard", icon: ChartPie, path: "/dashboard" },
  { label: "Add", icon: FilePlus, path: "/add" },
  { label: "History", icon: Calendar, path: "/history" },
  { label: "Settings", icon: Settings, path: "/settings" }
];

export function TabsNav() {
  const location = useLocation();

  return (
    <div className="fixed z-40 left-0 right-0 bottom-0 md:hidden flex justify-between bg-background border-t border-border p-1">
      {tabs.map(({ label, icon: Icon, path }) => (
        <Link
          to={path}
          key={label}
          className={cn(
            "flex flex-col flex-1 items-center py-2 transition font-medium rounded hover:bg-secondary group",
            location.pathname === path ? "text-primary bg-accent" : "text-muted-foreground"
          )}
        >
          <Icon className="w-6 h-6 mb-1" />
          <span className="text-xs">{label}</span>
        </Link>
      ))}
    </div>
  );
}
