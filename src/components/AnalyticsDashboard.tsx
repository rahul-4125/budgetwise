
import { ChartCard } from "./ChartCard";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, AreaChart, Area, CartesianGrid } from "recharts";

// Enhanced mock data
const pieData = [
  { category: "Groceries 🛒", value: 380, color: "#22C55E" },
  { category: "Home & Rent 🏠", value: 1050, color: "#FEBB54" },
  { category: "Bills & Utilities 💡", value: 220, color: "#FFC947" },
  { category: "Leisure & Fun 🎉", value: 240, color: "#44A1A0" },
  { category: "Savings 💰", value: 430, color: "#AAD576" },
];

const barData = [
  { month: "Jan", income: 4000, expenses: 2500 },
  { month: "Feb", income: 4500, expenses: 3200 },
  { month: "Mar", income: 3800, expenses: 2900 },
  { month: "Apr", income: 4300, expenses: 2700 },
  { month: "May", income: 4100, expenses: 3100 },
];

const areaData = [
  { month: "Jan", balance: 800 },
  { month: "Feb", balance: 2150 },
  { month: "Mar", balance: 3300 },
  { month: "Apr", balance: 4470 },
  { month: "May", balance: 5940 },
];

export function AnalyticsDashboard() {
  return (
    <div className="flex flex-col gap-10 px-2 lg:px-6 w-full max-w-3xl mx-auto">
      <ChartCard title="Expense Breakdown by Category">
        <div className="flex flex-col items-center">
          <span className="text-green-600 font-bold text-base mb-1">Keep tabs on every rupee</span>
          <ResponsiveContainer width="99%" height={230}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="category"
                cx="50%"
                cy="50%"
                outerRadius={75}
                label
              >
                {pieData.map((entry) => (
                  <Cell key={entry.category} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </ChartCard>
      <ChartCard title="Monthly Income vs Outflow">
        <div className="flex flex-col items-center">
          <span className="text-yellow-600 font-semibold mb-1">Stay cash positive</span>
          <ResponsiveContainer width="99%" height={230}>
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="income" fill="#22C55E" />
              <Bar dataKey="expenses" fill="#FFB703" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </ChartCard>
      <ChartCard title="Cumulative Savings Growth">
        <div className="flex flex-col items-center">
          <span className="text-yellow-700 font-semibold mb-1">See your prosperity climbing</span>
          <ResponsiveContainer width="99%" height={230}>
            <AreaChart data={areaData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="balance" stroke="#22C55E" fill="#bef264" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </ChartCard>
    </div>
  );
}

