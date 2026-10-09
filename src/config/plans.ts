/**
 * Fonte única dos planos comerciais do Zentra.
 *
 * Valores e limites abaixo são a proposta comercial inicial. A API ainda não
 * possui assinatura, cobrança nem aplicação de limites — eles são apenas
 * apresentados na landing page. Ao implementar um recurso, ative a capacidade
 * correspondente em `PRODUCT_CAPABILITIES` para remover o selo "Em breve".
 */

export type PlanId = "basico" | "pro" | "business";

/** Recursos de plano que dependem de implementação ainda inexistente no produto. */
export const PRODUCT_CAPABILITIES = {
  /** Mais de um usuário acessando os dados da mesma conta (hoje cada usuário é uma conta isolada). */
  multiplosUsuarios: false,
  /** Cadastro e gestão de colaboradores dentro da conta do cliente. */
  colaboradores: false,
  /** Grupos de permissão administrados pelo próprio cliente (hoje são globais da plataforma). */
  permissoesPorConta: false,
  /** Relatórios além dos indicadores do painel. */
  relatoriosAvancados: false,
  /** Recursos de gestão avançada da operação (escopo ainda não definido). */
  gestaoAvancada: false,
} as const;

export type ProductCapability = keyof typeof PRODUCT_CAPABILITIES;

export function isCapabilityAvailable(capability?: ProductCapability): boolean {
  return capability ? PRODUCT_CAPABILITIES[capability] : true;
}

export interface PlanLimits {
  usuarios: number;
  /** `null` = ilimitado, sujeito a uso justo. */
  pedidosPorMes: number | null;
  clientes: number | null;
  produtos: number | null;
  /** `0` = não incluso. */
  colaboradores: number;
}

export interface PlanFeature {
  label: string;
  requires?: ProductCapability;
}

export interface Plan {
  id: PlanId;
  name: string;
  /** Preço mensal em centavos (BRL). */
  monthlyPriceCents: number;
  audience: string;
  recommended?: boolean;
  ctaLabel: string;
  limits: PlanLimits;
  /** Frase de herança exibida antes dos recursos (ex.: "Tudo do Básico"). */
  includesPrevious?: string;
  features: PlanFeature[];
}

export const PLANS: Plan[] = [
  {
    id: "basico",
    name: "Básico",
    monthlyPriceCents: 3990,
    audience: "Para autônomos e pequenos negócios.",
    ctaLabel: "Escolher Básico",
    limits: {
      usuarios: 1,
      pedidosPorMes: 50,
      clientes: 100,
      produtos: 30,
      colaboradores: 0,
    },
    features: [
      { label: "Gestão de pedidos" },
      { label: "Orçamentos com link de aprovação" },
      { label: "Agenda básica" },
      { label: "Kanban básico" },
      { label: "Relatórios básicos" },
    ],
  },
  {
    id: "pro",
    name: "Pro",
    monthlyPriceCents: 7990,
    audience: "Para negócios em crescimento.",
    recommended: true,
    ctaLabel: "Escolher Pro",
    limits: {
      usuarios: 3,
      pedidosPorMes: 300,
      clientes: 1000,
      produtos: 200,
      colaboradores: 5,
    },
    includesPrevious: "Tudo do Básico, mais:",
    features: [
      { label: "Agenda completa" },
      { label: "Kanban completo" },
      { label: "Relatórios avançados", requires: "relatoriosAvancados" },
      { label: "Permissões básicas", requires: "permissoesPorConta" },
      { label: "Recursos de gestão de equipes", requires: "colaboradores" },
    ],
  },
  {
    id: "business",
    name: "Business",
    monthlyPriceCents: 14990,
    audience: "Para negócios com equipes e operações maiores.",
    ctaLabel: "Escolher Business",
    limits: {
      usuarios: 10,
      pedidosPorMes: null,
      clientes: null,
      produtos: null,
      colaboradores: 30,
    },
    includesPrevious: "Tudo do Pro, mais:",
    features: [
      { label: "Permissões avançadas", requires: "permissoesPorConta" },
      { label: "Relatórios completos", requires: "relatoriosAvancados" },
      { label: "Gestão avançada da operação", requires: "gestaoAvancada" },
    ],
  },
];

export const FAIR_USE_NOTE = "Ilimitado, sujeito a uso justo.";

export function getPlan(id: string | null | undefined): Plan | undefined {
  return PLANS.find((plan) => plan.id === id);
}

const brl = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

export function formatPlanPrice(plan: Plan): string {
  return brl.format(plan.monthlyPriceCents / 100);
}

const integer = new Intl.NumberFormat("pt-BR");

/** Linhas de limite exibidas no card do plano. */
export function describePlanLimits(plan: Plan): PlanFeature[] {
  const { limits } = plan;
  const quota = (value: number | null, unit: string) =>
    value === null ? `${capitalize(unit)} ilimitados*` : `Até ${integer.format(value)} ${unit}`;

  const items: PlanFeature[] = [
    {
      label: limits.usuarios === 1 ? "1 usuário" : `${limits.usuarios} usuários`,
      requires: limits.usuarios > 1 ? "multiplosUsuarios" : undefined,
    },
    { label: limits.pedidosPorMes === null ? "Pedidos ilimitados*" : `Até ${integer.format(limits.pedidosPorMes)} pedidos por mês` },
    { label: quota(limits.clientes, "clientes") },
    { label: quota(limits.produtos, "produtos e serviços") },
  ];

  if (limits.colaboradores > 0) {
    items.push({
      label: `Até ${limits.colaboradores} colaboradores cadastrados`,
      requires: "colaboradores",
    });
  }

  return items;
}

function capitalize(value: string): string {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

/* ---------- Tabela comparativa ---------- */

export type ComparisonValue = boolean | string;

export interface ComparisonRow {
  label: string;
  values: Record<PlanId, ComparisonValue>;
  /** Capacidade exigida em cada plano. Plano ausente = disponível hoje. */
  requires?: Partial<Record<PlanId, ProductCapability>>;
}

export interface ComparisonGroup {
  title: string;
  rows: ComparisonRow[];
}

function limitValue(value: number | null): string {
  return value === null ? "Ilimitado*" : integer.format(value);
}

function byPlan<T>(pick: (plan: Plan) => T): Record<PlanId, T> {
  return Object.fromEntries(PLANS.map((plan) => [plan.id, pick(plan)])) as Record<PlanId, T>;
}

function requiresByPlan(
  pick: (plan: Plan) => ProductCapability | undefined
): Partial<Record<PlanId, ProductCapability>> {
  return Object.fromEntries(
    PLANS.flatMap((plan) => {
      const capability = pick(plan);
      return capability ? [[plan.id, capability]] : [];
    })
  );
}

export const PLAN_COMPARISON: ComparisonGroup[] = [
  {
    title: "Limites de uso",
    rows: [
      {
        label: "Usuários",
        values: byPlan((plan) => String(plan.limits.usuarios)),
        requires: requiresByPlan((plan) =>
          plan.limits.usuarios > 1 ? "multiplosUsuarios" : undefined
        ),
      },
      { label: "Pedidos por mês", values: byPlan((plan) => limitValue(plan.limits.pedidosPorMes)) },
      { label: "Clientes", values: byPlan((plan) => limitValue(plan.limits.clientes)) },
      { label: "Produtos e serviços", values: byPlan((plan) => limitValue(plan.limits.produtos)) },
      {
        label: "Colaboradores cadastrados",
        values: byPlan((plan) =>
          plan.limits.colaboradores > 0 ? `Até ${plan.limits.colaboradores}` : false
        ),
        requires: requiresByPlan((plan) =>
          plan.limits.colaboradores > 0 ? "colaboradores" : undefined
        ),
      },
    ],
  },
  {
    title: "Vendas e atendimento",
    rows: [
      { label: "Cadastro de clientes", values: { basico: true, pro: true, business: true } },
      { label: "Catálogo de produtos", values: { basico: true, pro: true, business: true } },
      { label: "Gestão de pedidos", values: { basico: true, pro: true, business: true } },
      { label: "Orçamentos com link de aprovação", values: { basico: true, pro: true, business: true } },
    ],
  },
  {
    title: "Organização",
    rows: [
      { label: "Agenda", values: { basico: "Básica", pro: "Completa", business: "Completa" } },
      { label: "Kanban de produção", values: { basico: "Básico", pro: "Completo", business: "Completo" } },
    ],
  },
  {
    title: "Gestão e controle",
    rows: [
      {
        label: "Relatórios",
        values: { basico: "Básicos", pro: "Avançados", business: "Completos" },
        requires: { pro: "relatoriosAvancados", business: "relatoriosAvancados" },
      },
      {
        label: "Permissões",
        values: { basico: false, pro: "Básicas", business: "Avançadas" },
        requires: { pro: "permissoesPorConta", business: "permissoesPorConta" },
      },
      {
        label: "Gestão de equipes",
        values: { basico: false, pro: true, business: true },
        requires: { pro: "colaboradores", business: "colaboradores" },
      },
      {
        label: "Gestão avançada da operação",
        values: { basico: false, pro: false, business: true },
        requires: { business: "gestaoAvancada" },
      },
    ],
  },
];

export function isComparisonValuePending(row: ComparisonRow, planId: PlanId): boolean {
  return !isCapabilityAvailable(row.requires?.[planId]);
}
