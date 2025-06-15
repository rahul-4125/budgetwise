
import { useEffect, useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

const THEMES = [
  { label: "System", value: "system" },
  { label: "Light", value: "light" },
  { label: "Dark", value: "dark" }
];
const CURRENCIES = ["₹", "$", "€"];
const LANGUAGES = [
  { label: "English", value: "en" },
  { label: "हिन्दी", value: "hi" },
  { label: "Español", value: "es" }
];
const DASHBOARDS = [
  { label: "Analytics", value: "analytics" },
  { label: "Table", value: "table" }
];
const WEEK_STARTS = [
  { label: "Sunday", value: "sunday" },
  { label: "Monday", value: "monday" }
];

function getPref<T>(key: string, def: T): T {
  if (typeof window === "undefined") return def;
  try {
    const val = localStorage.getItem(key);
    if (val === null) return def;
    return JSON.parse(val) as T;
  } catch { return def; }
}
function setPref<T>(key: string, val: T) {
  try {
    localStorage.setItem(key, JSON.stringify(val));
  } catch {}
}

export function AppPreferences() {
  // State for each preference
  const [theme, setTheme] = useState<string>(() => getPref("theme", "system"));
  const [currency, setCurrency] = useState<string>(() => getPref("currency", "₹"));
  const [notifs, setNotifs] = useState<boolean>(() => getPref("notifications", true));
  const [lang, setLang] = useState<string>(() => getPref("language", "en"));
  const [monthlyBudget, setMonthlyBudget] = useState<string>(() => getPref("monthlyBudget", ""));
  const [dashboardView, setDashboardView] = useState<string>(() => getPref("dashboardView", "analytics"));
  const [showTips, setShowTips] = useState<boolean>(() => getPref("showTips", true));
  const [weekStart, setWeekStart] = useState<string>(() => getPref("weekStart", "sunday"));
  const [compact, setCompact] = useState<boolean>(() => getPref("compact", false));

  // Handle localStorage & live changes
  useEffect(() => { setPref("theme", theme); document.documentElement.setAttribute("data-theme", theme); }, [theme]);
  useEffect(() => { setPref("currency", currency); }, [currency]);
  useEffect(() => { setPref("notifications", notifs); }, [notifs]);
  useEffect(() => { setPref("language", lang); }, [lang]);
  useEffect(() => { setPref("monthlyBudget", monthlyBudget); }, [monthlyBudget]);
  useEffect(() => { setPref("dashboardView", dashboardView); }, [dashboardView]);
  useEffect(() => { setPref("showTips", showTips); }, [showTips]);
  useEffect(() => { setPref("weekStart", weekStart); }, [weekStart]);
  useEffect(() => { setPref("compact", compact); 
    document.documentElement.classList.toggle("compact", compact);
  }, [compact]);

  function resetPrefs() {
    setTheme("system");
    setCurrency("₹");
    setNotifs(true);
    setLang("en");
    setMonthlyBudget("");
    setDashboardView("analytics");
    setShowTips(true);
    setWeekStart("sunday");
    setCompact(false);
    [
      "theme","currency","notifications","language","monthlyBudget",
      "dashboardView","showTips","weekStart","compact"
    ].forEach((k)=>localStorage.removeItem(k));
    toast({ title: "Preferences reset", description: "All app preferences have been reset." });
  }

  return (
    <form className={cn("space-y-7", compact && "text-sm")}>
      <div>
        <label className="font-semibold block mb-2">Theme</label>
        <div className="flex gap-4">
          {THEMES.map(({label, value}) =>
            <button
              key={value}
              type="button"
              onClick={()=>setTheme(value)}
              className={cn(
                "px-3 py-1 rounded",
                theme === value ? "bg-primary text-primary-foreground" : "bg-input"
              )}
            >
              {label}
            </button>
          )}
        </div>
      </div>
      <div>
        <label className="font-semibold block mb-2">Default Currency</label>
        <select
          value={currency}
          onChange={e=>setCurrency(e.target.value)}
          className="border rounded bg-input px-3 py-2"
        >
          {CURRENCIES.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>
      <div className="flex items-center gap-4">
        <label className="font-semibold">Enable Notifications</label>
        <Switch checked={notifs} onCheckedChange={setNotifs} />
      </div>
      <div>
        <label className="font-semibold block mb-2">Language</label>
        <select
          value={lang}
          onChange={e=>setLang(e.target.value)}
          className="border rounded bg-input px-3 py-2"
        >
          {LANGUAGES.map(l => <option key={l.value} value={l.value}>{l.label}</option>)}
        </select>
      </div>
      <div>
        <label className="font-semibold block mb-2">Monthly Budget Limit</label>
        <input
          type="number"
          placeholder="Set monthly budget"
          value={monthlyBudget}
          min={0}
          onChange={e=>setMonthlyBudget(e.target.value)}
          className="border rounded bg-input px-3 py-2 w-40"
        />
      </div>
      <div>
        <label className="font-semibold block mb-2">Default Dashboard View</label>
        <select
          value={dashboardView}
          onChange={e=>setDashboardView(e.target.value)}
          className="border rounded bg-input px-3 py-2"
        >
          {DASHBOARDS.map(d => <option key={d.value} value={d.value}>{d.label}</option>)}
        </select>
      </div>
      <div className="flex items-center gap-4">
        <label className="font-semibold">Show onboarding tips</label>
        <Switch checked={showTips} onCheckedChange={setShowTips} />
      </div>
      <div>
        <label className="font-semibold block mb-2">Start week on</label>
        <div className="flex gap-4">
          {WEEK_STARTS.map(({label,value})=>
            <button
              key={value}
              type="button"
              className={cn(
                "px-3 py-1 rounded",
                weekStart === value ? "bg-primary text-primary-foreground" : "bg-input"
              )}
              onClick={()=>setWeekStart(value)}
            >
              {label}
            </button>
          )}
        </div>
      </div>
      <div className="flex items-center gap-4">
        <label className="font-semibold">Compact/Dense Mode</label>
        <Switch checked={compact} onCheckedChange={setCompact} />
      </div>
      <div>
        <Button type="button" variant="destructive" onClick={resetPrefs}>
          Reset All Preferences
        </Button>
      </div>
    </form>
  );
}
export default AppPreferences;
