"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Plus, Trash2, Send, FileText } from "lucide-react";
import {
  Button,
  Input,
  SearchSelect,
  Modal,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui";
import { useApi } from "@/hooks/useApi";
import { api } from "@/lib/api";
import type { Produto, Cliente, ApiResponse, PedidoDetail } from "@/types";

interface ProdutoItem {
  id: string;
  produtoId: string;
  nome: string;
  quantidade: number;
  precoUnitario: number;
}

export default function NovoPedidoPage() {
  const router = useRouter();
  const { data: produtosData } = useApi<Produto[]>("/produtos?ativo=true");
  const { data: clientesData } = useApi<Cliente[]>("/clientes");

  const [numeroPedido, setNumeroPedido] = useState("");
  const [clienteId, setClienteId] = useState("");
  const [dataPedido, setDataPedido] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [prazoEntrega, setPrazoEntrega] = useState("");
  const [produtos, setProdutos] = useState<ProdutoItem[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [savedPedidoId, setSavedPedidoId] = useState<string | null>(null);

  const [produtoSelecionado, setProdutoSelecionado] = useState("");
  const [quantidade, setQuantidade] = useState("");

  const produtosAtivos = produtosData || [];
  const clientes = clientesData || [];

  const opcoesClientes = clientes.map((c) => ({
    value: c.id,
    label: c.nome,
  }));

  const opcoesProdutos = produtosAtivos.map((p) => ({
    value: p.id,
    label: `${p.nome} - ${p.preco.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}`,
  }));

  const adicionarProduto = () => {
    if (!produtoSelecionado || !quantidade || Number(quantidade) <= 0) return;

    const produto = produtosAtivos.find((p) => p.id === produtoSelecionado);
    if (!produto) return;

    const existente = produtos.find((p) => p.produtoId === produtoSelecionado);
    if (existente) {
      setProdutos(
        produtos.map((p) =>
          p.produtoId === produtoSelecionado
            ? { ...p, quantidade: p.quantidade + Number(quantidade) }
            : p
        )
      );
    } else {
      const novo: ProdutoItem = {
        id: crypto.randomUUID(),
        produtoId: produto.id,
        nome: produto.nome,
        quantidade: Number(quantidade),
        precoUnitario: produto.preco,
      };
      setProdutos([...produtos, novo]);
    }

    setProdutoSelecionado("");
    setQuantidade("");
  };

  const removerProduto = (id: string) => {
    setProdutos(produtos.filter((p) => p.id !== id));
  };

  const total = produtos.reduce(
    (acc, p) => acc + p.quantidade * p.precoUnitario,
    0
  );

  const formatCurrency = (value: number) =>
    value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

  const handleSalvar = async () => {
    setError("");
    setSaving(true);

    try {
      const payload = {
        numero: numeroPedido,
        clienteId,
        dataPedido,
        prazoEntrega,
        itens: produtos.map((p) => ({
          produtoId: p.produtoId,
          quantidade: p.quantidade,
        })),
      };

      const res = await api.post<ApiResponse<PedidoDetail>>("/pedidos", payload);
      setSavedPedidoId(res.data.id);
      setModalOpen(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao salvar pedido");
    } finally {
      setSaving(false);
    }
  };

  const handleEnviar = async () => {
    if (!savedPedidoId) return;
    setSending(true);

    try {
      await api.post(`/pedidos/${savedPedidoId}/enviar`);
      router.push("/pedidos");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao enviar pedido");
      setSending(false);
    }
  };

  const clienteSelecionado = clientes.find((c) => c.id === clienteId);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <button
          onClick={() => router.push("/pedidos")}
          className="p-2 rounded-md hover:bg-accent text-foreground transition-colors"
        >
          <ArrowLeft size={20} />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-foreground">Novo Pedido</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Preencha os dados do pedido
          </p>
        </div>
      </div>

      {error && (
        <div className="rounded-lg bg-danger/10 border border-danger/20 px-4 py-3 text-sm text-danger">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Informações do Pedido</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Número do Pedido"
                  placeholder="#001"
                  value={numeroPedido}
                  onChange={(e) => setNumeroPedido(e.target.value)}
                />
                <SearchSelect
                  label="Cliente"
                  placeholder="Selecione o cliente..."
                  options={opcoesClientes}
                  value={clienteId}
                  onChange={setClienteId}
                />
                <Input
                  label="Data do Pedido"
                  type="date"
                  value={dataPedido}
                  onChange={(e) => setDataPedido(e.target.value)}
                />
                <Input
                  label="Prazo de Entrega"
                  type="date"
                  value={prazoEntrega}
                  onChange={(e) => setPrazoEntrega(e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Produtos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-3 mb-4">
                <div className="flex-1">
                  <SearchSelect
                    placeholder="Selecione o produto..."
                    options={opcoesProdutos}
                    value={produtoSelecionado}
                    onChange={setProdutoSelecionado}
                  />
                </div>
                <div className="w-full sm:w-28">
                  <Input
                    type="number"
                    placeholder="Qtd"
                    value={quantidade}
                    onChange={(e) => setQuantidade(e.target.value)}
                    min="1"
                  />
                </div>
                <Button onClick={adicionarProduto} variant="secondary">
                  <Plus size={16} className="mr-1" />
                  Adicionar
                </Button>
              </div>

              {produtos.length > 0 && (
                <div className="overflow-x-auto rounded-lg border border-border">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border bg-muted/50">
                        <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                          Produto
                        </th>
                        <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                          Qtd
                        </th>
                        <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                          Preço Un.
                        </th>
                        <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                          Subtotal
                        </th>
                        <th className="px-4 py-3 w-12" />
                      </tr>
                    </thead>
                    <tbody>
                      {produtos.map((p) => (
                        <tr
                          key={p.id}
                          className="border-b border-border last:border-0"
                        >
                          <td className="px-4 py-3">{p.nome}</td>
                          <td className="px-4 py-3">{p.quantidade}</td>
                          <td className="px-4 py-3">
                            {formatCurrency(p.precoUnitario)}
                          </td>
                          <td className="px-4 py-3">
                            {formatCurrency(p.quantidade * p.precoUnitario)}
                          </td>
                          <td className="px-4 py-3">
                            <button
                              onClick={() => removerProduto(p.id)}
                              className="p-1 rounded hover:bg-danger/10 text-danger transition-colors"
                            >
                              <Trash2 size={16} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Resumo</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Itens</span>
                  <span className="font-medium">{produtos.length}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Quantidade total</span>
                  <span className="font-medium">
                    {produtos.reduce((acc, p) => acc + p.quantidade, 0)}
                  </span>
                </div>
                <div className="border-t border-border pt-3">
                  <div className="flex justify-between">
                    <span className="font-medium">Total</span>
                    <span className="text-lg font-bold text-primary">
                      {formatCurrency(total)}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Button
            className="w-full"
            disabled={!numeroPedido || !clienteId || !prazoEntrega || produtos.length === 0}
            onClick={handleSalvar}
            loading={saving}
          >
            <FileText size={16} className="mr-2" />
            Salvar Pedido
          </Button>

          <Button
            variant="outline"
            className="w-full"
            onClick={() => router.push("/pedidos")}
          >
            Cancelar
          </Button>
        </div>
      </div>

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Pedido Salvo!"
        footer={
          <>
            <Button variant="outline" onClick={() => setModalOpen(false)}>
              Voltar e Editar
            </Button>
            <Button onClick={handleEnviar} loading={sending}>
              <Send size={16} className="mr-2" />
              Enviar para Cliente
            </Button>
          </>
        }
      >
        <div className="space-y-4">
          <p className="text-muted-foreground">
            O pedido <strong>{numeroPedido}</strong> foi salvo com sucesso.
          </p>
          <div className="rounded-lg bg-muted/50 p-4 space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Cliente</span>
              <span className="font-medium">{clienteSelecionado?.nome}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Itens</span>
              <span className="font-medium">{produtos.length} produto(s)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Total</span>
              <span className="font-bold text-primary">{formatCurrency(total)}</span>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
