"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { useMediaQuery } from "@/hooks/useMediaQuery";

interface SidebarContextValue {
  expanded: boolean;
  pinned: boolean;
  isMobile: boolean;
  mobileOpen: boolean;
  setExpanded: (value: boolean) => void;
  setPinned: (value: boolean) => void;
  setMobileOpen: (value: boolean) => void;
  togglePin: () => void;
  toggleMobile: () => void;
}

const SidebarContext = createContext<SidebarContextValue | null>(null);

const PINNED_KEY = "sidebar-pinned";

export function SidebarProvider({ children }: { children: ReactNode }) {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [pinned, setPinnedState] = useState(true);
  const [expanded, setExpanded] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(PINNED_KEY);
    if (stored !== null) {
      const val = stored === "true";
      setPinnedState(val);
      setExpanded(val);
    }
  }, []);

  useEffect(() => {
    if (isMobile) {
      setMobileOpen(false);
    }
  }, [isMobile]);

  const setPinned = useCallback((value: boolean) => {
    setPinnedState(value);
    localStorage.setItem(PINNED_KEY, String(value));
    if (value) {
      setExpanded(true);
    }
  }, []);

  const togglePin = useCallback(() => {
    setPinned(!pinned);
  }, [pinned, setPinned]);

  const toggleMobile = useCallback(() => {
    setMobileOpen((prev) => !prev);
  }, []);

  return (
    <SidebarContext.Provider
      value={{
        expanded,
        pinned,
        isMobile,
        mobileOpen,
        setExpanded,
        setPinned,
        setMobileOpen,
        togglePin,
        toggleMobile,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebar() {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
}
