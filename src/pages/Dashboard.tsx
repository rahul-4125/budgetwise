
import { AnalyticsDashboard } from "@/components/AnalyticsDashboard";
import { useEntries } from "@/hooks/useEntries";
import { categories } from "@/utils/categories";

function computeDashboardData(entries: any[]) {
  // Pie Data: Expense Breakdown by Category
  const pieGroups: Record<string, number> = {};
  entries.filter(e => e.type === "expense").forEach(e => {
    pieGroups[e.category] = (pieGroups[e.category] || 0) + Number(e.amount);
  });
  const pieData = Object.keys(pieGroups).map(cat => ({
    category: cat,
    value: pieGroups[cat],
    color: stringToColor(cat)
  }));

  // Bar Data: Monthly Income vs Expenses (past 6 months)
  const current = new Date();
  const barMonths: string[] = [];
  for (let i = 5; i >= 0; i--) {
    const dt = new Date(current.getFullYear(), current.getMonth() - i, 1);
    barMonths.push(dt.toLocaleString('default', { month: 'short', year: '2-digit' }));
  }

  const byMonth: Record<string, { income: number; expenses: number }> = {};
  barMonths.forEach(m => { byMonth[m] = { income: 0, expenses: 0 }; });

  entries.forEach(e => {
    const entryDate = new Date(e.date);
    const mkey = entryDate.toLocaleString('default', { month: 'short', year: '2-digit' });
    if (byMonth[mkey]) {
      if (e.type === "income") byMonth[mkey].income += Number(e.amount);
      else if (e.type === "expense") byMonth[mkey].expenses += Number(e.amount);
    }
  });
  const barData = barMonths.map(m => ({
    month: m, income: byMonth[m].income, expenses: byMonth[m].expenses
  }));

  // Area Data: Cumulative Savings
  let balance = 0;
  const areaData = barMonths.map(m => {
    const monthEntries = entries.filter(e => {
      const entryDate = new Date(e.date);
      const mstring = entryDate.toLocaleString('default', { month: 'short', year: '2-digit' });
      return mstring === m;
    });
    // sum incomes and expenses for the month
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

function stringToColor(str: string) {
  // Simple color hash from string for category
  let hash = 0;
  for (let i = 0; i < str.length; i++) hash = str.charCodeAt(i) + ((hash << 5) - hash);
  return `hsl(${hash % 360}, 70%, 60%)`;
}

const Dashboard = () => {
  const { data: entries, isLoading } = useEntries();
  const { pieData, barData, areaData } = entries && entries.length > 0
    ? computeDashboardData(entries)
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
        />
      </div>
    </div>
  );
};

export default Dashboard;
