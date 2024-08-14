"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMedia } from "react-use";
import { Home, ArrowRightLeft, Contact, BadgeDollarSign, Settings, Package2, Menu } from "lucide-react";
import NavItem from "./DashboardCard"; // Import the correct NavItem component
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";

export default function Navigation() {
  const pathname = usePathname();
  const isMobile = useMedia("(max-width: 1024px)", false);

  const routes = [
    { href: "/dashboard", label: "Overview", icon: Home },
    { href: "/transactions", label: "Transactions", icon: ArrowRightLeft },
    { href: "/accounts", label: "Accounts", icon: Contact, badgeCount: 6 },
    { href: "/budgets", label: "Budgets", icon: BadgeDollarSign },
    { href: "/settings", label: "Settings", icon: Settings },
  ];

  if (isMobile) {
    return (
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="shrink-0 size-6 md:hidden border-none ml-3"
          >
            <Menu className="h-8 w-8" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent
          side="left"
          className="flex  flex-col bg-red-600 text-green-600"
        >
          <nav className="grid gap-2 text-lg font-medium">
            <Link
              href="#"
              className="flex items-center gap-2 text-lg font-semibold"
            >
              <Package2 className="h-6 w-6" />
              <span className="sr-only">Acme Inc</span>
            </Link>
            {routes.map((route) => (
              <NavItem
                key={route.href}
                href={route.href}
                label={route.label}
                icon={route.icon}
                badgeCount={route.badgeCount}
                isActive={pathname === route.href}
                onClick={() => {
                  document
                    .querySelector('[data-state="open"]')
                    ?.dispatchEvent(new Event("click", { bubbles: true, cancelable: true }));
                }}
              />
            ))}
          </nav>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <nav className='hidden lg:flex items-center gap-x-2'>
      {routes.map((route) => (
        <NavItem
          key={route.href}
          href={route.href}
          label={route.label}
          icon={route.icon}
          badgeCount={route.badgeCount}
          isActive={pathname === route.href}
        />
      ))}
    </nav>
  );
}
