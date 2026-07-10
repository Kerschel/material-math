import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface CalculatorCardProps {
  title: string;
  description: string;
  icon: string;
  href: string;
}

export function CalculatorCard({ title, description, icon, href }: CalculatorCardProps) {
  return (
    <Link href={href} className="block group">
      <Card className="h-full transition-shadow hover:shadow-lg hover:border-green-400 cursor-pointer">
        <CardHeader className="pb-2">
          <span className="text-3xl">{icon}</span>
          <CardTitle className="text-lg group-hover:text-green-700 transition-colors">
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription className="text-sm text-gray-600">
            {description}
          </CardDescription>
          <span className="inline-block mt-3 text-sm font-medium text-green-600 group-hover:underline">
            Calculate →
          </span>
        </CardContent>
      </Card>
    </Link>
  );
}
