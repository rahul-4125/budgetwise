
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    // Mock success
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Welcome back!",
        description: "Your BudgetWise dashboard awaits 🚀",
      });
      navigate("/dashboard");
    }, 600);
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-2 bg-gradient-to-br from-green-50 via-yellow-50 to-white">
      <div className="bg-white rounded-3xl shadow-2xl border-2 border-green-200 w-full max-w-md p-10 mx-auto mt-10 space-y-7 animate-fade-in-slow">
        <div className="flex justify-center">
          <svg width="40" height="40" viewBox="0 0 36 36" fill="none">
            <rect x="4" y="8" width="28" height="20" rx="4" fill="#22C55E" stroke="#14532D" strokeWidth="2"/>
            <ellipse cx="18" cy="18" rx="6" ry="6" fill="#F4F1BB" stroke="#14532D" strokeWidth="1.25"/>
            <text x="18" y="22" textAnchor="middle" fontSize="14" fill="#22C55E" fontWeight="bold">$</text>
          </svg>
        </div>
        <h2 className="text-3xl font-extrabold text-center text-green-900 mb-2">Welcome to BudgetWise!</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <input
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="bg-green-50 border border-green-200 rounded-xl px-4 py-3 text-lg outline-none focus:ring-2 focus:ring-green-300 transition"
          />
          <input
            type="password"
            placeholder="Password"
            required
            value={pass}
            onChange={e => setPass(e.target.value)}
            className="bg-green-50 border border-green-200 rounded-xl px-4 py-3 text-lg outline-none focus:ring-2 focus:ring-green-300 transition"
          />
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded-xl font-semibold text-lg hover:bg-green-700 hover:scale-105 transition"
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
        <div className="text-center text-sm text-green-800 mt-1">
          New here?{" "}
          <Link
            to="/signup"
            className="underline text-primary hover:text-green-800"
          >
            Create a BudgetWise account &rarr;
          </Link>
        </div>
        <div className="text-xs mt-2 text-muted-foreground text-center">
          Wise with cash, rich in life. Let’s budget!
        </div>
      </div>
    </div>
  );
}
