"use client";

import Link from "next/link";
import { Plus } from "lucide-react";
import { Button, Badge, Table } from "@/components/ui";
import { useApi } from "@/hooks/useApi";
import type { Pedido } from "@/types";

const statusVariant = (status: string) => {
  switch (status) {
    case "Concluído":
      return "success" as const;
    case "Pendente":
      return "warning" as const;
    case "Aprovado":
      return "default" as const;
    case "Cancelado":
      return "danger" as const;
    default:
      return "default" as const;
  }
};

const columns = [
  { key: "numero", header: "Pedido" },
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
  const { data: pedidos, loading } = useApi<Pedido[]>("/pedidos");

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

      {loading ? (
        <div className="h-64 rounded-lg border border-border bg-card animate-pulse" />
      ) : (
        <Table
          columns={columns}
          data={pedidos || []}
          keyExtractor={(row) => row.id}
        />
      )}
    </div>
  );
}
