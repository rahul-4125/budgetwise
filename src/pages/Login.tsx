
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock success, auth logic will be added
    toast({
      title: isLogin ? "Logged in!" : "Signed up!",
      description: isLogin
        ? "Welcome back to BudgetWise."
        : "Account created. Please login.",
    });
    setTimeout(() => navigate("/dashboard"), 750);
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-card border border-border rounded-xl w-full max-w-sm p-8 shadow"
      >
        <div className="text-center mb-5 text-2xl font-bold">
          {isLogin ? "Login" : "Sign Up"}
        </div>
        <input
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="mb-3 w-full px-3 py-2 border rounded bg-input"
        />
        <input
          type="password"
          placeholder="Password"
          required
          value={pass}
          onChange={e => setPass(e.target.value)}
          className="mb-4 w-full px-3 py-2 border rounded bg-input"
        />
        <button
          type="submit"
          className="w-full bg-primary text-primary-foreground py-2 rounded font-semibold hover:opacity-90 transition"
        >
          {isLogin ? "Login" : "Create Account"}
        </button>
        <div className="mt-4 text-muted-foreground text-sm text-center">
          {isLogin ? "Need an account?" : "Already have an account?"}{" "}
          <button
            type="button"
            onClick={() => setIsLogin(!isLogin)}
            className="text-primary underline hover:opacity-80"
          >
            {isLogin ? "Sign Up" : "Log In"}
          </button>
        </div>
      </form>
    </div>
  );
}
