import { Cloud, Globe, MonitorSmartphone, type LucideIcon } from "lucide-react";
import { DevicesMockup } from "./mockups/DevicesMockup";
import { IconTile, Container, Section, SectionHeading } from "./Section";

const points: { icon: LucideIcon; title: string; description: string }[] = [
  {
    icon: Globe,
    title: "Direto no navegador",
    description: "Sem instalação. Acesse com seu e-mail e senha pelo navegador que você já usa.",
  },
  {
    icon: MonitorSmartphone,
    title: "Interface que se adapta",
    description: "No computador, menu lateral fixo. No celular, o menu abre como um painel deslizante.",
  },
  {
    icon: Cloud,
    title: "Mesmos dados em qualquer lugar",
    description: "Suas informações ficam na nuvem e aparecem iguais em todos os dispositivos.",
  },
];

export function ResponsiveSection() {
  return (
    <Section labelledBy="responsivo-title">
      <Container>
        <SectionHeading
          id="responsivo-title"
          eyebrow="Computador, tablet e celular"
          title="Seu negócio acompanha você."
          description="Confira um pedido no balcão, aprove um orçamento na rua ou revise a agenda em casa, no aparelho que estiver à mão."
        />

        <div className="landing-reveal mt-16">
          <DevicesMockup />
        </div>

        <ul className="mt-16 grid gap-8 sm:grid-cols-3">
          {points.map((point) => (
            <li key={point.title} className="landing-reveal flex flex-col items-center text-center">
              <IconTile>
                <point.icon size={20} />
              </IconTile>
              <h3 className="mt-4 text-base font-semibold text-foreground">{point.title}</h3>
              <p className="mt-2 max-w-xs text-sm leading-relaxed text-muted-foreground">{point.description}</p>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
