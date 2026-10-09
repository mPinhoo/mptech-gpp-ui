import {
  Bell,
  Bot,
  Boxes,
  Calculator,
  CalendarDays,
  ChartColumn,
  Contact,
  FileCheck,
  MessageCircle,
  Package,
  ShoppingCart,
  SquareKanban,
  UsersRound,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { IconTile, Container, Section, SectionHeading } from "./Section";

interface Feature {
  icon: LucideIcon;
  name: string;
  benefit: string;
  description: string;
}

/** Somente módulos existentes na API e na interface atuais do Zentra. */
const featureGroups: { title: string; description: string; features: Feature[] }[] = [
  {
    title: "Vendas e atendimento",
    description: "Do primeiro contato ao pedido aprovado.",
    features: [
      {
        icon: Contact,
        name: "Clientes",
        benefit: "Informações de cada cliente sempre à mão.",
        description:
          "Cadastre contato, documento e endereço, encontre clientes por nome, e-mail ou documento e reaproveite o mesmo cadastro em cada pedido.",
      },
      {
        icon: Package,
        name: "Produtos",
        benefit: "Catálogo organizado e pronto para vender.",
        description:
          "Organize por categoria, defina preço e situação (ativo, inativo ou fora de ciclo) e vincule os materiais usados em cada item.",
      },
      {
        icon: ShoppingCart,
        name: "Pedidos",
        benefit: "Cada pedido com itens, extras e prazo definidos.",
        description:
          "Numeração automática, preço ajustável por item, extras como entrega e taxa de urgência e filtros por cliente, período e status.",
      },
      {
        icon: FileCheck,
        name: "Orçamentos com aprovação online",
        benefit: "Seu cliente revisa e aprova sem troca de mensagens.",
        description:
          "Envie o pedido como orçamento por um link exclusivo. O cliente confere itens, extras e total e aprova com um clique.",
      },
      {
        icon: MessageCircle,
        name: "Envio pelo WhatsApp",
        benefit: "Compartilhe onde seu cliente já conversa com você.",
        description:
          "Copie o link do orçamento e envie pelo WhatsApp, e-mail ou outro canal. O cliente não precisa criar conta para aprovar.",
      },
    ],
  },
  {
    title: "Organização e produtividade",
    description: "Prazos, produção e materiais sob controle.",
    features: [
      {
        icon: CalendarDays,
        name: "Agenda",
        benefit: "Prazos e compromissos no mesmo calendário.",
        description:
          "Visão mensal com os pedidos por data de entrega e seus lembretes, com aviso no horário marcado.",
      },
      {
        icon: SquareKanban,
        name: "Área de Trabalho (Kanban)",
        benefit: "Veja a etapa de cada pedido de relance.",
        description:
          "Pedidos aprovados entram no quadro de produção. Arraste entre colunas, crie etapas próprias e arquive o que foi finalizado.",
      },
      {
        icon: Bell,
        name: "Notificações e alertas de prazo",
        benefit: "Saiba o que precisa de atenção sem procurar.",
        description:
          "Avisos quando um cliente aprova um pedido, quando um lembrete chega e quando a entrega de um pedido em produção se aproxima.",
      },
      {
        icon: Boxes,
        name: "Estoque de materiais",
        benefit: "Insumos controlados, com sinalização de estoque baixo.",
        description:
          "Registre entradas, defina a quantidade mínima e veja a situação de cada material: normal, baixo ou crítico. Cada entrada gera a despesa correspondente.",
      },
    ],
  },
  {
    title: "Gestão e controle",
    description: "Números claros para decidir com segurança.",
    features: [
      {
        icon: Calculator,
        name: "Precificação",
        benefit: "Preço calculado a partir dos seus custos reais.",
        description:
          "Considere materiais, tempo de produção, mão de obra, custos fixos, taxas e impostos e defina a margem para chegar ao preço sugerido.",
      },
      {
        icon: ChartColumn,
        name: "Painel de resultados",
        benefit: "Faturamento, despesas e saldo do período.",
        description:
          "Escolha o período e compare com o período anterior. O faturamento considera os pedidos aprovados e concluídos.",
      },
      {
        icon: Bot,
        name: "Assistente Zentra",
        benefit: "Respostas sobre o seu negócio em linguagem simples.",
        description:
          "Pergunte, por exemplo, quantos pedidos entraram no mês ou como cadastrar um produto. O assistente consulta apenas os dados da sua conta.",
      },
    ],
  },
];

/** Distribui os cards em uma grade de 6 colunas sem deixar cards órfãos no desktop. */
function featureSpan(total: number, index: number) {
  if (total % 3 === 0) return "lg:col-span-2";
  if (total === 4) return "lg:col-span-3";
  return index < 2 ? "lg:col-span-3" : "lg:col-span-2";
}

export function FeaturesSection() {
  return (
    <Section id="funcionalidades" labelledBy="funcionalidades-title">
      <Container>
        <SectionHeading
          id="funcionalidades-title"
          eyebrow="Funcionalidades"
          title="Tudo o que você precisa para organizar e desenvolver seu negócio."
          description="Módulos conectados entre si: o cliente cadastrado vira pedido, o pedido aprovado vai para a produção e o resultado aparece no painel."
        />

        <div className="mt-16 space-y-16">
          {featureGroups.map((group) => (
            <div key={group.title}>
              <div className="landing-reveal flex flex-col gap-1 border-b border-border pb-4 sm:flex-row sm:items-end sm:justify-between">
                <h3 className="text-xl font-semibold tracking-tight text-foreground">{group.title}</h3>
                <p className="text-sm text-muted-foreground">{group.description}</p>
              </div>
              <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
                {group.features.map((feature, index) => (
                  <li
                    key={feature.name}
                    className={cn(
                      "landing-reveal group relative rounded-xl border border-border bg-card p-6 shadow-sm transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md sm:max-lg:last:odd:col-span-2",
                      featureSpan(group.features.length, index)
                    )}
                  >
                    <IconTile className="transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
                      <feature.icon size={20} />
                    </IconTile>
                    <h4 className="mt-5 text-base font-semibold text-card-foreground">{feature.name}</h4>
                    <p className="mt-2 text-sm font-medium text-foreground">{feature.benefit}</p>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{feature.description}</p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p className="landing-reveal mt-12 flex items-start justify-center gap-2 text-center text-sm text-muted-foreground">
          <UsersRound size={16} aria-hidden="true" className="mt-0.5 shrink-0" />
          <span>
            Usuários adicionais, colaboradores e permissões por conta estão previstos nos planos Pro e
            Business.{" "}
            <a href="#planos" className="font-medium text-primary underline-offset-4 hover:underline">
              Ver planos
            </a>
          </span>
        </p>
      </Container>
    </Section>
  );
}
