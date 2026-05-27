"use client";

import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { SidebarProvider, useSidebar } from "@/components/providers/SidebarProvider";

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

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <div className="relative flex h-full min-h-screen">
        <Sidebar />
        <DashboardContent>{children}</DashboardContent>
      </div>
    </SidebarProvider>
  );
}
