"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, ArrowRightLeft, BadgeDollarSign, Settings, Package } from "lucide-react";

const routes = [
    { href: "/dashboard", label: "Dashboard", icon: Home, isSpecial: true },
    { href: "/accounts", label: "Accounts", icon: Package },
    { href: "/transactions", label: "Transactions", icon: ArrowRightLeft },
    { href: "/settings", label: "Settings", icon: Settings }
];

export default function Component() {
  const pathname = usePathname();

  return (
    <footer className="fixed  md:hidden rounded-[2px] bottom-0 p-3 bg-gradient-to-t from-[#00D399] to-[#056817] text-white left-0 w-full bg-background flex justify-between items-center z-50">
      {routes.map((route) => {
        const isActive = pathname === route.href;

        return (
          <Link
            key={route.href}
            href={route.href}
            className={`flex flex-col items-center gap-1 transition`}
            prefetch={false}
          >
            <route.icon className={`w-6 h-6 ${isActive ? 'text-black' : ''}`} />
            <span className={`text-xs ${isActive ? 'text-black font-bold ' : ''}`}>{route.label}</span>
          </Link>
        );
      })}
    </footer>
  );
}
