"use client";

import { Menu, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { useSidebar } from "@/components/providers/SidebarProvider";
import { cn } from "@/lib/utils";

export function Header() {
  const { resolvedTheme, setTheme } = useTheme();
  const { isMobile, toggleMobile, expanded, pinned } = useSidebar();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <header
      className={cn(
        "sticky top-0 z-20 flex h-16 items-center gap-4 border-b border-border bg-background/80 backdrop-blur-sm px-4 md:px-6"
      )}
    >
      {isMobile && (
        <button
          onClick={toggleMobile}
          className="p-2 rounded-md hover:bg-accent text-foreground transition-colors"
        >
          <Menu size={20} />
        </button>
      )}

      <div className="flex-1" />

      {mounted && (
        <button
          onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
          className="p-2 rounded-md hover:bg-accent text-foreground transition-colors"
          title={resolvedTheme === "dark" ? "Modo claro" : "Modo escuro"}
        >
          {resolvedTheme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      )}
    </header>
  );
}
