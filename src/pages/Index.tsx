
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { isAuthenticated } from "@/services/auth";

const Index = () => {
  const navigate = useNavigate();
  useEffect(() => {
    // If already "signed in" (mock), go to dashboard
    if (isAuthenticated()) navigate("/dashboard");
  }, [navigate]);

  // While redirecting, show bare home page
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background">
      <div className="text-center">
        <h1 className="text-5xl font-extrabold mb-4">BudgetWise</h1>
        <p className="text-xl text-muted-foreground mb-5">
          Take control of your money. Intuitive tracking, analytics, and smart suggestions—all in one app.
        </p>
        <a
          href="/login"
          className="text-white bg-primary px-8 py-3 rounded-lg text-lg font-bold shadow hover:scale-105 hover:bg-primary/90 transition"
        >
          Get Started
        </a>
      </div>
    </div>
  );
};

export default Index;
