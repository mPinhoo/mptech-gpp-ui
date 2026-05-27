"use client";

import Link from "next/link";
import { Plus } from "lucide-react";
import { Button, Badge, Table } from "@/components/ui";

interface Pedido {
  id: string;
  cliente: string;
  data: string;
  valor: string;
  status: string;
  [key: string]: unknown;
}

const pedidos: Pedido[] = [
  { id: "#001", cliente: "João Silva", data: "26/05/2026", valor: "R$ 1.250,00", status: "Concluído" },
  { id: "#002", cliente: "Maria Souza", data: "25/05/2026", valor: "R$ 890,00", status: "Pendente" },
  { id: "#003", cliente: "Carlos Lima", data: "25/05/2026", valor: "R$ 2.340,00", status: "Concluído" },
  { id: "#004", cliente: "Ana Costa", data: "24/05/2026", valor: "R$ 560,00", status: "Cancelado" },
  { id: "#005", cliente: "Pedro Santos", data: "24/05/2026", valor: "R$ 1.780,00", status: "Pendente" },
];

const statusVariant = (status: string) => {
  switch (status) {
    case "Concluído":
      return "success" as const;
    case "Pendente":
      return "warning" as const;
    case "Cancelado":
      return "danger" as const;
    default:
      return "default" as const;
  }
};

const columns = [
  { key: "id", header: "Pedido" },
  { key: "cliente", header: "Cliente" },
  { key: "data", header: "Data" },
  { key: "valor", header: "Valor" },
  {
    key: "status",
    header: "Status",
    render: (row: Pedido) => (
      <Badge variant={statusVariant(row.status)}>{row.status}</Badge>
    ),
  },
];

export default function PedidosPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Pedidos</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Gerencie seus pedidos
          </p>
        </div>
        <Link href="/pedidos/novo">
          <Button>
            <Plus size={16} className="mr-2" />
            Novo Pedido
          </Button>
        </Link>
      </div>

      <Table
        columns={columns}
        data={pedidos}
        keyExtractor={(row) => row.id}
      />
    </div>
  );
}
