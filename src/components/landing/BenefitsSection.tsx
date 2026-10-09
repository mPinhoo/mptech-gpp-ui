import {
  Eye,
  FileCheck,
  Layers,
  ListChecks,
  Repeat2,
  ShieldCheck,
  SquareKanban,
  type LucideIcon,
} from "lucide-react";
import { IconTile, Container, Section, SectionHeading } from "./Section";

const benefits: { icon: LucideIcon; title: string; description: string }[] = [
  {
    icon: ListChecks,
    title: "Mais organização operacional",
    description: "Cada pedido segue etapas definidas, do orçamento à conclusão.",
  },
  {
    icon: Layers,
    title: "Informações centralizadas",
    description: "Clientes, produtos, pedidos, estoque e agenda no mesmo sistema.",
  },
  {
    icon: Repeat2,
    title: "Menos retrabalho",
    description: "Cadastros reaproveitados e preço sugerido calculado para você.",
  },
  {
    icon: SquareKanban,
    title: "Pedidos acompanhados de perto",
    description: "Quadro de produção e alertas quando o prazo se aproxima.",
  },
  {
    icon: FileCheck,
    title: "Orçamentos fáceis de compartilhar",
    description: "Um link para o cliente revisar e aprovar, sem idas e vindas.",
  },
  {
    icon: Eye,
    title: "Visibilidade da operação",
    description: "Faturamento, despesas e saldo do período em um painel.",
  },
  {
    icon: ShieldCheck,
    title: "Mais controle sobre clientes e produção",
    description: "Histórico organizado e cada etapa registrada em um só lugar.",
  },
];

export function BenefitsSection() {
  return (
    <Section id="beneficios" labelledBy="beneficios-title" className="border-t border-border bg-muted/40">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:gap-16">
          <SectionHeading
            id="beneficios-title"
            eyebrow="Benefícios"
            title="Menos tempo organizando. Mais tempo fazendo o negócio crescer."
            description="O Zentra tira das suas costas o controle manual da operação, para você focar no atendimento e na produção."
            align="left"
            className="lg:sticky lg:top-28 lg:self-start"
          />

          <ul className="grid gap-x-8 gap-y-10 sm:grid-cols-2">
            {benefits.map((benefit) => (
              <li key={benefit.title} className="landing-reveal flex gap-4 sm:last:odd:col-span-2">
                <IconTile>
                  <benefit.icon size={20} />
                </IconTile>
                <div>
                  <h3 className="text-base font-semibold text-foreground">{benefit.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{benefit.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </Section>
  );
}
