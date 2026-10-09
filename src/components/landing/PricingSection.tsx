import { ArrowRight, Check, Clock, Minus } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { buttonStyles } from "@/components/ui/button-styles";
import {
  FAIR_USE_NOTE,
  PLAN_COMPARISON,
  PLANS,
  describePlanLimits,
  formatPlanPrice,
  isCapabilityAvailable,
  isComparisonValuePending,
  type ComparisonValue,
  type Plan,
  type PlanFeature,
} from "@/config/plans";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { Container, Section, SectionHeading } from "./Section";

/** O `plano` segue na URL para uso futuro pelo checkout; o cadastro atual o ignora. */
function planSignupHref(plan: Plan) {
  return `${siteConfig.routes.register}?plano=${plan.id}`;
}

function SoonBadge() {
  return <Badge className="shrink-0 px-2 py-0 text-[10px] font-semibold">Em breve</Badge>;
}

function PlanFeatureItem({ feature }: { feature: PlanFeature }) {
  const available = isCapabilityAvailable(feature.requires);
  return (
    <li className="flex items-start gap-3 text-sm">
      {available ? (
        <Check size={16} strokeWidth={2.5} aria-hidden="true" className="mt-0.5 shrink-0 text-primary" />
      ) : (
        <Clock size={16} aria-hidden="true" className="mt-0.5 shrink-0 text-muted-foreground" />
      )}
      <span className={cn("flex flex-wrap items-center gap-x-2 gap-y-1", available ? "text-foreground" : "text-muted-foreground")}>
        {feature.label}
        {!available && <SoonBadge />}
      </span>
    </li>
  );
}

function PlanCard({ plan }: { plan: Plan }) {
  const [currency, amount] = formatPlanPrice(plan).split(/\s/);
  const headingId = `plano-${plan.id}`;

  return (
    <li
      aria-labelledby={headingId}
      className={cn(
        "landing-reveal relative flex flex-col rounded-2xl border bg-card p-7 transition-[box-shadow,transform] duration-300 sm:p-8",
        plan.recommended
          ? "border-primary shadow-xl shadow-primary/10 ring-1 ring-primary lg:-translate-y-3"
          : "border-border shadow-sm hover:shadow-md"
      )}
    >
      {plan.recommended && (
        <span className="absolute -top-3 left-1/2 inline-flex -translate-x-1/2 items-center rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground shadow-sm">
          Recomendado
        </span>
      )}

      <h3 id={headingId} className="text-lg font-semibold text-card-foreground">
        {plan.name}
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">{plan.audience}</p>

      <p className="mt-6 flex items-baseline gap-1 text-foreground">
        <span className="text-lg font-medium">{currency}</span>
        <span className="text-4xl font-semibold tracking-tight tabular-nums sm:text-5xl">{amount}</span>
        <span className="ml-1 text-sm text-muted-foreground">/mês</span>
      </p>

      <Link
        href={planSignupHref(plan)}
        className={buttonStyles({
          variant: plan.recommended ? "primary" : "outline",
          size: "lg",
          className: cn(
            "group mt-6 w-full gap-2 transition-[transform,background-color,box-shadow] hover:-translate-y-0.5",
            plan.recommended && "shadow-lg shadow-primary/25"
          ),
        })}
      >
        {plan.ctaLabel}
        <ArrowRight size={16} aria-hidden="true" className="transition-transform group-hover:translate-x-0.5" />
      </Link>

      <div className="mt-8 border-t border-border pt-6">
        <ul className="space-y-3">
          {describePlanLimits(plan).map((feature) => (
            <PlanFeatureItem key={feature.label} feature={feature} />
          ))}
        </ul>
        {plan.includesPrevious && (
          <p className="mt-6 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            {plan.includesPrevious}
          </p>
        )}
        <ul className="mt-3 space-y-3">
          {plan.features.map((feature) => (
            <PlanFeatureItem key={feature.label} feature={feature} />
          ))}
        </ul>
      </div>
    </li>
  );
}

function ComparisonCell({ value, pending }: { value: ComparisonValue; pending: boolean }) {
  if (value === false) {
    return (
      <>
        <Minus size={16} aria-hidden="true" className="mx-auto text-muted-foreground/60" />
        <span className="sr-only">Não incluído</span>
      </>
    );
  }

  return (
    <span className={cn("inline-flex flex-wrap items-center justify-center gap-x-2 gap-y-1", pending && "text-muted-foreground")}>
      {value === true ? (
        <>
          <Check size={16} strokeWidth={2.5} aria-hidden="true" className={pending ? "text-muted-foreground" : "text-primary"} />
          <span className="sr-only">Incluído</span>
        </>
      ) : (
        value
      )}
      {pending && <SoonBadge />}
    </span>
  );
}

function PlanComparisonTable() {
  return (
    <div className="landing-reveal mt-20">
      <h3 className="text-center text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
        Compare os planos em detalhes
      </h3>
      <p className="mt-3 text-center text-xs text-muted-foreground sm:hidden">
        Deslize a tabela para o lado para ver todos os planos.
      </p>
      <div
        className="relative mt-4 overflow-x-auto sm:mt-8 rounded-2xl border border-border bg-card shadow-sm"
        tabIndex={0}
        role="region"
        aria-label="Tabela comparativa dos planos (role horizontalmente em telas pequenas)"
      >
        <table className="w-full min-w-[600px] border-collapse text-sm">
          <caption className="sr-only">Comparação detalhada dos planos Básico, Pro e Business</caption>
          <thead>
            <tr className="border-b border-border">
              <th scope="col" className="w-[34%] px-5 py-4 text-left font-medium text-muted-foreground">
                Recurso
              </th>
              {PLANS.map((plan) => (
                <th
                  key={plan.id}
                  scope="col"
                  className={cn("px-4 py-4 text-center", plan.recommended && "bg-primary/5")}
                >
                  <span className="block font-semibold text-foreground">{plan.name}</span>
                  <span className="block text-xs font-normal text-muted-foreground">
                    {formatPlanPrice(plan)}/mês
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          {PLAN_COMPARISON.map((group) => (
            <tbody key={group.title}>
              <tr className="border-b border-border bg-muted/50">
                <th
                  scope="colgroup"
                  colSpan={PLANS.length + 1}
                  className="px-5 py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground"
                >
                  {group.title}
                </th>
              </tr>
              {group.rows.map((row) => (
                <tr key={row.label} className="border-b border-border last:border-0">
                  <th scope="row" className="px-5 py-3.5 text-left font-normal text-foreground">
                    {row.label}
                  </th>
                  {PLANS.map((plan) => (
                    <td
                      key={plan.id}
                      className={cn("px-4 py-3.5 text-center tabular-nums text-foreground", plan.recommended && "bg-primary/5")}
                    >
                      <ComparisonCell
                        value={row.values[plan.id]}
                        pending={isComparisonValuePending(row, plan.id)}
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          ))}
        </table>
      </div>
    </div>
  );
}

export function PricingSection() {
  return (
    <Section id="planos" labelledBy="planos-title" className="border-t border-border bg-muted/40">
      <Container>
        <SectionHeading
          id="planos-title"
          eyebrow="Planos e preços"
          title="Escolha o plano ideal para o momento do seu negócio."
          description="Preços mensais e limites claros. Compare os recursos e escolha o que faz sentido para a sua operação."
        />

        <ul className="mt-16 grid items-start gap-6 lg:grid-cols-3 lg:gap-8">
          {PLANS.map((plan) => (
            <PlanCard key={plan.id} plan={plan} />
          ))}
        </ul>

        <div className="mt-8 space-y-1 text-center text-xs text-muted-foreground">
          <p>* {FAIR_USE_NOTE}</p>
          <p>
            Ao escolher um plano, você segue para a criação da sua conta. Itens marcados como “Em breve”
            ainda não estão disponíveis no produto.
          </p>
        </div>

        <PlanComparisonTable />
      </Container>
    </Section>
  );
}
