
import { ChartCard } from "./ChartCard";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, AreaChart, Area, CartesianGrid } from "recharts";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";
import { useState } from "react";

export type ViewMode = "daily" | "monthly" | "yearly";
type AnalyticsDashboardProps = {
  pieData: { category: string; value: number; color: string }[];
  barData: { month: string; income: number; expenses: number }[];
  areaData: { month: string; balance: number }[];
  view: ViewMode;
  setView: (v: ViewMode) => void;
};

export function AnalyticsDashboard({
  pieData,
  barData,
  areaData,
  view,
  setView,
}: AnalyticsDashboardProps) {
  const pieEmpty = !pieData || pieData.length === 0;
  const barEmpty = !barData || barData.length === 0;
  const areaEmpty = !areaData || areaData.length === 0;

  function EmptyState({ label }: { label?: string }) {
    return (
      <div className="flex items-center justify-center h-[185px] text-muted-foreground text-xs">
        {label || "No data yet"}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8 px-2 lg:px-6 w-full max-w-3xl mx-auto">
      {/* Timeframe selector */}
      <div className="w-full flex justify-center mb-3">
        <Tabs value={view} onValueChange={v => setView(v as ViewMode)}>
          <TabsList>
            <TabsTrigger value="daily" className="min-w-[78px]">Daily</TabsTrigger>
            <TabsTrigger value="monthly" className="min-w-[78px]">Monthly</TabsTrigger>
            <TabsTrigger value="yearly" className="min-w-[78px]">Yearly</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      <ChartCard title={`Expense Breakdown by Category (${view[0].toUpperCase() + view.slice(1)})`}>
        <div className="flex flex-col items-center pt-4 pb-8">
          <span className="text-green-600 font-bold text-base mb-3">Keep tabs on every rupee</span>
          <div className="w-full flex justify-center min-h-[185px]">
            <ResponsiveContainer width="99%" height={250}>
              {pieEmpty ? (
                <EmptyState label="No expenses yet" />
              ) : (
                <PieChart>
                  <Pie
                    data={pieData}
                    dataKey="value"
                    nameKey="category"
                    cx="50%"
                    cy="50%"
                    outerRadius={85}
                    label
                  >
                    {pieData.map((entry) => (
                      <Cell key={entry.category} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              )}
            </ResponsiveContainer>
          </div>
        </div>
      </ChartCard>

      <ChartCard title={`Income vs Outflow (${view[0].toUpperCase() + view.slice(1)})`}>
        <div className="flex flex-col items-center pt-4 pb-8">
          <span className="text-yellow-600 font-semibold mb-3">Stay cash positive</span>
          <div className="w-full flex justify-center min-h-[185px]">
            <ResponsiveContainer width="99%" height={250}>
              {barEmpty ? (
                <EmptyState label="No income or expenses yet" />
              ) : (
                <BarChart data={barData} barGap={10} barCategoryGap="22%">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="income" fill="#22C55E" barSize={24} />
                  <Bar dataKey="expenses" fill="#FFB703" barSize={24} />
                </BarChart>
              )}
            </ResponsiveContainer>
          </div>
        </div>
      </ChartCard>
     
      <ChartCard title={`Cumulative Savings Growth (${view[0].toUpperCase() + view.slice(1)})`}>
        <div className="flex flex-col items-center pt-4 pb-8">
          <span className="text-yellow-700 font-semibold mb-3">See your prosperity climbing</span>
          <div className="w-full flex justify-center min-h-[185px]">
            <ResponsiveContainer width="99%" height={250}>
              {areaEmpty ? (
                <EmptyState label="No savings yet" />
              ) : (
                <AreaChart data={areaData} margin={{ left: 12, right: 12, top: 8, bottom: 8 }}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Area type="monotone" dataKey="balance" stroke="#22C55E" fill="#bef264" strokeWidth={3} />
                </AreaChart>
              )}
            </ResponsiveContainer>
          </div>
        </div>
      </ChartCard>
    </div>
  );
}
