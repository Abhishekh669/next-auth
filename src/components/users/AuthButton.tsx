"use client";
import { Button } from "@/components/ui/button";
import {  signOut } from "@/helper";
import { useRouter } from "next/navigation";
import { CircleUser,  } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";


export default function AuthButton() {
  const router = useRouter();
  return (
    <div className="absolute right-4">
    <DropdownMenu >
      <DropdownMenuTrigger asChild>
        <Button variant="secondary" size="sm" className="rounded-full">
          <CircleUser  className="h-6 w-6" />
          <span className="sr-only">Toggle user menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="">
        
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={
          async() =>{
            await signOut();
            router.push("/sign-in");
          }
        }>Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
    </div>
  );
}
