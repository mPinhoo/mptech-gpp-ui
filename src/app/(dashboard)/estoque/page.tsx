"use client";

import { useState } from "react";
import { ArrowDownToLine, ArrowUpFromLine } from "lucide-react";
import { Button, Badge, Table, Modal, Input, SearchSelect } from "@/components/ui";
import { useApi } from "@/hooks/useApi";
import { api } from "@/lib/api";
import type { ItemEstoque, Produto } from "@/types";

type ModalType = "entrada" | "saida" | null;

export default function EstoquePage() {
  const { data: itens, loading, refetch } = useApi<ItemEstoque[]>("/estoque");
  const { data: produtos } = useApi<Produto[]>("/produtos?ativo=true");

  const [modalType, setModalType] = useState<ModalType>(null);
  const [produtoId, setProdutoId] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const opcoesProdutos = (produtos || []).map((p) => ({
    value: p.id,
    label: p.nome,
  }));

  const openModal = (type: ModalType) => {
    setModalType(type);
    setProdutoId("");
    setQuantidade("");
    setError("");
  };

  const handleSubmit = async () => {
    setError("");
    setSaving(true);

    try {
      const payload = {
        produtoId,
        quantidade: Number(quantidade),
      };

      if (modalType === "entrada") {
        await api.post("/estoque/entrada", payload);
      } else {
        await api.post("/estoque/saida", payload);
      }

      setModalType(null);
      await refetch();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro na operação");
    } finally {
      setSaving(false);
    }
  };

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

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Estoque</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Controle de estoque de produtos
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => openModal("saida")}>
            <ArrowUpFromLine size={16} className="mr-2" />
            Saída
          </Button>
          <Button onClick={() => openModal("entrada")}>
            <ArrowDownToLine size={16} className="mr-2" />
            Entrada
          </Button>
        </div>
      </div>

      {loading ? (
        <div className="h-64 rounded-lg border border-border bg-card animate-pulse" />
      ) : (
        <Table
          columns={columns}
          data={itens || []}
          keyExtractor={(row) => row.id}
        />
      )}

      <Modal
        open={!!modalType}
        onClose={() => setModalType(null)}
        title={modalType === "entrada" ? "Entrada de Estoque" : "Saída de Estoque"}
        footer={
          <>
            <Button variant="outline" onClick={() => setModalType(null)}>
              Cancelar
            </Button>
            <Button
              onClick={handleSubmit}
              loading={saving}
              disabled={!produtoId || !quantidade || Number(quantidade) <= 0}
            >
              Confirmar
            </Button>
          </>
        }
      >
        <div className="space-y-4">
          {error && (
            <div className="rounded-lg bg-danger/10 border border-danger/20 px-4 py-3 text-sm text-danger">
              {error}
            </div>
          )}
          <SearchSelect
            label="Produto"
            placeholder="Selecione o produto..."
            options={opcoesProdutos}
            value={produtoId}
            onChange={setProdutoId}
          />
          <Input
            label="Quantidade"
            type="number"
            min="1"
            value={quantidade}
            onChange={(e) => setQuantidade(e.target.value)}
            placeholder="0"
          />
        </div>
      </Modal>
    </div>
  );
}
