
import { Link, useLocation } from "react-router-dom";
import { ChartPie, Calendar, FilePlus, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

// Brand logo: green, minimal, focused on cashbills
const Logo = () => (
  <div className="flex flex-col items-center gap-2 mb-10 px-1">
    <div className="bg-gradient-to-bl from-green-400 via-green-600 to-yellow-400
        w-16 h-16 rounded-2xl flex items-center justify-center shadow shadow-green-200">
      {/* CASHBILL INSPIRED SVG */}
      <svg width="40" height="40" viewBox="0 0 36 36" fill="none">
        <rect x="4" y="8" width="28" height="20" rx="4" fill="#22C55E" stroke="#14532D" strokeWidth="2"/>
        <ellipse cx="18" cy="18" rx="6" ry="6" fill="#F4F1BB" stroke="#14532D" strokeWidth="1.25"/>
        <text x="18" y="22" textAnchor="middle" fontSize="14" fill="#22C55E" fontWeight="bold">$</text>
      </svg>
    </div>
    <div className="flex flex-col items-center">
      <span className="text-xl font-bold text-primary tracking-tight">BudgetWise</span>
      <span className="text-xs text-green-800 dark:text-green-200 mt-0.5 font-medium">
        Track. Analyze.<br />Grow Your Money.
      </span>
    </div>
  </div>
);

const sidebarItems = [
  { label: "Dashboard", icon: ChartPie, path: "/dashboard" },
  { label: "Add Entry", icon: FilePlus, path: "/add" },
  { label: "History", icon: Calendar, path: "/history" },
  { label: "Settings", icon: Settings, path: "/settings" }
];

export function Sidebar() {
  const location = useLocation();

  return (
    <aside className="flex flex-col min-h-screen w-64 border-r border-border bg-sidebar p-8 gap-6 shadow-lg z-40">
      <Logo />
      <nav className="flex flex-col gap-2">
        {sidebarItems.map(({ label, icon: Icon, path }) => (
          <Link
            to={path}
            key={label}
            className={cn(
              "flex items-center gap-4 px-4 py-3 rounded-xl font-semibold hover:bg-accent/70 transition text-lg shadow-sm",
              location.pathname === path
                ? "bg-secondary text-primary"
                : "text-muted-foreground"
            )}
          >
            <Icon className="w-6 h-6" />
            {label}
          </Link>
        ))}
      </nav>
      <div className="mt-auto w-full pt-5 text-center text-xs text-muted-foreground opacity-70 select-none">
        &copy; {new Date().getFullYear()} BudgetWise. <br />
        Smart Money, Bright Future.
      </div>
    </aside>
  );
}
