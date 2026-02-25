import { Card, CardContent } from "@/components/ui/card";

interface Stat {
  zahl: string;
  label: string;
}

interface StatsSectionProps {
  stats: Stat[];
}

export default function StatsSection({ stats }: StatsSectionProps) {
  return (
    <section className="px-6 py-20">
      <div className="mx-auto grid max-w-5xl grid-cols-2 gap-6 md:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label} className="text-center">
            <CardContent className="py-8">
              <div className="text-3xl font-bold text-primary md:text-4xl">
                {stat.zahl}
              </div>
              <div className="mt-2 text-sm text-muted-foreground">
                {stat.label}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
