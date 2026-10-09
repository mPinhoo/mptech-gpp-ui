import { Bell, CircleCheck, Link2 } from "lucide-react";
import { sampleOrder } from "./data";
import { FloatingCard, MockupFigure, PhoneFrame } from "./primitives";

export function ApprovalMockup() {
  return (
    <MockupFigure label="Página de aprovação aberta pelo cliente no celular, com itens, extras, total e botão para aprovar, e a notificação recebida após a aprovação">
      <div className="relative mx-auto flex max-w-md justify-center px-2 pb-16 pt-10 sm:px-10">
        <div className="absolute inset-x-6 bottom-0 top-6 rounded-3xl bg-gradient-to-b from-primary/10 to-transparent" />

        <div className="absolute left-0 top-0 z-20 flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-[11px] font-medium text-foreground shadow-md sm:left-2">
          <Link2 size={13} className="text-primary" />
          Link do orçamento copiado
        </div>

        <PhoneFrame className="relative z-10 w-[240px]">
          <div className="px-4 pb-5 pt-9">
            <p className="text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
              Orçamento
            </p>
            <p className="text-sm font-semibold text-foreground">Pedido {sampleOrder.numero}</p>
            <p className="text-[11px] text-muted-foreground">Para {sampleOrder.cliente}</p>

            <ul className="mt-4 space-y-2.5">
              {sampleOrder.itens.map((item) => (
                <li key={item.nome} className="rounded-lg border border-border p-2">
                  <p className="text-[11px] font-medium leading-tight text-foreground">{item.nome}</p>
                  <div className="mt-0.5 flex justify-between text-[10px] text-muted-foreground">
                    <span>Qtd. {item.quantidade}</span>
                    <span className="tabular-nums">{item.subtotal}</span>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-3 space-y-1 text-[10px]">
              {sampleOrder.extras.map((extra) => (
                <div key={extra.nome} className="flex justify-between text-muted-foreground">
                  <span>{extra.nome}</span>
                  <span className="tabular-nums">{extra.valor}</span>
                </div>
              ))}
              <div className="flex justify-between border-t border-border pt-1.5 text-xs font-semibold text-foreground">
                <span>Total</span>
                <span className="tabular-nums">{sampleOrder.total}</span>
              </div>
            </div>

            <div className="mt-4 flex h-9 items-center justify-center gap-1.5 rounded-lg bg-primary text-xs font-semibold text-primary-foreground shadow-sm">
              <CircleCheck size={14} />
              Aprovar pedido
            </div>
          </div>
        </PhoneFrame>

        <FloatingCard
          className="absolute bottom-0 right-0 z-20 w-56 sm:-right-2"
          tone="success"
          icon={<Bell size={15} />}
          title="Pedido aprovado"
          description={`${sampleOrder.cliente} aprovou o ${sampleOrder.numero}.`}
          delay={800}
        />
      </div>
    </MockupFigure>
  );
}
