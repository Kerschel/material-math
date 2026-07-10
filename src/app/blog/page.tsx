import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Blog — Material Math",
  description: "Tips, guides, and how-tos for your next home improvement project.",
};

export default function BlogPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16 text-center">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">Blog</h1>
      <p className="text-gray-600 mb-8">
        Tips, guides, and how-tos for your next home improvement project. Coming soon!
      </p>
      <Link
        href="/"
        className="text-green-600 hover:text-green-700 underline"
      >
        ← Back to Calculators
      </Link>
    </div>
  );
}
