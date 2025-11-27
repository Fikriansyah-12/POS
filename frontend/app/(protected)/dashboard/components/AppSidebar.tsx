"use client";

import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  Settings,
  BarChart3,
  Tickets
} from "lucide-react";
import { usePathname } from "next/navigation";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/app/components/ui/sidebar";

const menuItems = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "Products", url: "/dashboard/product", icon: Package },
  { title: "Orders", url: "/dashboard/sale", icon: ShoppingCart },
  { title: "Customers", url: "/dashboard/customer", icon: Users },
  { title: "Promo", url: "/dashboard/promo", icon: Tickets },
  { title: "Analytics", url: "/dashboard/analytics", icon: BarChart3 },
  { title: "Settings", url: "/dashboard/settings", icon: Settings },
];

export function AppSidebar() {
  const { open } = useSidebar();
  const pathname = usePathname();

  return (
      <Sidebar collapsible="icon" className="border-r border-sidebar-border">
        <SidebarContent>
          <SidebarGroup >
            <SidebarGroupLabel className="text-black mb-5 mt-5 font-semibold text-2xl px-4 py-4">
              {open ? "POS Sistem" : "POS"}
            </SidebarGroupLabel>
            <div className="border-b-2 bg-sky-400 mb-2"></div>
            <SidebarGroupContent>
              <SidebarMenu>
                {menuItems.map((item) => {
                  const isActive = pathname === item.url;
                  const Icon = item.icon;

                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        asChild
                        isActive={isActive}
                        className="transition-all duration-200"
                      >
                        <a href={item.url} className="flex items-center gap-3">
                          <Icon className="h-5 w-5" />
                          <span className="font-medium">{item.title}</span>
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
  );
}
