export interface Produto {
  id: string;
  nome: string;
  categoria: string;
  preco: number;
  ativo: boolean;
  [key: string]: unknown;
}

export interface Pedido {
  id: string;
  numero: string;
  cliente: string;
  data: string;
  valor: string;
  status: string;
  [key: string]: unknown;
}

export interface PedidoDetail {
  id: string;
  numero: string;
  cliente: { id: string; nome: string };
  dataPedido: string;
  prazoEntrega: string;
  status: string;
  valorTotal: number;
  enviadoCliente: boolean;
  itens: PedidoItem[];
}

export interface PedidoItem {
  id: string;
  produtoId: string;
  produto: string;
  quantidade: number;
  precoUnitario: number;
  subtotal: number;
}

export interface ItemEstoque {
  id: string;
  produto: string;
  quantidade: number;
  minimo: number;
  unidade: string;
  status: string;
  [key: string]: unknown;
}

export interface Cliente {
  id: string;
  nome: string;
  email?: string | null;
  telefone?: string | null;
  documento?: string | null;
  endereco?: string | null;
}

export interface DashboardStats {
  totalPedidos: number;
  faturamento: number;
  despesas: number;
  saldoMes: number;
  trends: {
    pedidos: number;
    faturamento: number;
  };
}

export interface ChartData {
  [key: string]: string | number;
  mes: string;
  faturamento: number;
  despesas: number;
}

export interface User {
  id: string;
  nome: string;
  email: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  meta?: {
    page: number;
    limit: number;
    total: number;
  };
}

export interface ApiError {
  success: false;
  error: {
    message: string;
    code: string;
  };
}
