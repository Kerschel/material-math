import type { ReactNode } from "react";

interface CalculatorLayoutProps {
  title: string;
  description: string;
  icon: string;
  children: ReactNode;
}

export function CalculatorLayout({ title, description, icon, children }: CalculatorLayoutProps) {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <span className="text-4xl">{icon}</span>
        <h1 className="text-3xl font-bold text-gray-900 mt-2">{title}</h1>
        <p className="text-lg text-gray-600 mt-1">{description}</p>
      </div>

      <div className="bg-white rounded-xl shadow-lg border p-6 md:p-8">
        {children}
      </div>
    </div>
  );
}
