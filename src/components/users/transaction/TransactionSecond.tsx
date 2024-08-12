"use client";
import { Button } from "@/components/ui/button";
import TransactionData from "@/components/users/TransactionData";
import Transactions from "@/components/users/Transactions";
import { useGetUserTransactions } from "@/utils/hooks/queryHooks/transactions/useGetUserTransactions";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { TransBankDetails } from "@/types/bankdetail.types";
import Loader from "@/components/Loader";

function TransactionSecond ({user} : {user : any}) {
  const pathname = usePathname();

  const router = useRouter();
  const newPathname = pathname.split("/")[2];
  console.log("this isthe pathname of the firs route", newPathname);
  console.log("thsi shte user",user)
  const data: TransBankDetails = {
    userId: user._id as string,
    bankDetailsId: newPathname,
  };
  const {
    data: transactionData,
    error,
    isLoading,
  } = useGetUserTransactions(data);
  if (isLoading) return <Loader />;
  if (error && !isLoading)
    return <div className="text-white">check your connection </div>;
  if (transactionData?.data.length === 0 && !isLoading && !error)
    return (
      <div className="text-white">
        <Transactions bankDetailsId={newPathname as string} user={user} />
        No transcaiotn yet in this bra ch bank
      </div>
    );
  if (transactionData?.data.length > 0 && !isLoading && !error)
    return (
      <div className="p-1">
        <Transactions bankDetailsId={newPathname as string} user={user} />
        <TransactionData
          fid={newPathname}
          transactionData={transactionData}
          error={error}
          isLoading={isLoading}
        />
       <div className="w-full flex justify-center">
       <Button
          size={"sm"}
          onClick={()=>{
            router.push("/transactions")
          }}
          className="text-white  mb-2 w-[90%] h-[50px] hover:bg-[#22c55e] text-[20px] mt-4 bg-gradient-to-t from-[#00D399] to-[#056817]  rounded-[5px]  "
        >
          Go back To Transaction
        </Button>
       </div>
      </div>
    );
}

export default TransactionSecond;