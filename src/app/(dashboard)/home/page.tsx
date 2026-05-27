"use client";

import { ShoppingCart, TrendingUp, TrendingDown, Wallet } from "lucide-react";
import { StatCard } from "@/components/dashboard/StatCard";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui";
import { Chart } from "@/components/ui";

const stats = [
  {
    title: "Pedidos",
    value: "128",
    icon: ShoppingCart,
    trend: { value: 12.5, positive: true },
  },
  {
    title: "Faturamento",
    value: "R$ 45.230,00",
    icon: TrendingUp,
    trend: { value: 8.2, positive: true },
  },
  {
    title: "Despesas",
    value: "R$ 12.480,00",
    icon: TrendingDown,
    trend: { value: 3.1, positive: false },
  },
  {
    title: "Saldo do Mês",
    value: "R$ 32.750,00",
    icon: Wallet,
    trend: { value: 15.3, positive: true },
  },
];

const revenueData = [
  { mes: "Jan", faturamento: 32000, despesas: 12000 },
  { mes: "Fev", faturamento: 28000, despesas: 11500 },
  { mes: "Mar", faturamento: 35000, despesas: 13000 },
  { mes: "Abr", faturamento: 40000, despesas: 12800 },
  { mes: "Mai", faturamento: 45230, despesas: 12480 },
];

export default function HomePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Visão geral do seu negócio
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Faturamento vs Despesas</CardTitle>
        </CardHeader>
        <CardContent>
          <Chart
            type="area"
            data={revenueData}
            xAxisKey="mes"
            series={[
              { dataKey: "faturamento", name: "Faturamento", color: "oklch(0.45 0.2 264)" },
              { dataKey: "despesas", name: "Despesas", color: "oklch(0.55 0.2 27)" },
            ]}
            height={320}
          />
        </CardContent>
      </Card>
    </div>
  );
}
