"use client";
import React from "react";
import TransactionDetail from "./TransactionDetail";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
function TransactionId({ transId }: { transId: string }) {
    const router = useRouter();
  return (
    <div className="p-2">
      <div className="p-3 mt-10 flex flex-col gap-y-8 border-2 border-red-600 ">
        <div>
          <span className="text-[35px] font-bold bg-gradient-to-t from-[#00D399] to-[#056817] rounded-[5px] bg-clip-text text-transparent filter drop-shadow-[0_2px_2px_rgba(0,0,0,0.5)]">
            Transactions Details
          </span>
        </div>
        <TransactionDetail transId={transId as string} />
      </div>
      <Button
        size={"sm"}
        className="text-white   w-full h-[50px] hover:bg-[#22c55e] text-[20px] mt-4 bg-gradient-to-t from-[#00D399] to-[#056817]  rounded-[5px]  "
        onClick={() =>{
            router.push("/transactions")
        }}
      >
        Go To Transactions
      </Button>
    </div>
  );
}
export default TransactionId;
