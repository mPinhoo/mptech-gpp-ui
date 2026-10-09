import Link from "next/link";
import { landingNav, legalLinks, siteConfig } from "@/config/site";
import { Container } from "./Section";
import { ZentraLogo } from "./ZentraLogo";

const linkClass =
  "rounded text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

const productLinks = landingNav.filter((item) => item.href !== "#beneficios");

const accountLinks = [
  { href: siteConfig.routes.login, label: "Entrar" },
  { href: siteConfig.routes.register, label: "Criar conta" },
];

/** Links jurídicos e de suporte só aparecem quando possuem destino real. */
const publishedLegalLinks = legalLinks.filter(
  (link): link is { label: string; href: string } => link.href !== null
);

export function LandingFooter() {
  return (
    <footer className="border-t border-border bg-muted/40">
      <Container className="py-14">
        <div className="grid gap-10 md:grid-cols-[minmax(0,2fr)_repeat(3,minmax(0,1fr))]">
          <div className="max-w-sm">
            <Link
              href="/"
              aria-label="Zentra — página inicial"
              className="inline-flex rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <ZentraLogo />
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Plataforma para organizar clientes, pedidos, orçamentos, agenda, produção e resultados de
              pequenos negócios em um só lugar.
            </p>
          </div>

          <nav aria-label="Produto">
            <h2 className="text-sm font-semibold text-foreground">Produto</h2>
            <ul className="mt-4 space-y-3">
              {productLinks.map((item) => (
                <li key={item.href}>
                  <a href={item.href} className={linkClass}>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Conta">
            <h2 className="text-sm font-semibold text-foreground">Conta</h2>
            <ul className="mt-4 space-y-3">
              {accountLinks.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={linkClass}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {publishedLegalLinks.length > 0 && (
            <nav aria-label="Institucional">
              <h2 className="text-sm font-semibold text-foreground">Institucional</h2>
              <ul className="mt-4 space-y-3">
                {publishedLegalLinks.map((item) => (
                  <li key={item.label}>
                    <Link href={item.href} className={linkClass}>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          )}
        </div>

        <div className="mt-12 border-t border-border pt-6 text-xs text-muted-foreground">
          © {new Date().getFullYear()} {siteConfig.name}. Todos os direitos reservados.
        </div>
      </Container>
    </footer>
  );
}
