"use client"
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Plus } from "lucide-react";
import React from "react";
import AccountForm from "./AccountForm";
import BankAccount from "./BankAccount";
import { useGetUserBankDetails } from "@/utils/hooks/queryHooks/accounts/useGetUserBankDetails";
import { useSession } from "next-auth/react";
import BankDetails from "./BankDetails";

function AccountPage() {
  const session = useSession();
console.log("this is the session",session)
  const {data, isLoading, error} = useGetUserBankDetails(session?.data?.user._id as string);
  console.log("this is the data",data)
  return (
    <>
      <Sheet>
        <Card className="border-none drop-shadow-sm text-white">
          <CardHeader className="lg:items-center lg:justify-between gap-y-2 lg:flex-row">
            <CardTitle className="text-xl line-clamp-1">Account Page</CardTitle>
            <SheetTrigger>
              <Button
                size={"sm"}
                className="w-full  text-white bg-gradient-to-t from-[#00D399] to-[#056817]  rounded-[10px] hover:bg-green-500 "
              >
                <Plus className="size-4 mr-2" />
                Add Bank
              </Button>
            </SheetTrigger>
          </CardHeader>
        </Card>
        <SheetContent className="bg-black border-l-2 border-l-green-600 text-white flex flex-col gap-y-8 ">
          <SheetHeader>
            <SheetTitle className="text-[24px] ">
              <span className="text-[30px] font-bold bg-gradient-to-t from-[#00D399] to-[#056817] rounded-[5px] bg-clip-text text-transparent filter drop-shadow-[0_2px_2px_rgba(0,0,0,0.5)]">
                Add Bank Detail
              </span>
            </SheetTitle>
          </SheetHeader>
          <BankAccount  userId={session?.data?.user._id as string}/>
        </SheetContent>
      </Sheet>

      <BankDetails data={data} isLoading={isLoading} error={error} />

    </>
  );
}

export default AccountPage;
