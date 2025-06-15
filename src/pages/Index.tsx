
import { Link } from "react-router-dom";

const billsPath = "/";

export default function Index() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center 
      bg-gradient-to-br from-green-50 via-yellow-50 to-white 
      dark:from-neutral-950 dark:via-neutral-900 dark:to-black
      transition-colors duration-300 pt-6 sm:pt-10">
      <div className="flex flex-col items-center gap-8 w-full max-w-xl md:max-w-2xl px-3 sm:px-6 mx-auto">
        <div className="bg-white/60 dark:bg-neutral-900/80 rounded-3xl shadow-xl p-5 sm:p-8 w-full relative transition-colors">
          <div className="flex justify-center mb-4">
            <svg
              width="56"
              height="56"
              viewBox="0 0 36 36"
              fill="none"
              className="sm:w-[70px] sm:h-[70px] w-[48px] h-[48px]"
            >
              <rect x="3" y="7" width="30" height="22" rx="6" fill="#22C55E" stroke="#166534" strokeWidth="2" />
              <ellipse cx="18" cy="18" rx="8" ry="8" fill="#F4F1BB" stroke="#166534" strokeWidth="1.6" />
              <text x="18" y="21.5" textAnchor="middle" fontSize="14" fill="#22C55E" fontWeight="bold" dominantBaseline="middle">₹</text>
            </svg>
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold text-green-800 dark:text-green-100 mb-2 sm:mb-3 text-center drop-shadow leading-tight sm:leading-tight">
            BudgetWise
          </h1>
          <div className="mx-auto h-1 w-1/3 sm:w-2/5 bg-green-400 rounded-full mb-4" />
          <p className="text-base sm:text-lg text-gray-800 dark:text-gray-200 text-center font-medium mb-5 sm:mb-6 leading-snug">
            The joyful, smart way to{" "}
            <span className="bg-yellow-100 dark:bg-neutral-800 rounded px-2 py-1">master your finances</span>.<br />
            BudgetWise turns your expenses into insights, so{" "}
            <span className="text-green-700 dark:text-green-200 font-semibold">money works for you</span>.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-5 mt-4 sm:mt-6 w-full">
            <a
              href="/signup"
              className="bg-primary text-primary-foreground px-7 py-2.5 sm:px-8 sm:py-3 rounded-xl shadow-lg text-base sm:text-lg font-bold hover:scale-105 hover:bg-primary/90 transition w-full sm:w-auto text-center"
            >
              Get Started Free
            </a>
            <a
              href="/signin"
              className="bg-white dark:bg-neutral-800 border-2 border-green-400 px-7 py-2.5 sm:px-8 sm:py-3 rounded-xl text-green-700 dark:text-green-200 font-semibold shadow hover:bg-green-100 dark:hover:bg-neutral-700 hover:scale-105 transition w-full sm:w-auto text-center"
            >
              Sign In
            </a>
          </div>
        </div>
        <div className="text-center text-xs sm:text-sm text-muted-foreground font-medium mt-7 sm:mt-10 px-1">
          &copy; {new Date().getFullYear()} BudgetWise. &ndash; Designed to make you smile, live well, and invest in your dreams.
        </div>
      </div>
    </div>
  );
}

