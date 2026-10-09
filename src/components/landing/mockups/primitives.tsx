import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Envolve uma ilustração de interface: o conteúdo visual fica oculto para
 * leitores de tela e a legenda deixa explícito que os dados são fictícios.
 */
export function MockupFigure({
  label,
  children,
  className,
}: {
  label: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <figure className={className}>
      <div aria-hidden="true" className="select-none">
        {children}
      </div>
      <figcaption className="mt-4 text-center text-xs text-muted-foreground">
        <span className="sr-only">{label}. </span>
        Ilustração com dados fictícios
      </figcaption>
    </figure>
  );
}

export function AppWindow({
  title,
  className,
  children,
}: {
  title: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-xl border border-border bg-card shadow-[0_24px_64px_-24px_rgb(0_0_0/0.25)] ring-1 ring-black/[0.02]",
        className
      )}
    >
      <div className="flex h-9 items-center gap-3 border-b border-border bg-muted/60 px-3">
        <div className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-border" />
          <span className="h-2.5 w-2.5 rounded-full bg-border" />
          <span className="h-2.5 w-2.5 rounded-full bg-border" />
        </div>
        <div className="mx-auto flex h-5 min-w-0 max-w-[60%] items-center rounded-md bg-background px-3 text-[10px] text-muted-foreground ring-1 ring-border">
          <span className="truncate">Zentra · {title}</span>
        </div>
        <div className="w-[42px]" />
      </div>
      {children}
    </div>
  );
}

export function PhoneFrame({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <div
      className={cn(
        "rounded-[2.25rem] border border-border bg-card p-2 shadow-[0_24px_64px_-20px_rgb(0_0_0/0.35)]",
        className
      )}
    >
      <div className="relative overflow-hidden rounded-[1.75rem] bg-background ring-1 ring-border">
        <div className="absolute left-1/2 top-2 z-10 h-4 w-16 -translate-x-1/2 rounded-full bg-foreground/90" />
        {children}
      </div>
    </div>
  );
}

type Tone = "warning" | "success" | "primary" | "neutral" | "danger";

const toneStyles: Record<Tone, string> = {
  warning: "bg-warning/15 text-warning",
  success: "bg-success/15 text-success",
  primary: "bg-primary/10 text-primary",
  neutral: "bg-secondary text-secondary-foreground",
  danger: "bg-danger/15 text-danger",
};

export function StatusPill({ tone, children }: { tone: Tone; children: ReactNode }) {
  return (
    <span
      className={cn(
        "inline-flex items-center whitespace-nowrap rounded-full px-2 py-0.5 text-[10px] font-medium",
        toneStyles[tone]
      )}
    >
      {children}
    </span>
  );
}

/** Cartão flutuante usado sobre as ilustrações (notificações, alertas). */
export function FloatingCard({
  icon,
  title,
  description,
  tone = "primary",
  className,
  delay,
}: {
  icon: ReactNode;
  title: string;
  description: string;
  tone?: Tone;
  className?: string;
  delay?: number;
}) {
  return (
    <div
      className={cn(
        "landing-float flex w-64 items-start gap-3 rounded-xl border border-border bg-card/95 p-3 shadow-[0_16px_40px_-16px_rgb(0_0_0/0.3)] backdrop-blur",
        className
      )}
      style={delay ? ({ "--landing-delay": `${delay}ms` } as CSSProperties) : undefined}
    >
      <span
        className={cn(
          "mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg",
          toneStyles[tone]
        )}
      >
        {icon}
      </span>
      <div className="min-w-0">
        <p className="text-xs font-semibold text-card-foreground">{title}</p>
        <p className="mt-0.5 text-[11px] leading-snug text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}
