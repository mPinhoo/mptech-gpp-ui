"use client";

import Link from "next/link";
import { useEffect, useId, useState } from "react";
import { ArrowRight, Menu, X } from "lucide-react";
import { buttonStyles } from "@/components/ui/button-styles";
import { landingNav, siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { useScrolledPast } from "./client-hooks";
import { ThemeToggle } from "./ThemeToggle";
import { ZentraLogo } from "./ZentraLogo";

const DESKTOP_NAV_QUERY = "(min-width: 1280px)";

export function LandingHeader() {
  const scrolled = useScrolledPast(8);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuId = useId();

  useEffect(() => {
    if (!menuOpen) return;

    const media = window.matchMedia(DESKTOP_NAV_QUERY);
    const closeOnDesktop = (event: MediaQueryListEvent) => {
      if (event.matches) setMenuOpen(false);
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };

    media.addEventListener("change", closeOnDesktop);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      media.removeEventListener("change", closeOnDesktop);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b transition-[background-color,border-color,box-shadow] duration-300",
        scrolled || menuOpen
          ? "border-border bg-background/85 shadow-[0_1px_12px_-6px_rgb(0_0_0/0.15)] backdrop-blur-md"
          : "border-transparent bg-background/0"
      )}
    >
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          aria-label="Zentra — página inicial"
        >
          <ZentraLogo />
        </Link>

        <nav aria-label="Navegação principal" className="hidden xl:block">
          <ul className="flex items-center gap-1">
            {landingNav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-1.5 sm:gap-2">
          <ThemeToggle />
          <Link
            href={siteConfig.routes.login}
            className={buttonStyles({ variant: "ghost", className: "hidden sm:inline-flex" })}
          >
            Entrar
          </Link>
          <Link
            href={siteConfig.routes.register}
            className={buttonStyles({ className: "group hidden gap-1.5 sm:inline-flex" })}
          >
            Começar agora
            <ArrowRight size={16} aria-hidden="true" className="transition-transform group-hover:translate-x-0.5" />
          </Link>
          <button
            type="button"
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-foreground transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring xl:hidden"
            aria-expanded={menuOpen}
            aria-controls={menuId}
            aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
          </button>
        </div>
      </div>

      <div
        id={menuId}
        hidden={!menuOpen}
        className="max-h-[calc(100dvh-4rem)] overflow-y-auto border-t border-border bg-background xl:hidden"
      >
        <nav aria-label="Navegação principal (menu)" className="mx-auto w-full max-w-6xl px-4 py-4 sm:px-6 lg:px-8">
          <ul className="flex flex-col">
            {landingNav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={closeMenu}
                  className="flex rounded-lg px-3 py-3 text-base font-medium text-foreground transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-4 grid gap-2 border-t border-border pt-4 sm:grid-cols-2">
            <Link
              href={siteConfig.routes.login}
              onClick={closeMenu}
              className={buttonStyles({ variant: "outline", size: "lg" })}
            >
              Entrar
            </Link>
            <Link
              href={siteConfig.routes.register}
              onClick={closeMenu}
              className={buttonStyles({ size: "lg" })}
            >
              Começar agora
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
