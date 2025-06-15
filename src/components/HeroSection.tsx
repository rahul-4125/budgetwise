
import React from "react";

type HeroSectionProps = {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  children?: React.ReactNode;
};

export function HeroSection({ title, subtitle, children }: HeroSectionProps) {
  return (
    <section className="w-full flex flex-col items-center justify-center pt-6 sm:pt-10 pb-2 relative z-0">
      <div className="flex flex-col items-center w-full max-w-2xl px-4 sm:px-8 mx-auto">
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
        <h1 className="text-2xl sm:text-4xl font-bold text-green-800 dark:text-green-100 mb-1 sm:mb-2 text-center drop-shadow leading-tight">
          {title}
        </h1>
        {subtitle && (
          <p className="text-base sm:text-lg text-gray-800 dark:text-gray-200 text-center font-medium mb-1 sm:mb-2 leading-snug">
            {subtitle}
          </p>
        )}
        {children && (
          <div className="mt-3 sm:mt-4 flex flex-col items-center gap-2 w-full">
            {children}
          </div>
        )}
      </div>
    </section>
  );
}

export default HeroSection;
