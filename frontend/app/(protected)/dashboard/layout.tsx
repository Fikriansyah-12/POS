"use client";

import React from "react";
import {
  SidebarProvider,
  SidebarTrigger,
} from "@/app/components/ui/sidebar"; // BUKAN "@/app/..."
import { AppSidebar } from "./components/AppSidebar";
import { Sidebar } from "./components/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background">
        {/* Sidebar kiri */}
        <AppSidebar />
        {/* <Sidebar/> */}

        {/* Konten kanan */}
        <div className="flex-1 flex flex-col">
          {/* Header/topbar */}
          <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b border-border bg-background px-6">
            <SidebarTrigger />
            <div className="flex-1" />
            {/* Taruh tombol logout/avatar di sini kalau perlu */}
          </header>

          {/* Konten halaman */}
          <main className="flex-1 p-6">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
