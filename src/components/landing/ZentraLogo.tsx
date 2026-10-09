import { cn } from "@/lib/utils";

/**
 * Marca provisória do Zentra (nenhum arquivo de logotipo oficial foi encontrado
 * no repositório). Substitua o SVG pelo logotipo oficial quando disponível.
 */
export function ZentraMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={cn("h-8 w-8 shrink-0", className)} aria-hidden="true">
      <rect width="32" height="32" rx="9" className="fill-primary" />
      <rect
        x="0.75"
        y="0.75"
        width="30.5"
        height="30.5"
        rx="8.25"
        fill="none"
        strokeWidth="1.5"
        className="stroke-white/15"
      />
      <path
        d="M10.5 10.5h11L10.5 21.5h11"
        fill="none"
        strokeWidth="2.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="stroke-primary-foreground"
      />
    </svg>
  );
}

export function ZentraLogo({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <ZentraMark />
      <span className="text-lg font-semibold tracking-tight text-foreground">Zentra</span>
    </span>
  );
}
