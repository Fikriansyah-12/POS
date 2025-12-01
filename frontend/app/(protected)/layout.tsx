"use client";

import { useAuthStore } from "@/store/auth-store";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProtectedLayout({ children }) {
  // const token = useAuthStore((s) => s.token);
  // const router = useRouter();
  // const [hydrated, setHydrated] = useState(false);

  // useEffect(() => {
  //   setHydrated(true);
  // }, []);

  // useEffect(() => {
  //   if (!hydrated) return;
  //   if (!token) router.replace("/login");
  // }, [hydrated, token, router]);

  // if (!hydrated) return null; // atau skeleton

  // if (!token) return <p>Checking session...</p>;

  return <>{children}</>;
}
