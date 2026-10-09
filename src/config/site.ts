/**
 * Conteúdo institucional e comercial da landing page.
 *
 * Itens com valor `null` dependem de definição do negócio (política, contato,
 * página jurídica) e ficam ocultos até serem preenchidos.
 */

export const siteConfig = {
  name: "Zentra",
  tagline: "Seu negócio organizado. Seu tempo de volta.",
  title: "Zentra — Gestão de pedidos, clientes e agenda para pequenos negócios",
  description:
    "Gerencie clientes, pedidos, orçamentos, agenda e resultados em uma única plataforma. Menos planilhas, menos desorganização e mais tempo para fazer seu negócio crescer.",
  url: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  routes: {
    login: "/login",
    register: "/register",
  },
} as const;

export const landingNav = [
  { href: "#funcionalidades", label: "Funcionalidades" },
  { href: "#como-funciona", label: "Como funciona" },
  { href: "#beneficios", label: "Benefícios" },
  { href: "#planos", label: "Planos e preços" },
  { href: "#faq", label: "Perguntas frequentes" },
] as const;

export interface FooterLink {
  label: string;
  href: string | null;
}

/** Páginas jurídicas e canal de suporte ainda não existem — preencha `href` quando publicados. */
export const legalLinks: FooterLink[] = [
  { label: "Política de Privacidade", href: null },
  { label: "Termos de Uso", href: null },
  { label: "Contato e suporte", href: null },
];

export interface FaqItem {
  question: string;
  /** `null` = resposta pendente de definição comercial; a pergunta não é exibida. */
  answer: string | null;
}

export const faqItems: FaqItem[] = [
  {
    question: "O que é o Zentra?",
    answer:
      "O Zentra é uma plataforma on-line para organizar a operação do seu negócio. Você cadastra clientes, produtos e materiais, cria pedidos e orçamentos, acompanha a produção em um quadro, organiza prazos na agenda e vê faturamento, despesas e saldo em um painel.",
  },
  {
    question: "Para quais negócios o Zentra é indicado?",
    answer:
      "Para autônomos, prestadores de serviço e pequenos negócios que vendem sob encomenda e precisam controlar pedidos, prazos de entrega, custos e clientes sem depender de planilhas e conversas soltas.",
  },
  {
    question: "Preciso instalar algum aplicativo?",
    answer:
      "Não. O Zentra funciona direto no navegador, no computador, no tablet ou no celular. Basta entrar com seu e-mail e senha.",
  },
  {
    question: "Posso utilizar o Zentra no celular?",
    answer:
      "Sim. A interface se adapta ao tamanho da tela e, no celular, o menu lateral passa a abrir como um painel deslizante. Seus dados ficam na nuvem, então você encontra as mesmas informações em qualquer dispositivo.",
  },
  {
    question: "Posso criar e compartilhar orçamentos?",
    answer:
      "Sim. Ao criar um pedido, você pode enviá-lo ao cliente como orçamento. O Zentra gera um link exclusivo que você compartilha pelo WhatsApp, e-mail ou outro canal. O cliente confere itens, extras e valor total e aprova pelo próprio link, sem precisar de conta. Assim que ele aprova, você recebe uma notificação.",
  },
  {
    question: "O Zentra permite gerenciar colaboradores?",
    answer:
      "Ainda não. Hoje cada conta do Zentra é individual. Usuários adicionais, colaboradores e permissões por conta estão previstos nos planos Pro e Business e aparecem como “Em breve” na comparação de planos.",
  },
  {
    question: "Qual é a diferença entre os planos?",
    answer:
      "Os planos variam nos limites de uso, como pedidos por mês, clientes e produtos cadastrados, e nos recursos de agenda, quadro de produção, relatórios e gestão de equipe. A tabela comparativa mostra cada diferença.",
  },
  { question: "Posso alterar meu plano depois?", answer: null },
  { question: "Existe fidelidade?", answer: null },
  { question: "Quais são as formas de pagamento?", answer: null },
];

export const publishedFaqItems = faqItems.filter(
  (item): item is FaqItem & { answer: string } => item.answer !== null
);
