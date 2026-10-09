import { Check } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { AgendaMockup } from "./mockups/AgendaMockup";
import { ApprovalMockup } from "./mockups/ApprovalMockup";
import { OrderFlowMockup } from "./mockups/OrderFlowMockup";
import { PricingMockup } from "./mockups/PricingMockup";
import { Container, Section, SectionHeading } from "./Section";

interface Highlight {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  points: string[];
  visual: ReactNode;
}

const highlights: Highlight[] = [
  {
    id: "destaque-pedido",
    eyebrow: "Ciclo do pedido",
    title: "Organize o ciclo completo de cada pedido.",
    description:
      "Do orçamento à entrega, cada pedido passa por etapas claras. Você sabe o que foi aprovado, o que está em produção e o que já foi concluído.",
    points: [
      "Pedido criado com itens, extras, data e prazo de entrega",
      "Aprovação do cliente leva o pedido direto para a produção",
      "Pedidos finalizados são arquivados e saem do quadro",
    ],
    visual: <OrderFlowMockup />,
  },
  {
    id: "destaque-orcamento",
    eyebrow: "Aprovação online",
    title: "Crie e compartilhe orçamentos com mais facilidade.",
    description:
      "Gere um link exclusivo para o pedido e envie pelo canal que preferir. O cliente vê os itens, os extras e o total, e aprova sem precisar de cadastro.",
    points: [
      "Link de orçamento pronto para copiar e compartilhar",
      "Aprovação com um clique, direto no celular do cliente",
      "Notificação no Zentra assim que o pedido é aprovado",
    ],
    visual: <ApprovalMockup />,
  },
  {
    id: "destaque-agenda",
    eyebrow: "Agenda e operação",
    title: "Tenha sua agenda e sua operação sob controle.",
    description:
      "Os prazos de entrega aparecem automaticamente no calendário, ao lado dos seus lembretes. E pedidos em produção com entrega próxima geram alerta.",
    points: [
      "Calendário mensal com pedidos por data de entrega",
      "Lembretes com aviso no horário definido",
      "Alerta quando um pedido em produção está perto do prazo",
    ],
    visual: <AgendaMockup />,
  },
  {
    id: "destaque-resultados",
    eyebrow: "Preço e resultados",
    title: "Acompanhe o desempenho do negócio.",
    description:
      "Calcule o preço de cada produto com base nos seus custos e veja no painel quanto entrou, quanto saiu e qual é o saldo do período.",
    points: [
      "Preço sugerido com materiais, mão de obra, custos fixos, taxas e margem",
      "Despesas registradas automaticamente a cada entrada de estoque",
      "Comparação com o período anterior",
    ],
    visual: <PricingMockup />,
  },
];

export function HighlightsSection() {
  return (
    <Section labelledBy="destaques-title" className="border-t border-border bg-muted/40">
      <Container>
        <SectionHeading
          id="destaques-title"
          eyebrow="Na prática"
          title="Veja como o Zentra organiza o dia a dia."
          description="Os principais fluxos do produto, do orçamento ao resultado do mês."
        />

        <div className="mt-20 space-y-24 sm:space-y-32">
          {highlights.map((highlight, index) => (
            <article
              key={highlight.id}
              aria-labelledby={highlight.id}
              className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16"
            >
              <div className={cn("landing-reveal", index % 2 === 1 && "lg:order-last")}>
                <p className="text-sm font-semibold text-primary">{highlight.eyebrow}</p>
                <h3
                  id={highlight.id}
                  className="mt-3 text-2xl font-semibold tracking-tight text-balance text-foreground sm:text-3xl"
                >
                  {highlight.title}
                </h3>
                <p className="mt-4 text-base leading-relaxed text-pretty text-muted-foreground">
                  {highlight.description}
                </p>
                <ul className="mt-6 space-y-3">
                  {highlight.points.map((point) => (
                    <li key={point} className="flex items-start gap-3 text-sm text-foreground">
                      <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <Check size={12} strokeWidth={3} aria-hidden="true" />
                      </span>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="landing-reveal min-w-0">{highlight.visual}</div>
            </article>
          ))}
        </div>
      </Container>
    </Section>
  );
}
