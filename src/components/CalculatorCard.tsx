import Link from "next/link";
import { type LucideIcon } from "lucide-react";

interface CalculatorCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  href: string;
}

export function CalculatorCard({ title, description, icon: Icon, href }: CalculatorCardProps) {
  return (
    <Link
      href={href}
      className="group block p-6 rounded-xl bg-[var(--bg-raised)] border border-[var(--border)] transition-all duration-200 hover:shadow-md hover:border-[var(--accent)]/30 hover:-translate-y-0.5"
    >
      <div className="w-10 h-10 rounded-lg bg-[var(--accent)]/10 flex items-center justify-center mb-4 group-hover:bg-[var(--accent)]/15 transition-colors">
        <Icon className="w-5 h-5 text-[var(--accent)]" strokeWidth={1.5} />
      </div>
      <h3 className="font-display font-semibold text-base text-[var(--ink)] mb-1.5 group-hover:text-[var(--accent)] transition-colors">
        {title}
      </h3>
      <p className="text-sm text-[var(--ink-muted)] leading-relaxed">
        {description}
      </p>
      <span className="inline-flex items-center gap-1 mt-3 text-sm font-medium text-[var(--accent)] group-hover:gap-2 transition-all">
        Calculate
        <span aria-hidden="true" className="transition-transform group-hover:translate-x-0.5">&rarr;</span>
      </span>
    </Link>
  );
}
