"use client";

import { useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { Button, Badge, Table, Modal, Input } from "@/components/ui";
import { useApi } from "@/hooks/useApi";
import { api } from "@/lib/api";
import type { Produto } from "@/types";

export default function ProdutosPage() {
  const { data: produtos, loading, refetch } = useApi<Produto[]>("/produtos");
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Produto | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [nome, setNome] = useState("");
  const [categoria, setCategoria] = useState("");
  const [preco, setPreco] = useState("");
  const [ativo, setAtivo] = useState(true);

  const openCreate = () => {
    setEditing(null);
    setNome("");
    setCategoria("");
    setPreco("");
    setAtivo(true);
    setError("");
    setModalOpen(true);
  };

  const openEdit = (produto: Produto) => {
    setEditing(produto);
    setNome(produto.nome);
    setCategoria(produto.categoria);
    setPreco(String(produto.preco));
    setAtivo(produto.ativo);
    setError("");
    setModalOpen(true);
  };

  const handleSave = async () => {
    setError("");
    setSaving(true);

    try {
      const payload = {
        nome,
        categoria,
        preco: Number(preco),
        ativo,
      };

      if (editing) {
        await api.put(`/produtos/${editing.id}`, payload);
      } else {
        await api.post("/produtos", payload);
      }

      setModalOpen(false);
      await refetch();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao salvar produto");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Deseja desativar este produto?")) return;

    try {
      await api.delete(`/produtos/${id}`);
      await refetch();
    } catch (err) {
      alert(err instanceof Error ? err.message : "Erro ao desativar produto");
    }
  };

  const formatCurrency = (value: number) =>
    value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

  const columns = [
    { key: "nome", header: "Produto" },
    { key: "categoria", header: "Categoria" },
    {
      key: "preco",
      header: "Preço",
      render: (row: Produto) => formatCurrency(row.preco),
    },
    {
      key: "ativo",
      header: "Status",
      render: (row: Produto) => (
        <Badge variant={row.ativo ? "success" : "default"}>
          {row.ativo ? "Ativo" : "Inativo"}
        </Badge>
      ),
    },
    {
      key: "acoes",
      header: "",
      render: (row: Produto) => (
        <div className="flex items-center gap-1">
          <button
            onClick={() => openEdit(row)}
            className="p-1.5 rounded hover:bg-accent text-muted-foreground transition-colors"
          >
            <Pencil size={15} />
          </button>
          <button
            onClick={() => handleDelete(row.id)}
            className="p-1.5 rounded hover:bg-danger/10 text-danger transition-colors"
          >
            <Trash2 size={15} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Produtos</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Catálogo de produtos
          </p>
        </div>
        <Button onClick={openCreate}>
          <Plus size={16} className="mr-2" />
          Novo Produto
        </Button>
      </div>

      {loading ? (
        <div className="h-64 rounded-lg border border-border bg-card animate-pulse" />
      ) : (
        <Table
          columns={columns}
          data={produtos || []}
          keyExtractor={(row) => row.id}
        />
      )}

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editing ? "Editar Produto" : "Novo Produto"}
        footer={
          <>
            <Button variant="outline" onClick={() => setModalOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSave} loading={saving}>
              {editing ? "Salvar" : "Criar"}
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
          <Input
            label="Nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Nome do produto"
          />
          <Input
            label="Categoria"
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
            placeholder="Ex: Vestuário, Calçados..."
          />
          <Input
            label="Preço"
            type="number"
            step="0.01"
            value={preco}
            onChange={(e) => setPreco(e.target.value)}
            placeholder="0.00"
          />
          <label className="flex items-center gap-2 text-sm cursor-pointer">
            <input
              type="checkbox"
              checked={ativo}
              onChange={(e) => setAtivo(e.target.checked)}
              className="rounded border-border"
            />
            <span className="text-foreground">Produto ativo</span>
          </label>
        </div>
      </Modal>
    </div>
  );
}
