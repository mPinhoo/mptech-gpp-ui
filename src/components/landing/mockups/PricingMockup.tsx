import { Sparkles } from "lucide-react";
import { sampleKpis } from "./data";
import { MockupFigure } from "./primitives";

/**
 * Valores coerentes com as fórmulas reais de precificação:
 * subtotal = materiais + mão de obra + custo fixo;
 * custo com taxas = subtotal / (1 − taxas); preço = custo com taxas / (1 − margem).
 */
const breakdown = [
  { label: "Materiais", value: "R$ 12,40" },
  { label: "Mão de obra (30 min)", value: "R$ 7,50" },
  { label: "Custos fixos rateados", value: "R$ 2,10" },
  { label: "Taxas e impostos (10%)", value: "R$ 2,44" },
];

const MARGIN = 35;
const MAX_MARGIN = 80;

const results = [
  { label: "Faturamento", value: sampleKpis[1].value, width: "100%", tone: "bg-primary" },
  { label: "Despesas", value: sampleKpis[2].value, width: "18%", tone: "bg-warning" },
  { label: "Saldo", value: sampleKpis[3].value, width: "82%", tone: "bg-success" },
];

export function PricingMockup() {
  return (
    <MockupFigure label="Cálculo do preço sugerido de um produto a partir de materiais, mão de obra, custos fixos, taxas e margem, e o resumo de faturamento, despesas e saldo do período">
      <div className="grid items-start gap-3 rounded-2xl border border-border bg-card p-4 shadow-[0_24px_64px_-24px_rgb(0_0_0/0.25)] sm:grid-cols-[1.2fr_1fr] sm:p-5">
        <div className="rounded-xl border border-border bg-background p-4">
          <p className="text-[10px] font-medium uppercase tracking-wide text-muted-foreground">Precificação</p>
          <p className="text-sm font-semibold text-foreground">Caneca personalizada</p>

          <dl className="mt-3 space-y-1.5 text-[11px]">
            {breakdown.map((row) => (
              <div key={row.label} className="flex justify-between gap-2">
                <dt className="text-muted-foreground">{row.label}</dt>
                <dd className="tabular-nums text-foreground">{row.value}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-3 border-t border-border pt-3">
            <div className="flex justify-between text-[11px]">
              <span className="text-muted-foreground">Margem de lucro</span>
              <span className="font-semibold text-foreground">{MARGIN}%</span>
            </div>
            <div className="relative mt-2 h-1.5 rounded-full bg-muted">
              <div
                className="absolute inset-y-0 left-0 rounded-full bg-primary"
                style={{ width: `${(MARGIN / MAX_MARGIN) * 100}%` }}
              />
              <div
                className="absolute top-1/2 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-primary bg-background shadow"
                style={{ left: `${(MARGIN / MAX_MARGIN) * 100}%` }}
              />
            </div>
          </div>

          <div className="mt-4 flex flex-wrap items-end justify-between gap-2 rounded-lg bg-primary/10 p-3">
            <div>
              <p className="text-[10px] font-medium text-primary">Preço sugerido</p>
              <p className="whitespace-nowrap text-lg font-bold tracking-tight text-foreground tabular-nums">R$ 37,61</p>
            </div>
            <span className="inline-flex items-center gap-1 whitespace-nowrap rounded-md bg-primary px-2 py-1 text-[10px] font-semibold text-primary-foreground">
              <Sparkles size={11} />
              Usar preço sugerido
            </span>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-background p-4">
          <p className="text-[10px] font-medium uppercase tracking-wide text-muted-foreground">Painel</p>
          <p className="text-sm font-semibold text-foreground">Resultados do mês</p>
          <ul className="mt-5 space-y-5">
            {results.map((result) => (
              <li key={result.label}>
                <div className="flex justify-between gap-2 text-[11px]">
                  <span className="text-muted-foreground">{result.label}</span>
                  <span className="font-semibold tabular-nums text-foreground">{result.value}</span>
                </div>
                <div className="mt-1.5 h-2 rounded-full bg-muted">
                  <div className={`h-2 rounded-full ${result.tone}`} style={{ width: result.width }} />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </MockupFigure>
  );
}
