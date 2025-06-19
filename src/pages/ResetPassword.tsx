
import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { Eye, EyeOff } from "lucide-react";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // Check if we have the required tokens for password reset
  useEffect(() => {
    const accessToken = searchParams.get('access_token');
    const refreshToken = searchParams.get('refresh_token');
    
    if (!accessToken || !refreshToken) {
      toast({
        title: "Invalid reset link",
        description: "This password reset link is invalid or has expired.",
        variant: "destructive"
      });
      navigate("/signin");
    }
  }, [searchParams, navigate]);

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

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Please make sure both passwords are the same.",
        variant: "destructive"
      });
      return;
    }

    if (password.length < 6) {
      toast({
        title: "Password too short",
        description: "Password must be at least 6 characters long.",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.updateUser({
      password: password
    });

    setLoading(false);

    if (error) {
      toast({
        title: "Password reset failed",
        description: error.message,
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Password reset successful!",
      description: "Your password has been updated. Please sign in with your new credentials.",
    });

    // Sign out the user to ensure they sign in with new credentials
    await supabase.auth.signOut();
    
    // Redirect to sign in page
    navigate("/signin");
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
        <h2 className="text-3xl font-extrabold text-center text-green-900 dark:text-green-100 mb-2">Reset Your Password</h2>
        <p className="text-center text-green-800 dark:text-green-200 text-sm">
          Enter your new password below to complete the reset process.
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your new password"
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
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
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Re-enter your new password"
              required
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              className="bg-green-50 dark:bg-neutral-800 border border-green-200 dark:border-green-700 rounded-xl px-4 py-3 text-lg outline-none focus:ring-2 focus:ring-green-300 dark:focus:ring-green-800 transition text-black dark:text-white w-full pr-12"
            />
            <button
              type="button"
              tabIndex={-1}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-500 hover:text-green-700 dark:text-green-400 dark:hover:text-green-200"
              onClick={() => setShowConfirmPassword(v => !v)}
              aria-label={showConfirmPassword ? "Hide password" : "Show password"}
            >
              {showConfirmPassword ? <EyeOff size={22} /> : <Eye size={22} />}
            </button>
          </div>
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded-xl font-semibold text-lg hover:bg-green-700 hover:scale-105 transition"
            disabled={loading}
          >
            {loading ? "Updating Password..." : "Update Password"}
          </button>
        </form>
        <div className="text-xs mt-2 text-muted-foreground text-center">
          Wise with cash, rich in life. Let's budget!
        </div>
      </div>
    </div>
  );
}
