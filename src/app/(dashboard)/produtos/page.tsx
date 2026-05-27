"use client";

import { Plus } from "lucide-react";
import { Button, Badge, Table } from "@/components/ui";
import { produtosCadastrados } from "@/data/produtos";

interface ProdutoRow {
  id: string;
  nome: string;
  categoria: string;
  preco: string;
  ativo: boolean;
  [key: string]: unknown;
}

const produtos: ProdutoRow[] = produtosCadastrados.map((p) => ({
  ...p,
  preco: p.preco.toLocaleString("pt-BR", { style: "currency", currency: "BRL" }),
}));

const columns = [
  { key: "nome", header: "Produto" },
  { key: "categoria", header: "Categoria" },
  { key: "preco", header: "Preço" },
  {
    key: "ativo",
    header: "Status",
    render: (row: ProdutoRow) => (
      <Badge variant={row.ativo ? "success" : "default"}>
        {row.ativo ? "Ativo" : "Inativo"}
      </Badge>
    ),
  },
];

export default function ProdutosPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Produtos</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Catálogo de produtos
          </p>
        </div>
        <Button>
          <Plus size={16} className="mr-2" />
          Novo Produto
        </Button>
      </div>

      <Table
        columns={columns}
        data={produtos}
        keyExtractor={(row) => row.id}
      />
    </div>
  );
}
