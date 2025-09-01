"use client";
import { Home, Map, Zap, Wallet, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const tabs = [
  { href: "/", label: "Home", Icon: Home },
  { href: "/routes", label: "Routes", Icon: Map },
  { href: "/run", label: "Run", Icon: Zap },
  { href: "/wallet", label: "Wallet", Icon: Wallet },
  { href: "/profile", label: "Profile", Icon: User }
];

export default function TabBar() {
  const pathname = usePathname();
  return (
    <>
      {/* bara iOS (home indicator) */}
      <div className="fixed bottom-3 left-1/2 -translate-x-1/2 w-[120px] h-[4px] rounded-full bg-white/60" />
      <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[360px] max-w-[92%] px-4 py-3 rounded-[28px] glass">
        <div className="flex justify-between">
          {tabs.map(({ href, label, Icon }) => {
            const active = pathname === href;
            return (
              <Link key={href} href={href} className="relative flex flex-col items-center gap-1">
                <Icon size={22} className={active ? "text-neon" : "text-white/70"} />
                <span className={`text-[11px] ${active ? "text-neon" : "text-white/60"}`}>{label}</span>
                {active && <span className="dot" />}
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}
