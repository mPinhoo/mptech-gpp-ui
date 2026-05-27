"use client";

import { Plus } from "lucide-react";
import { Button, Badge, Table } from "@/components/ui";

interface ItemEstoque {
  id: string;
  produto: string;
  quantidade: number;
  minimo: number;
  unidade: string;
  status: string;
  [key: string]: unknown;
}

const itens: ItemEstoque[] = [
  { id: "1", produto: "Camiseta Básica P", quantidade: 150, minimo: 30, unidade: "un", status: "Normal" },
  { id: "2", produto: "Camiseta Básica M", quantidade: 85, minimo: 30, unidade: "un", status: "Normal" },
  { id: "3", produto: "Calça Jeans 42", quantidade: 12, minimo: 20, unidade: "un", status: "Baixo" },
  { id: "4", produto: "Tênis Runner 40", quantidade: 45, minimo: 15, unidade: "par", status: "Normal" },
  { id: "5", produto: "Boné Logo", quantidade: 5, minimo: 10, unidade: "un", status: "Crítico" },
];

const statusVariant = (status: string) => {
  switch (status) {
    case "Normal":
      return "success" as const;
    case "Baixo":
      return "warning" as const;
    case "Crítico":
      return "danger" as const;
    default:
      return "default" as const;
  }
};

const columns = [
  { key: "produto", header: "Produto" },
  { key: "quantidade", header: "Qtd" },
  { key: "minimo", header: "Mínimo" },
  { key: "unidade", header: "Un." },
  {
    key: "status",
    header: "Status",
    render: (row: ItemEstoque) => (
      <Badge variant={statusVariant(row.status)}>{row.status}</Badge>
    ),
  },
];

export default function EstoquePage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Estoque</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Controle de estoque de produtos
          </p>
        </div>
        <Button>
          <Plus size={16} className="mr-2" />
          Entrada
        </Button>
      </div>

      <Table
        columns={columns}
        data={itens}
        keyExtractor={(row) => row.id}
      />
    </div>
  );
}
