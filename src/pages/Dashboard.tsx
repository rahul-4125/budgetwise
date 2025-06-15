
import { AnalyticsDashboard } from "@/components/AnalyticsDashboard";

const Dashboard = () => (
  <div className="flex flex-col gap-8 pb-16">
    <div className="text-3xl font-bold my-5">Welcome back, <span className="text-primary">User</span> 👋</div>
    <AnalyticsDashboard />
  </div>
);
export default Dashboard;
