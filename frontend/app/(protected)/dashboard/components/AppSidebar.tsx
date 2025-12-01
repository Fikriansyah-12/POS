"use client";

import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  Settings,
  BarChart3,
  Tickets,
  CreditCard,
  ChevronDown,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { useState, useMemo } from "react";
import Link from "next/link";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
  useSidebar,
} from "@/app/components/ui/sidebar";

type MenuChild = {
  title: string;
  url: string;
};

type MenuItem = {
  key: string;
  title: string;
  url?: string;
  icon: React.ComponentType<{ className?: string }>;
  children?: MenuChild[];
};

const menuItems: MenuItem[] = [
  {
    key: "dashboard",
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    key: "products",
    title: "Products",
    url: "/dashboard/product",
    icon: Package,
    children: [
      { title: "Daftar Produk", url: "/dashboard/product" },
      { title: "Kategori", url: "/dashboard/categories" },
      { title: "Supplier", url: "/dashboard/supplier" },
    ],
  },
  {
    key: "orders",
    title: "Orders",
    url: "/dashboard/sale",
    icon: ShoppingCart,
  },
  {
    key: "payment",
    title: "Metode Pembayaran",
    url: "/dashboard/payment",
    icon: CreditCard,
  },
  {
    key: "customers",
    title: "Customers",
    url: "/dashboard/customer",
    icon: Users,
  },
  { key: "promo", title: "Promo", url: "/dashboard/promo", icon: Tickets },
  {
    key: "analytics",
    title: "Analytics",
    url: "/dashboard/analytics",
    icon: BarChart3,
  },
  {
    key: "settings",
    title: "Settings",
    url: "/dashboard/settings",
    icon: Settings,
  },
];

export function AppSidebar() {
  const { open } = useSidebar();
  const pathname = usePathname();

  const defaultOpenKey = useMemo(() => {
    const parentWithActiveChild = menuItems.find((item) => {
      if (!item.children) return false;
      return item.children.some((child) => pathname.startsWith(child.url));
    });

    return parentWithActiveChild?.key ?? null;
  }, [pathname]);

  const [openParentKey, setOpenParentKey] = useState<string | null>(
    defaultOpenKey
  );

  const handleToggleParent = (key: string) => {
    setOpenParentKey((prev) => (prev === key ? null : key));
  };

  return (
    <Sidebar collapsible="icon" className="border-r border-sidebar-border">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-black mb-5 mt-5 font-semibold text-2xl px-4 py-4">
            {open ? "POS Sistem" : "POS"}
          </SidebarGroupLabel>
          <div className="border-b-2 bg-sky-400 mb-2" />
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => {
                const Icon = item.icon;
                const hasChildren = !!item.children?.length;

                const isActiveParent =
                  item.url && pathname.startsWith(item.url);
                const isActiveChild = hasChildren
                  ? item.children!.some((child) =>
                      pathname.startsWith(child.url)
                    )
                  : false;

                const isActive = isActiveParent || isActiveChild;

                const isOpen = hasChildren && openParentKey === item.key;

                return (
                  <SidebarMenuItem key={item.key}>
                    <SidebarMenuButton
                      asChild // ← PAKAI asChild SELALU
                      isActive={isActive}
                      className="transition-all duration-200"
                    >
                      {hasChildren ? (
                        <button
                          type="button"
                          className="flex items-center justify-between gap-2 w-full text-left"
                          onClick={() => handleToggleParent(item.key)}
                        >
                          <span className="flex items-center gap-3">
                            <Icon className="h-5 w-5" />
                            <span className="font-medium">{item.title}</span>
                          </span>
                          <ChevronDown
                            className={`h-4 w-4 transition-transform ${
                              isOpen ? "rotate-180" : "rotate-0"
                            }`}
                          />
                        </button>
                      ) : (
                        <Link href={item.url!} className="flex items-center gap-3">
    <Icon className="h-5 w-5" />
    <span className="font-medium">{item.title}</span>
  </Link>
                      )}
                    </SidebarMenuButton>

                    {hasChildren && isOpen && (
                      <SidebarMenuSub>
                        {item.children!.map((child) => {
                          const isChildActive = pathname.startsWith(child.url);

                          return (
                            <SidebarMenuSubItem key={child.title}>
                              <SidebarMenuSubButton
                                asChild
                                isActive={isChildActive}
                                size="sm"
                              >
                                <Link href={child.url}>
                                  <span>{child.title}</span>
                                </Link>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          );
                        })}
                      </SidebarMenuSub>
                    )}
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
