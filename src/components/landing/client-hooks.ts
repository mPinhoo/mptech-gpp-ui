"use client";

import { useSyncExternalStore } from "react";

const subscribeNothing = () => () => {};

/** `true` somente após a hidratação — evita divergência entre servidor e cliente. */
export function useHydrated() {
  return useSyncExternalStore(
    subscribeNothing,
    () => true,
    () => false
  );
}

function subscribeScroll(onChange: () => void) {
  window.addEventListener("scroll", onChange, { passive: true });
  return () => window.removeEventListener("scroll", onChange);
}

export function useScrolledPast(offset: number) {
  return useSyncExternalStore(
    subscribeScroll,
    () => window.scrollY > offset,
    () => false
  );
}
