
import { ChartCard } from "./ChartCard";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, AreaChart, Area, CartesianGrid } from "recharts";

const pieData = [
  { category: "Food", value: 350, color: "#8884d8" },
  { category: "Rent", value: 900, color: "#82ca9d" },
  { category: "Utilities", value: 200, color: "#ffc658" },
  { category: "Entertainment", value: 180, color: "#ff8042" },
  { category: "Other", value: 120, color: "#8dd1e1" },
];

const barData = [
  { month: "Jan", income: 4000, expenses: 2500 },
  { month: "Feb", income: 4500, expenses: 3200 },
  { month: "Mar", income: 3800, expenses: 2900 },
  { month: "Apr", income: 4300, expenses: 2700 },
  { month: "May", income: 4100, expenses: 3100 },
];

const areaData = [
  { month: "Jan", balance: 1200 },
  { month: "Feb", balance: 2500 },
  { month: "Mar", balance: 3400 },
  { month: "Apr", balance: 4900 },
  { month: "May", balance: 6100 },
];

export function AnalyticsDashboard() {
  return (
    <div className="flex flex-col lg:flex-row gap-6">
      <ChartCard title="Expenses by Category">
        <ResponsiveContainer width="100%" height={220}>
          <PieChart>
            <Pie
              data={pieData}
              dataKey="value"
              nameKey="category"
              cx="50%"
              cy="50%"
              outerRadius={70}
              label
            >
              {pieData.map((entry, index) => (
                <Cell key={entry.category} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </ChartCard>
      <ChartCard title="Income vs Expenses (Monthly)">
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={barData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="income" fill="#8884d8" />
            <Bar dataKey="expenses" fill="#ff8042" />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>
      <ChartCard title="Cumulative Balance Trend">
        <ResponsiveContainer width="100%" height={220}>
          <AreaChart data={areaData}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Area type="monotone" dataKey="balance" stroke="#82ca9d" fill="#8dd1e17e" />
          </AreaChart>
        </ResponsiveContainer>
      </ChartCard>
    </div>
  );
}
