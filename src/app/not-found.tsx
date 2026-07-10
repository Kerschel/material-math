import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-[60vh] px-4">
      <div className="text-center max-w-md">
        <p className="font-mono text-6xl font-medium text-[var(--accent)]/30 mb-6">404</p>
        <h1 className="font-display text-2xl font-semibold text-[var(--ink)] mb-3">
          This page doesn&rsquo;t exist.
        </h1>
        <p className="text-[var(--ink-muted)] mb-8 leading-relaxed">
          But your project does. Head back to the calculators and figure out exactly what you need.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center px-6 py-2.5 rounded-lg bg-[var(--accent)] text-[var(--accent-ink)] font-semibold text-sm hover:opacity-90 transition-opacity"
          >
            Go Home
          </Link>
          <Link
            href="/calculators"
            className="inline-flex items-center justify-center px-6 py-2.5 rounded-lg border border-[var(--border)] text-[var(--ink)] font-medium text-sm hover:bg-[var(--bg-muted)] transition-colors"
          >
            Browse Calculators
          </Link>
        </div>
      </div>
    </div>
  );
}
