"use client"
import React, { useState } from 'react'
import  NavButton  from './nav-button'
import { usePathname, useRouter } from 'next/navigation'
import { useMedia, useStartTyping} from "react-use";
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';
import { Button } from './ui/button';
import { Menu } from 'lucide-react';

function navigation() {
    const routes = [
        {
            href : "/",
            label : "Overview"
        },
        {
            href : "/ transactions",
            label : "Transactions",
        },
        {
            href : "/accounts",
            label : "Accounts",
        },
        {
            href  : "/catagories",
            label : "Catagories"
        },
        {
            href : "/settting",
            label : "Settings"
        }
    ]
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();
    const isMobile = useMedia("(max-width : 1024px)",false);
    const pathname = usePathname();
    const onClick = (href : string) =>{

        router.push(href);
        setIsOpen(false);

    };
    if(isMobile){
        return (
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger>
              <Button
                variant={"outline"}
                size="sm"
                className=" w-full  m-0 text-black  lg:w-auto justify-between font-normal  hover:text-[#00D399] border-none focus-visible:ring-offset-0 focus-visible:ring-transparent outline-none  focus:bg-white/30 transition "
              >
                <Menu className="h-6 w-6  text-white " />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className='bg-white' >
              <nav className="flex flex-col gap-y-6  pt-6 ">
                {routes.map((route) => (
                  <Button
                    key={route.href}
                    variant={route.href === pathname ? "secondary" : "ghost"}
                    onClick={() => onClick(route.href)}
                    className="text-[#00D399] "
                  >
                    {route.label}
                  </Button>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        );
    }    

  return (
   <nav className='hidden lg:flex items-center gap-x-2'>
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

export default navigation
