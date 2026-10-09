import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Container({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <div className={cn("mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8", className)}>{children}</div>
  );
}

interface SectionProps {
  id?: string;
  labelledBy?: string;
  className?: string;
  children: ReactNode;
}

export function Section({ id, labelledBy, className, children }: SectionProps) {
  return (
    <section id={id} aria-labelledby={labelledBy} className={cn("scroll-mt-16 py-20 sm:py-28", className)}>
      {children}
    </section>
  );
}

interface SectionHeadingProps {
  id: string;
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "center" | "left";
  className?: string;
}

export function SectionHeading({
  id,
  eyebrow,
  title,
  description,
  align = "center",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "landing-reveal max-w-2xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      <p className="text-sm font-semibold text-primary">{eyebrow}</p>
      <h2
        id={id}
        className="mt-3 text-3xl font-semibold tracking-tight text-balance text-foreground sm:text-4xl"
      >
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-base leading-relaxed text-pretty text-muted-foreground sm:text-lg">
          {description}
        </p>
      )}
    </div>
  );
}

/** Ícone em destaque usado nos cards da landing. */
export function IconTile({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary ring-1 ring-primary/15 ring-inset",
        className
      )}
      aria-hidden="true"
    >
      {children}
    </span>
  );
}
