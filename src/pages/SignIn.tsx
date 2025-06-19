
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { Eye, EyeOff } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [resetLoading, setResetLoading] = useState(false);
  const navigate = useNavigate();

  // Ensure dark mode toggles page background as well
  useEffect(() => {
    const onClassChange = () => {
      const html = document.documentElement;
      if (html.classList.contains("dark")) {
        document.body.classList.add("bg-neutral-950");
      } else {
        document.body.classList.remove("bg-neutral-950");
      }
    };
    onClassChange();
    // Listen for class changes on html
    const observer = new MutationObserver(onClassChange);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  // Listen for auth changes and redirect if already signed in
  useEffect(() => {
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        navigate("/dashboard");
      }
    });
    supabase.auth.getUser().then(({ data }) => {
      if (data.user) {
        setUser(data.user);
        navigate("/dashboard");
      }
    });
    return () => listener.subscription.unsubscribe();
  }, [navigate]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password: pass,
    });
    setLoading(false);
    if (error) {
      if (
        error.message &&
        (error.message.includes("Email not confirmed") ||
          error.message.toLowerCase().includes("email") && error.message.toLowerCase().includes("confirm"))
      ) {
        toast({
          title: "Please verify your email",
          description: "Check your inbox and click the link to confirm your email address before signing in.",
          variant: "destructive"
        });
      } else {
        toast({
          title: "Sign in failed",
          description: error.message || "Please check your credentials.",
          variant: "destructive"
        });
      }
      return;
    }
    toast({
      title: "Welcome back!",
      description: "Your BudgetWise dashboard awaits 🚀",
    });
    navigate("/dashboard");
  }

  async function handleForgotPassword(e: React.FormEvent) {
    e.preventDefault();
    setResetLoading(true);
    
    const { error } = await supabase.auth.resetPasswordForEmail(resetEmail, {
      redirectTo: `${window.location.origin}/reset-password`
    });
    
    setResetLoading(false);
    
    if (error) {
      toast({
        title: "Password reset failed",
        description: error.message,
        variant: "destructive"
      });
    } else {
      toast({
        title: "Password reset email sent",
        description: "Check your inbox for a password reset link.",
      });
      setShowForgotPassword(false);
      setResetEmail("");
    }
  }

  if (showForgotPassword) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-2 bg-gradient-to-br from-green-50 via-yellow-50 to-white dark:from-neutral-950 dark:via-neutral-900 dark:to-black transition-colors duration-300">
        <div className="bg-white dark:bg-neutral-900 rounded-3xl shadow-2xl border-2 border-green-200 dark:border-green-800 w-full max-w-md p-10 mx-auto mt-10 space-y-7 animate-fade-in-slow">
          <div className="flex justify-center">
            <svg width="40" height="40" viewBox="0 0 36 36" fill="none">
              <rect x="4" y="8" width="28" height="20" rx="4" fill="#22C55E" stroke="#14532D" strokeWidth="2"/>
              <ellipse cx="18" cy="18" rx="6" ry="6" fill="#F4F1BB" stroke="#14532D" strokeWidth="1.25"/>
              <text x="18" y="22" textAnchor="middle" fontSize="14" fill="#22C55E" fontWeight="bold">$</text>
            </svg>
          </div>
          <h2 className="text-3xl font-extrabold text-center text-green-900 dark:text-green-100 mb-2">Reset Password</h2>
          <p className="text-center text-green-800 dark:text-green-200 text-sm">
            Enter your email address and we'll send you a link to reset your password.
          </p>
          <form onSubmit={handleForgotPassword} className="flex flex-col gap-5">
            <input
              type="email"
              placeholder="Email"
              required
              value={resetEmail}
              onChange={e => setResetEmail(e.target.value)}
              className="bg-green-50 dark:bg-neutral-800 border border-green-200 dark:border-green-700 rounded-xl px-4 py-3 text-lg outline-none focus:ring-2 focus:ring-green-300 dark:focus:ring-green-800 transition text-black dark:text-white"
            />
            <button
              type="submit"
              className="w-full bg-green-600 text-white py-3 rounded-xl font-semibold text-lg hover:bg-green-700 hover:scale-105 transition"
              disabled={resetLoading}
            >
              {resetLoading ? "Sending..." : "Send Reset Link"}
            </button>
          </form>
          <div className="text-center text-sm text-green-800 dark:text-green-200 mt-1">
            Remember your password?{" "}
            <button
              onClick={() => setShowForgotPassword(false)}
              className="underline text-primary hover:text-green-800"
            >
              Back to Sign In
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-2 bg-gradient-to-br from-green-50 via-yellow-50 to-white dark:from-neutral-950 dark:via-neutral-900 dark:to-black transition-colors duration-300">
      <div className="bg-white dark:bg-neutral-900 rounded-3xl shadow-2xl border-2 border-green-200 dark:border-green-800 w-full max-w-md p-10 mx-auto mt-10 space-y-7 animate-fade-in-slow">
        <div className="flex justify-center">
          <svg width="40" height="40" viewBox="0 0 36 36" fill="none">
            <rect x="4" y="8" width="28" height="20" rx="4" fill="#22C55E" stroke="#14532D" strokeWidth="2"/>
            <ellipse cx="18" cy="18" rx="6" ry="6" fill="#F4F1BB" stroke="#14532D" strokeWidth="1.25"/>
            <text x="18" y="22" textAnchor="middle" fontSize="14" fill="#22C55E" fontWeight="bold">$</text>
          </svg>
        </div>
        <h2 className="text-3xl font-extrabold text-center text-green-900 dark:text-green-100 mb-2">Welcome to BudgetWise!</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <input
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="bg-green-50 dark:bg-neutral-800 border border-green-200 dark:border-green-700 rounded-xl px-4 py-3 text-lg outline-none focus:ring-2 focus:ring-green-300 dark:focus:ring-green-800 transition text-black dark:text-white"
          />
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              required
              value={pass}
              onChange={e => setPass(e.target.value)}
              className="bg-green-50 dark:bg-neutral-800 border border-green-200 dark:border-green-700 rounded-xl px-4 py-3 text-lg outline-none focus:ring-2 focus:ring-green-300 dark:focus:ring-green-800 transition text-black dark:text-white w-full pr-12"
            />
            <button
              type="button"
              tabIndex={-1}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-500 hover:text-green-700 dark:text-green-400 dark:hover:text-green-200"
              onClick={() => setShowPassword(v => !v)}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff size={22} /> : <Eye size={22} />}
            </button>
          </div>
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded-xl font-semibold text-lg hover:bg-green-700 hover:scale-105 transition"
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
        <div className="text-center text-sm text-green-800 dark:text-green-200">
          <button
            onClick={() => setShowForgotPassword(true)}
            className="underline text-primary hover:text-green-800 mb-2 block w-full"
          >
            Forgot your password?
          </button>
          New here?{" "}
          <Link
            to="/signup"
            className="underline text-primary hover:text-green-800"
          >
            Create a BudgetWise account &rarr;
          </Link>
        </div>
        <div className="text-xs mt-2 text-muted-foreground text-center">
          Wise with cash, rich in life. Let's budget!
        </div>
      </div>
    </div>
  );
}
