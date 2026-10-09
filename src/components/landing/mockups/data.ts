/**
 * Dados FICTÍCIOS usados apenas nas ilustrações da landing page.
 * Nomes de status, colunas e menus seguem os termos reais do produto.
 */

export const sampleOrder = {
  numero: "PED-0042",
  cliente: "Marina Alves",
  itens: [
    { nome: "Kit festa personalizado", quantidade: 1, subtotal: "R$ 180,00" },
    { nome: "Caixinha personalizada", quantidade: 20, subtotal: "R$ 90,00" },
  ],
  extras: [{ nome: "Entrega", valor: "R$ 20,00" }],
  total: "R$ 290,00",
} as const;

export const sampleKpis = [
  { label: "Total de pedidos", value: "38" },
  { label: "Faturamento", value: "R$ 6.420,00" },
  { label: "Despesas", value: "R$ 1.180,00" },
  { label: "Saldo", value: "R$ 5.240,00" },
] as const;

export interface SampleKanbanCard {
  numero: string;
  cliente: string;
  prazo: string;
  alerta?: string;
}

/** Colunas criadas automaticamente para toda conta nova. */
export const sampleKanban: { coluna: string; cards: SampleKanbanCard[] }[] = [
  {
    coluna: "Aguardando Produção",
    cards: [
      { numero: "PED-0043", cliente: "Paula Ribeiro", prazo: "Entrega 16/10" },
      { numero: "PED-0042", cliente: "Marina Alves", prazo: "Entrega 18/10" },
    ],
  },
  {
    coluna: "Em Produção",
    cards: [
      { numero: "PED-0041", cliente: "Rafael Lima", prazo: "Entrega 10/10", alerta: "Vence amanhã" },
      { numero: "PED-0040", cliente: "Clara Mendes", prazo: "Entrega 13/10" },
    ],
  },
  {
    coluna: "Finalizado",
    cards: [{ numero: "PED-0038", cliente: "Juliana Costa", prazo: "Entregue" }],
  },
];

export const sampleOrderList = [
  { numero: "PED-0044", cliente: "Lucas Prado", valor: "R$ 145,00", status: "Pendente", tone: "warning" },
  { numero: "PED-0043", cliente: "Paula Ribeiro", valor: "R$ 320,00", status: "Aguardando Produção", tone: "primary" },
  { numero: "PED-0042", cliente: "Marina Alves", valor: "R$ 290,00", status: "Aguardando Produção", tone: "primary" },
  { numero: "PED-0041", cliente: "Rafael Lima", valor: "R$ 210,00", status: "Em Produção", tone: "primary" },
  { numero: "PED-0038", cliente: "Juliana Costa", valor: "R$ 540,00", status: "Concluído", tone: "neutral" },
] as const;
