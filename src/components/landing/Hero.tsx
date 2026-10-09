import { ArrowRight, Globe, MonitorSmartphone } from "lucide-react";
import Link from "next/link";
import type { CSSProperties } from "react";
import { buttonStyles } from "@/components/ui/button-styles";
import { siteConfig } from "@/config/site";
import { DashboardMockup } from "./mockups/DashboardMockup";
import { Container } from "./Section";

const delay = (ms: number) => ({ "--landing-delay": `${ms}ms` }) as CSSProperties;

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative isolate overflow-hidden pb-16 pt-14 sm:pb-24 sm:pt-20">
      <div aria-hidden="true" className="landing-grid absolute inset-0 -z-10 opacity-60" />
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-0 -z-10 h-[420px] w-[min(900px,100%)] -translate-x-1/2 rounded-full bg-primary/20 blur-[120px] dark:bg-primary/25"
      />

      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <p
            className="landing-enter inline-flex items-center gap-2 rounded-full border border-border bg-card/80 px-3 py-1 text-xs font-medium text-muted-foreground shadow-sm backdrop-blur"
            style={delay(0)}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-primary" aria-hidden="true" />
            Gestão de pedidos, clientes e agenda em um só lugar
          </p>

          <h1
            id="hero-title"
            className="landing-enter mt-6 text-4xl font-semibold tracking-tight text-balance text-foreground sm:text-5xl lg:text-6xl"
            style={delay(80)}
          >
            Seu negócio organizado.{" "}
            <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Seu tempo de volta.
            </span>
          </h1>

          <p
            className="landing-enter mx-auto mt-6 max-w-2xl text-base leading-relaxed text-pretty text-muted-foreground sm:text-lg"
            style={delay(160)}
          >
            Clientes, pedidos, orçamentos, agenda e resultados em um só lugar. Simplifique sua gestão e
            tenha mais tempo para fazer seu negócio crescer.
          </p>

          <div
            className="landing-enter mt-9 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center"
            style={delay(240)}
          >
            <Link
              href={siteConfig.routes.register}
              className={buttonStyles({
                size: "lg",
                className:
                  "group gap-2 shadow-lg shadow-primary/25 transition-[transform,background-color,box-shadow] hover:-translate-y-0.5 hover:shadow-xl hover:shadow-primary/30",
              })}
            >
              Começar agora
              <ArrowRight size={18} aria-hidden="true" className="transition-transform group-hover:translate-x-0.5" />
            </Link>
            <a
              href="#funcionalidades"
              className={buttonStyles({
                variant: "outline",
                size: "lg",
                className: "bg-card/70 backdrop-blur transition-[transform,background-color] hover:-translate-y-0.5",
              })}
            >
              Conhecer funcionalidades
            </a>
          </div>

          <ul
            className="landing-enter mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground"
            style={delay(320)}
          >
            <li className="inline-flex items-center gap-2">
              <Globe size={16} aria-hidden="true" className="text-primary" />
              Funciona no navegador, sem instalar nada
            </li>
            <li className="inline-flex items-center gap-2">
              <MonitorSmartphone size={16} aria-hidden="true" className="text-primary" />
              Computador, tablet e celular
            </li>
          </ul>
        </div>

        <div className="landing-enter relative mx-auto mt-14 max-w-5xl sm:mt-16" style={delay(420)}>
          <DashboardMockup />
        </div>
      </Container>
    </section>
  );
}
