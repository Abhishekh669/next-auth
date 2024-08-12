"use client";
import React from "react";
import TransactionDetail from "./TransactionDetail";
import { Button } from "../ui/button";
import { usePathname, useRouter } from "next/navigation";
import { useGetTransactionData } from "@/utils/hooks/queryHooks/transactions/useGetTransaction";
import Loader from "../Loader";
interface NewDataType{
  transId : string,
  prevId : string
}
function TransactionId({session}:{session : any} ) {
    const router = useRouter();
    const pathname=usePathname();
  console.log("this ishte chekcing",pathname.split("/"))
  const transId=pathname.split("/")[3];
  const prevId=pathname.split("/")[2];
    const { data: transaction, error, isLoading } = useGetTransactionData(transId);
    console.log("this is the data in the transaction in the two id amn",transaction)
    console.log("this is the transId",transId)
    console.log("this is the prevId",prevId)
  if(isLoading) return <Loader />
  if(transaction && !isLoading) return (
    <div className="p-2">
      <div className="p-3 mt-10 flex flex-col gap-y-8 border-2 border-red-600 ">
        <div>
          <span className="text-[35px] font-bold bg-gradient-to-t from-[#00D399] to-[#056817] rounded-[5px] bg-clip-text text-transparent filter drop-shadow-[0_2px_2px_rgba(0,0,0,0.5)]">
            Transactions Details
          </span>
        </div>
        <TransactionDetail   transaction={transaction} error={error} isLoading={isLoading} session={session}/>
      </div>
      <Button
        size={"sm"}
        className="text-white   w-full h-[50px] hover:bg-[#22c55e] text-[20px] mt-4 bg-gradient-to-t from-[#00D399] to-[#056817]  rounded-[5px]  "
        onClick={() =>{
            router.push(`/transactions/${prevId}`)
        }}
      >
        Go To Transactions
      </Button>
    </div>
  );
}
export default TransactionId;
