import { AuthProvider } from "@/components/providers/AuthProvider";

/**
 * Rotas do sistema (login, cadastro e área autenticada). A sessão fica
 * restrita a este grupo para que a landing page pública não dependa dela.
 */
export default function SistemaLayout({ children }: { children: React.ReactNode }) {
  return <AuthProvider>{children}</AuthProvider>;
}
