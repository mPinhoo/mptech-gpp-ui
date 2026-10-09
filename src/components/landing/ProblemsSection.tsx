import { ArrowRight, CircleCheck, CircleX } from "lucide-react";
import { ZentraMark } from "./ZentraLogo";
import { Container, Section, SectionHeading } from "./Section";

const comparisons = [
  {
    problem: "Pedidos espalhados entre conversas, cadernos e planilhas.",
    solution: "Todos os pedidos em um só lugar, com número, cliente, itens e prazo de entrega.",
  },
  {
    problem: "Orçamentos enviados sem saber se o cliente aprovou.",
    solution: "Orçamento enviado por link e aprovado pelo cliente, com aviso para você.",
  },
  {
    problem: "Prazos de entrega e compromissos anotados em lugares diferentes.",
    solution: "Agenda com prazos de entrega e lembretes no mesmo calendário.",
  },
  {
    problem: "Sem clareza de quanto entrou, quanto saiu e quanto sobrou.",
    solution: "Painel com faturamento, despesas e saldo do período escolhido.",
  },
  {
    problem: "Dados do cliente digitados de novo a cada venda.",
    solution: "Cadastro único de clientes, reaproveitado em cada novo pedido.",
  },
  {
    problem: "Difícil saber em que etapa está cada pedido.",
    solution: "Quadro de produção que mostra a etapa de cada pedido aprovado.",
  },
];

export function ProblemsSection() {
  return (
    <Section labelledBy="problemas-title" className="border-t border-border bg-muted/40">
      <Container>
        <SectionHeading
          id="problemas-title"
          eyebrow="Por que o Zentra"
          title="Seu negócio merece mais do que planilhas e mensagens perdidas."
          description="Quando a operação depende de memória, conversas e anotações soltas, detalhes se perdem. O Zentra reúne tudo em um fluxo único."
        />

        <div className="landing-reveal mt-14 overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
          <div className="hidden grid-cols-[1fr_auto_1fr] items-center border-b border-border bg-muted/50 text-sm font-semibold md:grid">
            <p className="px-6 py-4 text-muted-foreground">Sem uma central de gestão</p>
            <span className="w-10" />
            <p className="flex items-center gap-2 px-6 py-4 text-foreground">
              <ZentraMark className="h-5 w-5" />
              Com o Zentra
            </p>
          </div>

          <ul className="divide-y divide-border">
            {comparisons.map((item) => (
              <li
                key={item.problem}
                className="grid gap-3 px-5 py-5 transition-colors hover:bg-muted/30 md:grid-cols-[1fr_auto_1fr] md:items-center md:gap-0 md:px-0 md:py-0"
              >
                <p className="flex items-start gap-3 text-sm leading-relaxed text-muted-foreground md:px-6 md:py-5">
                  <CircleX size={18} aria-hidden="true" className="mt-0.5 shrink-0 text-muted-foreground/70" />
                  <span>
                    <span className="sr-only">Sem uma central: </span>
                    {item.problem}
                  </span>
                </p>
                <ArrowRight
                  size={16}
                  aria-hidden="true"
                  className="mx-auto hidden w-10 text-muted-foreground/60 md:block"
                />
                <p className="flex items-start gap-3 text-sm font-medium leading-relaxed text-foreground md:px-6 md:py-5">
                  <CircleCheck size={18} aria-hidden="true" className="mt-0.5 shrink-0 text-primary" />
                  <span>
                    <span className="sr-only">Com o Zentra: </span>
                    {item.solution}
                  </span>
                </p>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </Section>
  );
}
