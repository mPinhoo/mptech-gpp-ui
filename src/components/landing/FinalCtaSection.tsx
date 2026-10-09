import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { Container } from "./Section";

const ctaBase =
  "inline-flex h-12 items-center justify-center gap-2 rounded-lg px-6 text-base font-medium transition-[transform,background-color,box-shadow] hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-primary";

export function FinalCtaSection() {
  return (
    <section aria-labelledby="cta-final-title" className="py-20 sm:py-28">
      <Container>
        <div className="landing-reveal relative isolate overflow-hidden rounded-3xl bg-primary px-6 py-16 text-center shadow-2xl shadow-primary/20 sm:px-12 sm:py-20">
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 opacity-20 [background-image:linear-gradient(to_right,rgb(255_255_255/0.25)_1px,transparent_1px),linear-gradient(to_bottom,rgb(255_255_255/0.25)_1px,transparent_1px)] [background-size:40px_40px] [mask-image:radial-gradient(ellipse_at_center,#000_30%,transparent_75%)]"
          />
          <div
            aria-hidden="true"
            className="absolute -top-24 left-1/2 -z-10 h-64 w-[min(640px,100%)] -translate-x-1/2 rounded-full bg-white/20 blur-3xl"
          />

          <h2
            id="cta-final-title"
            className="mx-auto max-w-2xl text-3xl font-semibold tracking-tight text-balance text-primary-foreground sm:text-4xl"
          >
            Seu negócio pode ser mais simples de gerenciar.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-pretty text-primary-foreground/85 sm:text-lg">
            Centralize sua operação, organize seus pedidos e tenha mais controle sobre cada etapa do seu
            negócio.
          </p>

          <div className="mt-10 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
            <Link
              href={siteConfig.routes.register}
              className={cn(ctaBase, "group bg-white text-primary shadow-lg hover:bg-white/95 hover:shadow-xl")}
            >
              Começar com o Zentra
              <ArrowRight size={18} aria-hidden="true" className="transition-transform group-hover:translate-x-0.5" />
            </Link>
            <a
              href="#planos"
              className={cn(ctaBase, "border border-white/30 text-primary-foreground hover:bg-white/10")}
            >
              Ver planos e preços
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
