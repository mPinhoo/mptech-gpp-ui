"use client";

import { ShoppingCart, TrendingUp, TrendingDown, Wallet } from "lucide-react";
import { StatCard } from "@/components/dashboard/StatCard";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui";
import { Chart } from "@/components/ui";
import { useApi } from "@/hooks/useApi";
import type { DashboardStats, ChartData } from "@/types";

function formatCurrency(value: number) {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

export default function HomePage() {
  const { data: stats, loading: loadingStats } = useApi<DashboardStats>("/dashboard/stats");
  const { data: chartData, loading: loadingChart } = useApi<ChartData[]>("/dashboard/chart");

  if (loadingStats || loadingChart) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
          <p className="text-sm text-muted-foreground mt-1">Visão geral do seu negócio</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-32 rounded-xl border border-border bg-card animate-pulse" />
          ))}
        </div>
        <div className="h-[400px] rounded-xl border border-border bg-card animate-pulse" />
      </div>
    );
  }

  const statCards = stats
    ? [
        {
          title: "Pedidos",
          value: String(stats.totalPedidos),
          icon: ShoppingCart,
          trend: { value: Math.abs(stats.trends.pedidos), positive: stats.trends.pedidos >= 0 },
        },
        {
          title: "Faturamento",
          value: formatCurrency(stats.faturamento),
          icon: TrendingUp,
          trend: { value: Math.abs(stats.trends.faturamento), positive: stats.trends.faturamento >= 0 },
        },
        {
          title: "Despesas",
          value: formatCurrency(stats.despesas),
          icon: TrendingDown,
          trend: { value: 3.1, positive: false },
        },
        {
          title: "Saldo do Mês",
          value: formatCurrency(stats.saldoMes),
          icon: Wallet,
          trend: { value: Math.abs(stats.trends.faturamento), positive: stats.saldoMes >= 0 },
        },
      ]
    : [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Visão geral do seu negócio
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat) => (
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
            data={chartData || []}
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
