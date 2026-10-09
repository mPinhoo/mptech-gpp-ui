import { Bell, Menu, Search } from "lucide-react";
import { ZentraMark } from "../ZentraLogo";
import { sampleOrderList } from "./data";
import { KanbanBoardMock } from "./KanbanBoardMock";
import { AppWindow, MockupFigure, PhoneFrame, StatusPill } from "./primitives";

export function DevicesMockup() {
  return (
    <MockupFigure label="O Zentra aberto no computador, com o quadro de produção, e no celular, com a lista de pedidos em layout adaptado">
      <div className="relative mx-auto max-w-3xl sm:pb-4 sm:pr-28 sm:pt-24">
        <div className="hidden sm:block">
          <AppWindow title="Área de Trabalho" className="rounded-b-none">
            <div className="p-3 sm:p-4">
              <p className="mb-3 text-sm font-semibold text-foreground">Área de Trabalho</p>
              <KanbanBoardMock />
            </div>
          </AppWindow>
          <div className="mx-auto h-3 w-[104%] -translate-x-[2%] rounded-b-xl border border-t-0 border-border bg-muted" />
        </div>

        <PhoneFrame className="mx-auto w-[220px] sm:absolute sm:-bottom-2 sm:right-0 sm:w-[200px]">
          <div className="pt-8">
            <div className="flex items-center justify-between border-b border-border px-3 pb-2">
              <Menu size={14} className="text-foreground" />
              <div className="flex items-center gap-1.5">
                <ZentraMark className="h-4 w-4" />
                <span className="text-[11px] font-semibold text-foreground">Pedidos</span>
              </div>
              <Bell size={14} className="text-foreground" />
            </div>
            <div className="px-3 py-2.5">
              <div className="flex h-7 items-center gap-1.5 rounded-md border border-border px-2 text-[10px] text-muted-foreground">
                <Search size={11} />
                Buscar pedido ou cliente
              </div>
              <ul className="mt-2.5 space-y-1.5">
                {sampleOrderList.slice(0, 3).map((order) => (
                  <li key={order.numero} className="rounded-lg border border-border bg-card p-2">
                    <div className="flex items-center justify-between gap-1">
                      <span className="text-[10px] font-semibold text-card-foreground">{order.numero}</span>
                      <span className="text-[10px] tabular-nums text-foreground">{order.valor}</span>
                    </div>
                    <p className="truncate text-[10px] text-muted-foreground">{order.cliente}</p>
                    <div className="mt-1">
                      <StatusPill tone={order.tone}>{order.status}</StatusPill>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </PhoneFrame>
      </div>
    </MockupFigure>
  );
}
