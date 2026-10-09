import { ChevronDown } from "lucide-react";
import { publishedFaqItems } from "@/config/site";
import { Container, Section, SectionHeading } from "./Section";

/** Accordion nativo (`<details>`): acessível por teclado e leitores de tela, sem JavaScript. */
export function FaqSection() {
  return (
    <Section id="faq" labelledBy="faq-title">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:gap-16">
          <SectionHeading
            id="faq-title"
            eyebrow="Perguntas frequentes"
            title="Ficou com alguma dúvida?"
            description="Reunimos as respostas para as perguntas mais comuns sobre o Zentra."
            align="left"
            className="lg:sticky lg:top-28 lg:self-start"
          />

          <div className="landing-reveal divide-y divide-border rounded-2xl border border-border bg-card px-5 shadow-sm sm:px-6">
            {publishedFaqItems.map((item) => (
              <details key={item.question} className="group py-1">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 rounded-lg py-4 text-left text-base font-medium text-foreground transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring [&::-webkit-details-marker]:hidden">
                  {item.question}
                  <ChevronDown
                    size={18}
                    aria-hidden="true"
                    className="shrink-0 text-muted-foreground transition-transform duration-200 group-open:rotate-180"
                  />
                </summary>
                <p className="pb-5 pr-8 text-sm leading-relaxed text-muted-foreground">{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
