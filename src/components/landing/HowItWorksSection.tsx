import { ChartColumn, ClipboardList, Send, UserPlus, type LucideIcon } from "lucide-react";
import { Container, Section, SectionHeading } from "./Section";

const steps: { icon: LucideIcon; title: string; description: string }[] = [
  {
    icon: UserPlus,
    title: "Crie sua conta",
    description:
      "Cadastre-se com nome, e-mail e senha. Sua Área de Trabalho já vem com as etapas Aguardando Produção, Em Produção e Finalizado.",
  },
  {
    icon: ClipboardList,
    title: "Organize suas informações",
    description:
      "Configure seus custos na precificação e cadastre clientes, produtos e materiais de estoque.",
  },
  {
    icon: Send,
    title: "Gerencie sua operação",
    description:
      "Crie pedidos, envie o orçamento por link para aprovação e acompanhe a produção no quadro.",
  },
  {
    icon: ChartColumn,
    title: "Acompanhe seus resultados",
    description:
      "Veja faturamento, despesas e saldo no painel e receba alertas de prazo e de pedidos aprovados.",
  },
];

export function HowItWorksSection() {
  return (
    <Section id="como-funciona" labelledBy="como-funciona-title">
      <Container>
        <SectionHeading
          id="como-funciona-title"
          eyebrow="Como funciona"
          title="Comece a organizar seu negócio em poucos passos."
        />

        <div className="relative mt-16">
          <span
            aria-hidden="true"
            className="absolute left-[12.5%] right-[12.5%] top-6 hidden h-px bg-gradient-to-r from-primary/10 via-primary/40 to-primary/10 lg:block"
          />
          <ol className="relative grid gap-6 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            {steps.map((step, index) => (
              <li
                key={step.title}
                className="landing-reveal relative rounded-xl border border-border bg-card p-6 shadow-sm lg:border-0 lg:bg-transparent lg:p-0 lg:text-center lg:shadow-none"
              >
                <span className="relative z-10 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-lg shadow-primary/25 ring-4 ring-background">
                  <step.icon size={22} aria-hidden="true" />
                </span>
                <p className="mt-5 text-xs font-semibold uppercase tracking-wider text-primary">
                  Passo {index + 1}
                </p>
                <h3 className="mt-1.5 text-lg font-semibold text-foreground">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </Section>
  );
}
