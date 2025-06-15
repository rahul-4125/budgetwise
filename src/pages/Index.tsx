import { Link } from "react-router-dom";

const billsPath = "/";

export default function Index() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-50 via-yellow-50 to-white pt-12">
      <div className="flex flex-col items-center gap-8 max-w-xl mx-auto">
        <div className="bg-white/60 rounded-3xl shadow-xl p-8 w-full relative">
          <div className="flex justify-center mb-4">
            {/* Rupee logo (brand) */}
            <svg width="70" height="70" viewBox="0 0 36 36" fill="none">
              <rect x="3" y="7" width="30" height="22" rx="6" fill="#22C55E" stroke="#166534" strokeWidth="2"/>
              <ellipse cx="18" cy="18" rx="8" ry="8" fill="#F4F1BB" stroke="#166534" strokeWidth="1.6"/>
              {/* Rupee symbol */}
              <text x="18" y="24" textAnchor="middle" fontSize="20" fill="#22C55E" fontWeight="bold">₹</text>
            </svg>
          </div>
          <h1 className="text-5xl font-bold text-green-800 mb-3 text-center drop-shadow">BudgetWise</h1>
          <div className="mx-auto h-1 w-2/5 bg-green-400 rounded-full mb-4"></div>
          <p className="text-lg text-gray-800 text-center font-medium mb-6">
            The joyful, smart way to <span className="bg-yellow-100 rounded px-2 py-1">master your finances</span>.<br />
            BudgetWise turns your expenses into insights, so <span className="text-green-700 font-semibold">money works for you</span>.
          </p>
          <div className="flex justify-center gap-5 mt-6">
            <a
              href="/signup"
              className="bg-primary text-primary-foreground px-8 py-3 rounded-xl shadow-lg text-lg font-bold hover:scale-105 hover:bg-primary/90 transition"
            >
              Get Started Free
            </a>
            <a
              href="/signin"
              className="bg-white border-2 border-green-400 px-8 py-3 rounded-xl text-green-700 font-semibold shadow hover:bg-green-100 hover:scale-105 transition"
            >
              Sign In
            </a>
          </div>
        </div>
        <div className="text-center text-xs text-muted-foreground font-medium mt-10">
          &copy; {new Date().getFullYear()} BudgetWise. &ndash; Designed to make you smile, live well, and invest in your dreams.
        </div>
      </div>
    </div>
  );
}
