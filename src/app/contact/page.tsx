import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Material Math",
  description:
    "Get in touch with the Material Math team. Questions, suggestions, or corrections — we'd love to hear from you.",
  alternates: {
    canonical: "https://materialmath.com/contact",
  },
};

export default function ContactPage() {
  return (
    <div>
      <section className="py-16 sm:py-20 px-4">
        <div className="max-w-2xl mx-auto">
          <p className="text-sm font-medium text-[var(--accent)] mb-3 tracking-wide uppercase">
            Contact
          </p>
          <h1 className="font-display text-3xl sm:text-4xl font-semibold text-[var(--ink)] mb-4">
            Contact Material Math
          </h1>
          <p className="text-lg text-[var(--ink-muted)] mb-10 leading-relaxed">
            Questions, suggestions, corrections, or feedback — we&rsquo;d love to hear from you.
          </p>

          <div className="space-y-8">
            <div className="p-6 rounded-xl bg-[var(--bg-raised)] border border-[var(--border)]">
              <h2 className="font-display font-semibold text-lg text-[var(--ink)] mb-2">
                Email Us
              </h2>
              <p className="text-[var(--ink-muted)] mb-3">
                The best way to reach us. We typically respond within 1&ndash;2 business days.
              </p>
              <a
                href="mailto:hello@materialmath.com"
                className="text-[var(--accent)] font-medium hover:underline"
              >
                hello@materialmath.com
              </a>
            </div>

            <div className="p-6 rounded-xl bg-[var(--bg-raised)] border border-[var(--border)]">
              <h2 className="font-display font-semibold text-lg text-[var(--ink)] mb-2">
                Report an Issue
              </h2>
              <p className="text-[var(--ink-muted)]">
                If you find a bug, a calculation error, or something that doesn&rsquo;t look right,
                please email us with the calculator name, the values you entered, and what you
                expected to see. We take accuracy seriously and will investigate promptly.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-[var(--bg-raised)] border border-[var(--border)]">
              <h2 className="font-display font-semibold text-lg text-[var(--ink)] mb-2">
                Suggest a Calculator
              </h2>
              <p className="text-[var(--ink-muted)]">
                Have an idea for a calculator we should build? We&rsquo;re always looking to expand
                our library. Tell us what material or project type you need, and what units would be
                most helpful.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
