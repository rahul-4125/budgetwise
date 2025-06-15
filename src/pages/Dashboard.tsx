import { AnalyticsDashboard } from "@/components/AnalyticsDashboard";

const Dashboard = () => {
  // For new users: no data placeholders!
  const pieData: any[] = [];
  const barData: any[] = [];
  const areaData: any[] = [];

  return (
    <div className="flex flex-col gap-14 pb-16 relative overflow-hidden w-full min-h-[90vh]">
      {/* Animated accent background: stays still in dark mode */}
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
      {/* Dashboard charts container - displayed one by one, vertically */}
      <div className="animate-scale-in flex justify-center" style={{ animationDelay: "0.19s" }}>
        <AnalyticsDashboard pieData={pieData} barData={barData} areaData={areaData} />
      </div>
    </div>
  );
};

export default Dashboard;
