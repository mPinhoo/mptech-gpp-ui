"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Plus, Trash2, Send, FileText } from "lucide-react";
import { Button, Input, SearchSelect, Modal, Card, CardHeader, CardTitle, CardContent } from "@/components/ui";
import { produtosCadastrados } from "@/data/produtos";

interface ProdutoItem {
  id: string;
  produtoId: string;
  nome: string;
  quantidade: number;
  precoUnitario: number;
}

const produtosAtivos = produtosCadastrados.filter((p) => p.ativo);

const opcoesSelect = produtosAtivos.map((p) => ({
  value: p.id,
  label: `${p.nome} - ${p.preco.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}`,
}));

export default function NovoPedidoPage() {
  const router = useRouter();
  const [numeroPedido, setNumeroPedido] = useState("");
  const [dataPedido, setDataPedido] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [prazoEntrega, setPrazoEntrega] = useState("");
  const [produtos, setProdutos] = useState<ProdutoItem[]>([]);
  const [modalOpen, setModalOpen] = useState(false);

  const [produtoSelecionado, setProdutoSelecionado] = useState("");
  const [quantidade, setQuantidade] = useState("");

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

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <button
          onClick={() => router.push("/pedidos")}
          className="p-2 rounded-lg hover:bg-accent text-muted-foreground transition-colors"
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Informações do Pedido</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Input
                  label="Número do Pedido"
                  placeholder="Ex: #006"
                  value={numeroPedido}
                  onChange={(e) => setNumeroPedido(e.target.value)}
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
              <div className="grid grid-cols-1 sm:grid-cols-[3fr_1fr_auto] gap-3 items-end">
                <SearchSelect
                  label="Produto"
                  placeholder="Buscar produto..."
                  options={opcoesSelect}
                  value={produtoSelecionado}
                  onChange={(val) => setProdutoSelecionado(val)}
                />
                <Input
                  label="Qtd"
                  type="number"
                  placeholder="0"
                  min="1"
                  value={quantidade}
                  onChange={(e) => setQuantidade(e.target.value)}
                />
                <Button onClick={adicionarProduto} size="md">
                  <Plus size={16} className="mr-1" />
                  Adicionar
                </Button>
              </div>

              {produtos.length > 0 && (
                <div className="mt-6 overflow-x-auto rounded-lg border border-border">
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
                          Preço Unit.
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
                          <td className="px-4 py-3 text-foreground">
                            {p.nome}
                          </td>
                          <td className="px-4 py-3 text-foreground">
                            {p.quantidade}
                          </td>
                          <td className="px-4 py-3 text-foreground">
                            {formatCurrency(p.precoUnitario)}
                          </td>
                          <td className="px-4 py-3 font-medium text-foreground">
                            {formatCurrency(p.quantidade * p.precoUnitario)}
                          </td>
                          <td className="px-4 py-3">
                            <button
                              onClick={() => removerProduto(p.id)}
                              className="p-1.5 rounded-md hover:bg-danger/10 text-danger transition-colors"
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

              {produtos.length === 0 && (
                <div className="mt-6 py-8 text-center text-muted-foreground text-sm border border-dashed border-border rounded-lg">
                  Nenhum produto adicionado ainda
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
                  <span className="text-foreground">{produtos.length}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Qtd Total</span>
                  <span className="text-foreground">
                    {produtos.reduce((acc, p) => acc + p.quantidade, 0)}
                  </span>
                </div>
                <div className="border-t border-border pt-3 flex justify-between">
                  <span className="font-medium text-foreground">Total</span>
                  <span className="font-bold text-foreground text-lg">
                    {formatCurrency(total)}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex flex-col gap-3">
            <Button
              className="w-full"
              disabled={!numeroPedido || produtos.length === 0}
              onClick={() => setModalOpen(true)}
            >
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
      </div>

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Detalhamento do Pedido"
        className="max-w-2xl"
        footer={
          <>
            <Button variant="outline" onClick={() => setModalOpen(false)}>
              Voltar e Editar
            </Button>
            <Button onClick={() => router.push("/pedidos")}>
              <Send size={16} className="mr-2" />
              Enviar para Cliente
            </Button>
          </>
        }
      >
        <div className="space-y-5">
          <div className="flex items-center gap-3 pb-4 border-b border-border">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <FileText size={20} className="text-primary" />
            </div>
            <div>
              <p className="font-semibold text-card-foreground">Pedido {numeroPedido}</p>
              <p className="text-xs text-muted-foreground">
                Este detalhamento será enviado ao cliente para aprovação
              </p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">Número</span>
              <p className="font-medium text-card-foreground">{numeroPedido}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Data</span>
              <p className="font-medium text-card-foreground">
                {dataPedido ? new Date(dataPedido + "T12:00:00").toLocaleDateString("pt-BR") : "-"}
              </p>
            </div>
            <div>
              <span className="text-muted-foreground">Prazo de Entrega</span>
              <p className="font-medium text-card-foreground">
                {prazoEntrega ? new Date(prazoEntrega + "T12:00:00").toLocaleDateString("pt-BR") : "-"}
              </p>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium text-muted-foreground mb-2">Produtos</h4>
            <div className="overflow-x-auto rounded-lg border border-border">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted/50">
                    <th className="px-3 py-2 text-left font-medium text-muted-foreground">Produto</th>
                    <th className="px-3 py-2 text-center font-medium text-muted-foreground">Qtd</th>
                    <th className="px-3 py-2 text-right font-medium text-muted-foreground">Preço Unit.</th>
                    <th className="px-3 py-2 text-right font-medium text-muted-foreground">Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {produtos.map((p) => (
                    <tr key={p.id} className="border-b border-border last:border-0">
                      <td className="px-3 py-2 text-card-foreground">{p.nome}</td>
                      <td className="px-3 py-2 text-center text-card-foreground">{p.quantidade}</td>
                      <td className="px-3 py-2 text-right text-card-foreground">{formatCurrency(p.precoUnitario)}</td>
                      <td className="px-3 py-2 text-right font-medium text-card-foreground">
                        {formatCurrency(p.quantidade * p.precoUnitario)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="flex justify-between items-center pt-3 border-t border-border">
            <span className="text-sm text-muted-foreground">
              {produtos.length} {produtos.length === 1 ? "item" : "itens"} &middot;{" "}
              {produtos.reduce((acc, p) => acc + p.quantidade, 0)} unidades
            </span>
            <div className="text-right">
              <span className="text-sm text-muted-foreground">Total</span>
              <p className="text-xl font-bold text-card-foreground">{formatCurrency(total)}</p>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
