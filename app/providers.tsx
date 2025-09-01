"use client";
import { UserProvider } from "@/lib/userStore";

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  return <UserProvider>{children}</UserProvider>;
}
