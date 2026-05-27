export interface Produto {
  id: string;
  nome: string;
  categoria: string;
  preco: number;
  ativo: boolean;
}

export const produtosCadastrados: Produto[] = [
  { id: "1", nome: "Camiseta Básica", categoria: "Vestuário", preco: 49.9, ativo: true },
  { id: "2", nome: "Calça Jeans Slim", categoria: "Vestuário", preco: 159.9, ativo: true },
  { id: "3", nome: "Tênis Runner Pro", categoria: "Calçados", preco: 299.9, ativo: true },
  { id: "4", nome: "Boné Logo Classic", categoria: "Acessórios", preco: 79.9, ativo: false },
  { id: "5", nome: "Mochila Urban", categoria: "Acessórios", preco: 189.9, ativo: true },
];
