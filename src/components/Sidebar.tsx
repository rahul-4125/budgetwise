
import { Link, useLocation } from "react-router-dom";
import { ChartPie, Calendar, FilePlus, User, Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";

// Brand logo: rupee, green, minimal, focused on cashbills
const Logo = () => (
  <div className="flex flex-col items-center gap-2 mb-10 px-1">
    <div className="bg-gradient-to-bl from-green-400 via-green-600 to-yellow-400
        w-16 h-16 rounded-2xl flex items-center justify-center shadow shadow-green-200">
      {/* RUPEE INSPIRED SVG with smaller ₹ symbol */}
      <svg width="40" height="40" viewBox="0 0 36 36" fill="none">
        <rect x="4" y="8" width="28" height="20" rx="4" fill="#22C55E" stroke="#14532D" strokeWidth="2"/>
        <ellipse cx="18" cy="18" rx="6" ry="6" fill="#F4F1BB" stroke="#14532D" strokeWidth="1.25"/>
        <text x="18" y="19.5" textAnchor="middle" fontSize="10" fill="#22C55E" fontWeight="bold" dominantBaseline="middle">₹</text>
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
  { label: "Profile", icon: User, path: "/profile" }
];

// Dark mode toggle functionality in sidebar
function DarkModeToggler() {
  const [isDark, setIsDark] = useState(
    () => document.documentElement.classList.contains("dark")
  );

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  return (
    <button
      aria-label="Toggle dark mode"
      className={cn(
        "mt-5 mb-2 flex items-center gap-2 px-4 py-2 rounded-xl w-full justify-center font-semibold bg-muted hover:bg-accent/60 transition text-lg shadow",
        isDark ? "text-yellow-300" : "text-green-700"
      )}
      onClick={() => setIsDark((v) => !v)}
      type="button"
    >
      {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
      <span>{isDark ? "Light Mode" : "Dark Mode"}</span>
    </button>
  );
}

export function Sidebar() {
  const location = useLocation();

  return (
    <aside className="flex flex-col min-h-screen w-64 border-r border-border bg-sidebar p-8 gap-6 shadow-lg z-40">
      <Logo />
      <DarkModeToggler />
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
