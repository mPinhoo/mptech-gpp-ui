import { TriangleAlert } from "lucide-react";
import { cn } from "@/lib/utils";
import { sampleKanban } from "./data";

export function KanbanBoardMock({ className }: { className?: string }) {
  return (
    <div className={cn("grid grid-cols-3 gap-2.5", className)}>
      {sampleKanban.map((column) => (
        <div key={column.coluna} className="min-w-0 rounded-lg bg-muted/70 p-2">
          <div className="mb-2 flex items-center justify-between gap-1 px-0.5">
            <span className="truncate text-[10px] font-semibold text-foreground">{column.coluna}</span>
            <span className="rounded bg-background px-1.5 text-[10px] font-medium text-muted-foreground">
              {column.cards.length}
            </span>
          </div>
          <div className="space-y-1.5">
            {column.cards.map((card) => (
              <div
                key={card.numero}
                className={cn(
                  "rounded-md border bg-card p-2 shadow-sm",
                  card.alerta ? "border-danger/60" : "border-border"
                )}
              >
                <p className="text-[10px] font-semibold text-card-foreground">{card.numero}</p>
                <p className="truncate text-[10px] text-muted-foreground">{card.cliente}</p>
                {card.alerta ? (
                  <p className="mt-1 flex items-center gap-1 text-[9px] font-medium text-danger">
                    <TriangleAlert size={10} />
                    {card.alerta}
                  </p>
                ) : (
                  <p className="mt-1 text-[9px] text-muted-foreground">{card.prazo}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
