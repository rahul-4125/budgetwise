
import { AnalyticsDashboard } from "@/components/AnalyticsDashboard";

const Dashboard = () => (
  <div className="flex flex-col gap-8 pb-16 relative overflow-hidden">
    {/* Animated accent background */}
    <div className="pointer-events-none absolute inset-0 z-0 transition-all">
      {/* Tailwind animated gradient background */}
      <div className="absolute -top-32 -left-32 w-[450px] h-[450px] rounded-full bg-gradient-to-tr from-primary/20 via-accent/30 to-secondary/30 blur-3xl animate-pulse -z-10" />
      <div className="absolute top-1/2 right-0 w-[380px] h-[380px] rounded-full bg-gradient-to-tl from-secondary/30 via-destructive/10 to-primary/10 blur-2xl opacity-70 animate-fade-in-slow -z-10" />
    </div>
    {/* Animated Welcome */}
    <div
      className="text-3xl font-bold my-5 animate-fade-in-slow"
      style={{ animationDelay: "0.15s" }}
    >
      Welcome back, <span className="text-primary">User</span> 👋
    </div>
    {/* Dashboard charts container - animate in */}
    <div className="animate-scale-in fade-in" style={{ animationDelay: "0.25s" }}>
      <AnalyticsDashboard />
    </div>
  </div>
);

export default Dashboard;
