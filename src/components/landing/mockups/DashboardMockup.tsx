import {
  Bell,
  Boxes,
  Calculator,
  CalendarDays,
  House,
  Package,
  Receipt,
  ShoppingCart,
  SquareKanban,
  TrendingUp,
  TriangleAlert,
  Users,
  Wallet,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ZentraMark } from "../ZentraLogo";
import { sampleKpis } from "./data";
import { KanbanBoardMock } from "./KanbanBoardMock";
import { AppWindow, FloatingCard, MockupFigure } from "./primitives";

/** Menus reais do Zentra, na ordem do RBAC. */
const menu: { label: string; icon: LucideIcon }[] = [
  { label: "Home", icon: House },
  { label: "Agenda", icon: CalendarDays },
  { label: "Pedidos", icon: ShoppingCart },
  { label: "Área de Trabalho", icon: SquareKanban },
  { label: "Produtos", icon: Package },
  { label: "Clientes", icon: Users },
  { label: "Estoque", icon: Boxes },
  { label: "Precificação", icon: Calculator },
];

const kpiIcons: LucideIcon[] = [ShoppingCart, TrendingUp, Receipt, Wallet];

export function DashboardMockup({ className }: { className?: string }) {
  return (
    <MockupFigure
      className={className}
      label="Tela inicial do Zentra com menu lateral, indicadores de pedidos, faturamento, despesas e saldo, e o quadro de produção"
    >
      <div className="relative">
        <AppWindow title="Home">
          <div className="grid md:grid-cols-[176px_1fr]">
            <aside className="hidden border-r border-border bg-sidebar p-3 md:block">
              <div className="mb-4 flex items-center gap-2 px-1">
                <ZentraMark className="h-6 w-6" />
                <span className="text-xs font-semibold text-sidebar-foreground">Zentra</span>
              </div>
              <ul className="space-y-0.5">
                {menu.map(({ label, icon: Icon }, index) => (
                  <li
                    key={label}
                    className={cn(
                      "flex items-center gap-2 rounded-md px-2 py-1.5 text-[11px] font-medium",
                      index === 0 ? "bg-primary/10 text-primary" : "text-sidebar-foreground"
                    )}
                  >
                    <Icon size={13} className="shrink-0" />
                    <span className="truncate">{label}</span>
                  </li>
                ))}
              </ul>
            </aside>

            <div className="min-w-0 p-3 sm:p-4">
              <div className="mb-3 flex items-center justify-between gap-2">
                <div>
                  <p className="text-sm font-semibold text-foreground">Home</p>
                  <p className="text-[10px] text-muted-foreground">Visão geral do período</p>
                </div>
                <span className="inline-flex items-center gap-1 rounded-md border border-border bg-background px-2 py-1 text-[10px] text-muted-foreground">
                  <CalendarDays size={11} />
                  Este mês
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 lg:grid-cols-4">
                {sampleKpis.map((kpi, index) => {
                  const Icon = kpiIcons[index];
                  return (
                    <div key={kpi.label} className="rounded-lg border border-border bg-card p-2.5 shadow-sm">
                      <div className="flex items-start justify-between gap-1">
                        <span className="text-[10px] font-medium text-muted-foreground">{kpi.label}</span>
                        <span className="inline-flex h-5 w-5 items-center justify-center rounded bg-primary/10 text-primary">
                          <Icon size={11} />
                        </span>
                      </div>
                      <p className="mt-1 text-sm font-bold tracking-tight text-card-foreground">{kpi.value}</p>
                    </div>
                  );
                })}
              </div>

              <div className="mt-3 hidden sm:block">
                <p className="mb-2 text-[11px] font-semibold text-foreground">Área de Trabalho</p>
                <KanbanBoardMock />
              </div>
            </div>
          </div>
        </AppWindow>

        <FloatingCard
          className="absolute -right-3 -top-7 hidden lg:flex xl:-right-12"
          tone="success"
          icon={<Bell size={15} />}
          title="Pedido aprovado"
          description="Marina Alves aprovou o pedido PED-0042."
        />
        <FloatingCard
          className="absolute -bottom-9 -left-3 hidden lg:flex xl:-left-12"
          tone="danger"
          icon={<TriangleAlert size={15} />}
          title="Alerta de prazo"
          description="PED-0041 vence amanhã e está em produção."
          delay={1500}
        />
      </div>
    </MockupFigure>
  );
}
