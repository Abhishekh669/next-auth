"use client"
import React, { useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { useMedia, useStartTyping} from "react-use";
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet';
import { Button } from '../ui/button';
import Link from "next/link";
import {
  ArrowRightLeft,
  BadgeDollarSignIcon,
  Bell,
  CircleUser,
  Contact,
  Home,
  LineChart,
  Menu,
  Package,
  Package2,
  Search,
  Settings,
  ShoppingCart,
  Users,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import NavButton from './nav-button';


function Navigation() {
  const pathname = usePathname();
    const routes = [
        {
            href : "/dashboard",
            label : "Overview"
        },
        {
            href : "/transactions",
            label : "Transactions",
        },
        {
            href : "/accounts",
            label : "Accounts",
        },
        {
            href  : "/budgets",
            label : "Budgets"
        },
        {
            href : "/settings",
            label : "Settings"
        }
    ]
    // const isMobile = useMedia("(max-width : 1024px)",false);

    // if(isMobile){
    //     return (
    //       <Sheet>
    //         <SheetTrigger asChild>
    //           <Button
    //             variant="outline"
    //             size="icon"
    //             className="shrink-0 size-6 md:hidden border-none ml-3"
    //           >
    //             <Menu className="h-8 w-8" />
    //             <span className="sr-only">Toggle navigation menu</span>
    //           </Button>
    //         </SheetTrigger>
    //         <SheetContent
    //           side="left"
    //           className="flex flex-col bg-white text-green-600"
    //         >
    //           <nav className="grid gap-2 text-lg font-medium">
    //             <Link
    //               href="#"
    //               className="flex items-center gap-2 text-lg font-semibold"
    //             >
    //               <Package2 className="h-6 w-6" />
    //               <span className="sr-only">Acme Inc</span>
    //             </Link>
    //             <Link
    //               href="/dashboard"
    //               className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
    //               onClick={() => {
    //                 document
    //                   .querySelector('[data-state="open"]')
    //                   ?.dispatchEvent(new Event("click", { bubbles: true, cancelable: true }))
    //               }}
    //               prefetch={false}
    //             >
    //               <Home className="h-5 w-5" />
    //               Dashboard
    //             </Link>
    //             <Link
    //               href="/accounts"
    //               className="mx-[-0.65rem] flex items-center gap-4 rounded-xl bg-muted px-3 py-2 text-foreground hover:text-foreground"
    //               onClick={() => {
    //                 document
    //                   .querySelector('[data-state="open"]')
    //                   ?.dispatchEvent(new Event("click", { bubbles: true, cancelable: true }))
    //               }}
    //             >
    //               <Contact className="h-5 w-5" />
    //               Accounts
    //               <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
    //                 6
    //               </Badge>
    //             </Link>
    //             <Link
    //               href="/transactions"
    //               className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
    //               onClick={() => {
    //                 document
    //                   .querySelector('[data-state="open"]')
    //                   ?.dispatchEvent(new Event("click", { bubbles: true, cancelable: true }))
    //               }}
    //               prefetch={false}
    //             >
    //               <ArrowRightLeft className="h-5 w-5" />
    //               Transactions
    //             </Link>
    //             <Link
    //               href="/budgets"
    //               className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
    //               onClick={() => {
    //                 document
    //                   .querySelector('[data-state="open"]')
    //                   ?.dispatchEvent(new Event("click", { bubbles: true, cancelable: true }))
    //               }}
    //               prefetch={false}
    //             >
    //               <BadgeDollarSignIcon className="h-5 w-5" />
    //               Budgets
    //             </Link>
    //             <Link
    //               href="/settings"
    //               className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
    //               onClick={() => {
    //                 document
    //                   .querySelector('[data-state="open"]')
    //                   ?.dispatchEvent(new Event("click", { bubbles: true, cancelable: true }))
    //               }}
    //               prefetch={false}
    //             >
    //               <Settings className="h-5 w-5" />
    //               Settings
    //             </Link>
    //           </nav>
             
    //         </SheetContent>
    //       </Sheet>
    //     );
    // }    

  return (
   <nav className='hidden md:flex items-center gap-x-2'>
    {routes.map((route) =>(
        <NavButton 
            key = {route.href}
            href= {route.href}
            label = {route.label}
            isActive = {pathname === route.href}
        />
    ))}
   </nav>
  )
}

export default Navigation
