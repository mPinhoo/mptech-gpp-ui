"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  ShoppingCart,
  Package,
  Boxes,
  Pin,
  PinOff,
  X,
} from "lucide-react";
import { useSidebar } from "@/components/providers/SidebarProvider";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/home", label: "Home", icon: Home },
  { href: "/pedidos", label: "Pedidos", icon: ShoppingCart },
  { href: "/estoque", label: "Estoque", icon: Boxes },
  { href: "/produtos", label: "Produtos", icon: Package },
];

export function Sidebar() {
  const pathname = usePathname();
  const {
    expanded,
    pinned,
    isMobile,
    mobileOpen,
    setExpanded,
    togglePin,
    setMobileOpen,
  } = useSidebar();

  if (isMobile) {
    return (
      <>
        {mobileOpen && (
          <div
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
        )}
        <aside
          className={cn(
            "fixed inset-y-0 left-0 z-50 w-[260px] bg-sidebar border-r border-sidebar-border",
            "flex flex-col transition-transform duration-300 ease-in-out",
            mobileOpen ? "translate-x-0" : "-translate-x-full"
          )}
        >
          <SidebarHeader showPin={false} onClose={() => setMobileOpen(false)} />
          <SidebarNav pathname={pathname} expanded={true} />
        </aside>
      </>
    );
  }

  return (
    <aside
      className={cn(
        "fixed inset-y-0 left-0 z-30 flex flex-col border-r border-sidebar-border bg-sidebar",
        "transition-[width] duration-300 ease-in-out",
        expanded ? "w-[260px]" : "w-16"
      )}
      onMouseEnter={() => {
        if (!pinned) setExpanded(true);
      }}
      onMouseLeave={() => {
        if (!pinned) setExpanded(false);
      }}
    >
      <SidebarHeader showPin expanded={expanded} onTogglePin={togglePin} pinned={pinned} />
      <SidebarNav pathname={pathname} expanded={expanded} />
    </aside>
  );
}

function SidebarHeader({
  showPin = true,
  expanded = true,
  pinned,
  onTogglePin,
  onClose,
}: {
  showPin?: boolean;
  expanded?: boolean;
  pinned?: boolean;
  onTogglePin?: () => void;
  onClose?: () => void;
}) {
  return (
    <div className="flex h-16 items-center justify-between px-4 border-b border-sidebar-border">
      <div className={cn("flex items-center gap-2 overflow-hidden", !expanded && "justify-center w-full")}>
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold text-sm">
          GP
        </div>
        {expanded && (
          <span className="text-sm font-semibold text-sidebar-foreground whitespace-nowrap">
            MPTech GPP
          </span>
        )}
      </div>
      {showPin && expanded && onTogglePin && (
        <button
          onClick={onTogglePin}
          className="p-1.5 rounded-md hover:bg-sidebar-accent text-sidebar-foreground transition-colors"
          title={pinned ? "Desafixar sidebar" : "Fixar sidebar"}
        >
          {pinned ? <Pin size={16} /> : <PinOff size={16} />}
        </button>
      )}
      {onClose && (
        <button
          onClick={onClose}
          className="p-1.5 rounded-md hover:bg-sidebar-accent text-sidebar-foreground transition-colors"
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
}

function SidebarNav({
  pathname,
  expanded,
}: {
  pathname: string;
  expanded: boolean;
}) {
  return (
    <nav className="flex-1 overflow-y-auto py-4 px-2">
      <ul className="space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                  expanded ? "justify-start" : "justify-center",
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-foreground"
                )}
                title={!expanded ? item.label : undefined}
              >
                <Icon size={20} className="shrink-0" />
                {expanded && <span className="whitespace-nowrap">{item.label}</span>}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
