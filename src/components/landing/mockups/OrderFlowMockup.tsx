import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { sampleOrder } from "./data";
import { MockupFigure, StatusPill } from "./primitives";

const steps = [
  { title: "Pedido criado", detail: "Status Pendente", state: "done" },
  { title: "Orçamento enviado", detail: "Link compartilhado com o cliente", state: "done" },
  { title: "Aprovado pelo cliente", detail: "Entra na Área de Trabalho", state: "done" },
  { title: "Em produção", detail: "Acompanhe no quadro Kanban", state: "current" },
  { title: "Concluído", detail: "Arquivado ao finalizar", state: "next" },
] as const;

export function OrderFlowMockup() {
  return (
    <MockupFigure label="Pedido com itens, extras e total, ao lado da linha do tempo do pedido, da criação à conclusão">
      <div className="grid gap-4 rounded-2xl border border-border bg-card p-4 shadow-[0_24px_64px_-24px_rgb(0_0_0/0.25)] sm:grid-cols-[1.1fr_1fr] sm:p-5">
        <div className="rounded-xl border border-border bg-background p-4">
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="text-sm font-semibold text-foreground">{sampleOrder.numero}</p>
              <p className="text-xs text-muted-foreground">{sampleOrder.cliente}</p>
            </div>
            <StatusPill tone="primary">Em Produção</StatusPill>
          </div>
          <ul className="mt-4 space-y-2 border-t border-border pt-3">
            {sampleOrder.itens.map((item) => (
              <li key={item.nome} className="flex items-baseline justify-between gap-3 text-xs">
                <span className="min-w-0 truncate text-foreground">
                  <span className="text-muted-foreground">{item.quantidade}×</span> {item.nome}
                </span>
                <span className="shrink-0 tabular-nums text-foreground">{item.subtotal}</span>
              </li>
            ))}
            {sampleOrder.extras.map((extra) => (
              <li key={extra.nome} className="flex items-baseline justify-between gap-3 text-xs">
                <span className="text-muted-foreground">Extra · {extra.nome}</span>
                <span className="shrink-0 tabular-nums text-foreground">{extra.valor}</span>
              </li>
            ))}
          </ul>
          <div className="mt-3 flex items-baseline justify-between border-t border-border pt-3">
            <span className="text-xs font-medium text-muted-foreground">Total</span>
            <span className="text-base font-bold tabular-nums text-foreground">{sampleOrder.total}</span>
          </div>
          <div className="mt-3 grid grid-cols-2 gap-2 text-[10px]">
            <div className="rounded-md bg-muted px-2 py-1.5">
              <p className="text-muted-foreground">Data do pedido</p>
              <p className="font-medium text-foreground">02/10</p>
            </div>
            <div className="rounded-md bg-muted px-2 py-1.5">
              <p className="text-muted-foreground">Prazo de entrega</p>
              <p className="font-medium text-foreground">18/10</p>
            </div>
          </div>
        </div>

        <ol className="relative space-y-4 py-1 pl-1">
          {steps.map((step, index) => (
            <li key={step.title} className="relative flex gap-3">
              {index < steps.length - 1 && (
                <span
                  className={cn(
                    "absolute left-[11px] top-6 h-[calc(100%+0.25rem)] w-px",
                    step.state === "done" ? "bg-primary/40" : "bg-border"
                  )}
                />
              )}
              <span
                className={cn(
                  "relative z-10 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[10px] font-semibold",
                  step.state === "done" && "bg-primary text-primary-foreground",
                  step.state === "current" && "bg-background text-primary ring-2 ring-primary",
                  step.state === "next" && "bg-muted text-muted-foreground ring-1 ring-border"
                )}
              >
                {step.state === "done" ? <Check size={12} strokeWidth={3} /> : index + 1}
              </span>
              <div className="min-w-0 pt-0.5">
                <p
                  className={cn(
                    "text-xs font-semibold",
                    step.state === "next" ? "text-muted-foreground" : "text-foreground"
                  )}
                >
                  {step.title}
                </p>
                <p className="text-[11px] text-muted-foreground">{step.detail}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </MockupFigure>
  );
}
