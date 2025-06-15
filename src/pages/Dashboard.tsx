
import { AnalyticsDashboard } from "@/components/AnalyticsDashboard";
import { useEntries } from "@/hooks/useEntries";
import { useState } from "react";
import { categories } from "@/utils/categories";
import { groupEntries, barMonths, GroupByView } from "@/utils/groupEntriesBy";

function stringToColor(str: string) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) hash = str.charCodeAt(i) + ((hash << 5) - hash);
  return `hsl(${hash % 360}, 70%, 60%)`;
}

function computeDashboardData(entries: any[], view: GroupByView) {
  // Pie Data: Expense Breakdown by Category for the latest shown period
  const groups = groupEntries(entries, view);
  const lastPeriod = Object.keys(groups).at(-1);
  const pieGroups: Record<string, number> = {};
  (lastPeriod ? groups[lastPeriod] : []).filter(e => e.type === "expense").forEach(e => {
    pieGroups[e.category] = (pieGroups[e.category] || 0) + Number(e.amount);
  });
  const pieData = Object.keys(pieGroups).map(cat => ({
    category: cat,
    value: pieGroups[cat],
    color: stringToColor(cat)
  }));

  // Bar Data: Income vs Expenses for each time bucket
  const bars = barMonths(view);
  const byMonth: Record<string, { income: number; expenses: number }> = {};
  bars.forEach(m => { byMonth[m] = { income: 0, expenses: 0 }; });

  entries.forEach(e => {
    const period = groupEntries([e], view); // group by this view
    const key = Object.keys(period)[0];
    if (byMonth[key]) {
      if (e.type === "income") byMonth[key].income += Number(e.amount);
      else if (e.type === "expense") byMonth[key].expenses += Number(e.amount);
    }
  });
  const barData = bars.map(m => ({
    month: m, income: byMonth[m].income, expenses: byMonth[m].expenses
  }));

  // Area Data: Cumulative Savings
  let balance = 0;
  const areaData = bars.map(m => {
    const monthEntries = entries.filter(e => {
      const val = groupEntries([e], view);
      return Object.keys(val)[0] === m;
    });
    let monthIncome = 0, monthExpense = 0;
    monthEntries.forEach(e => {
      if (e.type === "income") monthIncome += Number(e.amount);
      else if (e.type === "expense") monthExpense += Number(e.amount);
    });
    balance += (monthIncome - monthExpense);
    return { month: m, balance };
  });

  return { pieData, barData, areaData };
}

const Dashboard = () => {
  const { data: entries } = useEntries();
  const [view, setView] = useState<GroupByView>("monthly");
  const { pieData, barData, areaData } = entries && entries.length > 0
    ? computeDashboardData(entries, view)
    : { pieData: [], barData: [], areaData: [] };

  return (
    <div className="flex flex-col gap-14 pb-16 relative overflow-hidden w-full min-h-[90vh]">
      <div className="pointer-events-none absolute inset-0 z-0 transition-all">
        <div className="absolute -top-48 -left-44 w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-green-200/40 via-green-200/50 to-yellow-100/30 blur-2xl 
          animate-pulse dark:animate-none -z-10" />
        <div className="absolute top-[62%] right-0 w-[450px] h-[400px] rounded-full bg-gradient-to-tl from-green-100/60 via-yellow-50/20 to-yellow-100/10 blur-3xl opacity-70 animate-fade-in-slow -z-10" />
      </div>
      <div
        className="text-4xl md:text-5xl font-bold mt-7 mb-1 animate-fade-in-slow text-green-900 tracking-tight drop-shadow text-center"
        style={{ animationDelay: "0.10s" }}
      >
        Welcome back to <span className="text-green-600">BudgetWise</span>!
      </div>
      <div className="text-lg text-green-900/85 mb-2 animate-fade-in-up text-center" style={{ animationDelay: "0.25s" }}>
        Manage your cash flow, build savings, and let every bill bring you a little closer to your dreams.
      </div>
      <div className="animate-scale-in flex justify-center" style={{ animationDelay: "0.19s" }}>
        <AnalyticsDashboard
          pieData={pieData}
          barData={barData}
          areaData={areaData}
          view={view}
          setView={setView}
        />
      </div>
    </div>
  );
};

export default Dashboard;

