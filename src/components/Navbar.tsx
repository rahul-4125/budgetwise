
import { Moon, User, Settings } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";

const navItems = [
  { to: "/dashboard", label: "Dashboard" },
  { to: "/add", label: "Add Entry" },
  { to: "/history", label: "History" },
  { to: "/settings", label: "Settings" },
];

export function Navbar() {
  const location = useLocation();

  // Dark mode handler: toggles 'dark' class on <html>
  const handleToggle = () => {
    document.documentElement.classList.toggle("dark");
  };

  return (
    <nav className="w-full flex items-center justify-between px-6 py-4 bg-background/70 border-b border-border shadow-sm z-40 font-sans">
      <div className="flex items-center gap-4">
        <Link to="/dashboard">
          <span className="inline-flex items-center gap-2 font-bold text-xl text-primary hover:opacity-80 transition select-none">
            <span role="img" aria-label="BudgetWise">💸</span> BudgetWise
          </span>
        </Link>
        <div className="hidden md:flex space-x-1 ml-8">
          {navItems.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className={cn(
                "px-3 py-2 rounded text-base font-medium hover:bg-secondary transition",
                location.pathname === to
                  ? "bg-secondary text-primary"
                  : "text-muted-foreground"
              )}
            >
              {label}
            </Link>
          ))}
        </div>
      </div>
      <div className="flex gap-2 items-center">
        <button
          type="button"
          className="hover:bg-secondary p-2 rounded transition"
          onClick={handleToggle}
          aria-label="Toggle dark mode"
        >
          <Moon className="h-5 w-5" />
        </button>
        <Link
          to="/settings"
          className="hover:bg-secondary p-2 rounded transition"
        >
          <User className="h-5 w-5" />
        </Link>
      </div>
    </nav>
  );
}
