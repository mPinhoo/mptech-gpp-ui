"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { SidebarProvider, useSidebar } from "@/components/providers/SidebarProvider";
import { useAuth } from "@/components/providers/AuthProvider";

function DashboardContent({ children }: { children: React.ReactNode }) {
  const { isMobile, expanded, pinned } = useSidebar();

  const marginLeft = isMobile ? "ml-0" : expanded && pinned ? "ml-[260px]" : "ml-16";

  return (
    <div className={`flex-1 flex flex-col transition-[margin-left] duration-300 ease-in-out ${marginLeft}`}>
      <Header />
      <main className="flex-1 p-4 md:p-6">{children}</main>
    </div>
  );
}

function AuthGate({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.replace("/login");
    }
  }, [loading, isAuthenticated, router]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  if (!isAuthenticated) return null;

  return <>{children}</>;
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGate>
      <SidebarProvider>
        <div className="relative flex h-full min-h-screen">
          <Sidebar />
          <DashboardContent>{children}</DashboardContent>
        </div>
      </SidebarProvider>
    </AuthGate>
  );
}
