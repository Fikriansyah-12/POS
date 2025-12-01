// app/dashboard/layout.tsx
"use client";

import React from "react";
import { SidebarProvider, SidebarTrigger } from "@/app/components/ui/sidebar"; 
import { AppSidebar } from "./components/AppSidebar";
import { useAuthStore } from "@/store/auth-store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

function Protected({ children }: { children: React.ReactNode }) {
  // const token = useAuthStore((s) => s.token);
  // const router = useRouter();

  // useEffect(() => {
  //   if (!token) router.replace("/login");
  // }, [token, router]);

  // if (!token) return <p>Checking session...</p>;

  return <>{children}</>;
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <Protected>
      <SidebarProvider>
        <div className="flex min-h-screen w-full bg-background">
          <AppSidebar />
          <div className="flex-1 flex flex-col">
            <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b border-border bg-background px-6">
              <SidebarTrigger />
              <div className="flex-1" />
            </header>
            <main className="flex-1 p-6">{children}</main>
          </div>
        </div>
      </SidebarProvider>
    </Protected>
  );
}
