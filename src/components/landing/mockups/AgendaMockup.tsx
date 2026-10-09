import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { MockupFigure } from "./primitives";

const weekdays = ["D", "S", "T", "Q", "Q", "S", "S"];
const FIRST_WEEKDAY = 4;
const DAYS_IN_MONTH = 31;
const TODAY = 9;

/** Pedidos por prazo de entrega (amarelo) e lembretes (azul), como na agenda real. */
const pedidosPorDia: Record<number, number> = { 10: 1, 13: 1, 16: 1, 18: 2, 23: 1 };
const lembretesPorDia: Record<number, number> = { 9: 2, 14: 1, 21: 1, 27: 1 };

const today = [
  { tipo: "Lembrete", titulo: "Ligar para o fornecedor", hora: "14:00", tone: "primary" },
  { tipo: "Lembrete", titulo: "Separar embalagens", hora: "16:30", tone: "primary" },
  { tipo: "Entrega amanhã", titulo: "PED-0041 · Rafael Lima", hora: "10/10", tone: "warning" },
] as const;

export function AgendaMockup() {
  const cells = [
    ...Array.from({ length: FIRST_WEEKDAY }, () => null),
    ...Array.from({ length: DAYS_IN_MONTH }, (_, index) => index + 1),
  ];

  return (
    <MockupFigure label="Agenda mensal com prazos de entrega e lembretes marcados nos dias, e a lista de compromissos do dia">
      <div className="grid gap-3 rounded-2xl border border-border bg-card p-4 shadow-[0_24px_64px_-24px_rgb(0_0_0/0.25)] sm:grid-cols-[1.25fr_1fr] sm:p-5">
        <div className="rounded-xl border border-border bg-background p-3">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-sm font-semibold text-foreground">Outubro</p>
            <div className="flex gap-1 text-muted-foreground">
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-md border border-border">
                <ChevronLeft size={12} />
              </span>
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-md border border-border">
                <ChevronRight size={12} />
              </span>
            </div>
          </div>
          <div className="grid grid-cols-7 gap-1 text-center">
            {weekdays.map((day, index) => (
              <span key={index} className="pb-1 text-[10px] font-medium text-muted-foreground">
                {day}
              </span>
            ))}
            {cells.map((day, index) => (
              <div
                key={index}
                className={cn(
                  "flex aspect-square flex-col items-center justify-center rounded-md text-[10px]",
                  day === TODAY ? "bg-primary font-semibold text-primary-foreground" : "text-foreground"
                )}
              >
                {day}
                {day && (pedidosPorDia[day] || lembretesPorDia[day]) ? (
                  <span className="mt-0.5 flex gap-0.5">
                    {pedidosPorDia[day] ? (
                      <span className={cn("h-1 w-1 rounded-full", day === TODAY ? "bg-primary-foreground" : "bg-warning")} />
                    ) : null}
                    {lembretesPorDia[day] ? (
                      <span className={cn("h-1 w-1 rounded-full", day === TODAY ? "bg-primary-foreground" : "bg-primary")} />
                    ) : null}
                  </span>
                ) : null}
              </div>
            ))}
          </div>
          <div className="mt-3 flex gap-4 border-t border-border pt-2 text-[10px] text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-warning" /> Pedidos
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" /> Lembretes
            </span>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-background p-3">
          <p className="text-xs font-semibold text-foreground">Hoje, 9 de outubro</p>
          <ul className="mt-3 space-y-2">
            {today.map((item) => (
              <li key={item.titulo} className="flex gap-2.5 rounded-lg border border-border p-2">
                <span
                  className={cn(
                    "mt-0.5 w-1 shrink-0 rounded-full",
                    item.tone === "warning" ? "bg-warning" : "bg-primary"
                  )}
                />
                <div className="min-w-0 flex-1">
                  <p className="text-[10px] font-medium text-muted-foreground">{item.tipo}</p>
                  <p className="truncate text-[11px] font-medium text-foreground">{item.titulo}</p>
                </div>
                <span className="shrink-0 text-[10px] tabular-nums text-muted-foreground">{item.hora}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </MockupFigure>
  );
}
