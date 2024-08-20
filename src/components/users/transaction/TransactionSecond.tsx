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
import { useGetCheckBankBalance } from "@/utils/hooks/queryHooks/accounts/useGetCheckBankBalance";
import Link from "next/link";

function TransactionSecond({ user }: { user: any }) {
  const pathname = usePathname();
  const newPathname = pathname.split("/")[2];
  console.log("this isthe pathname of the firs route", newPathname);
  console.log("this shte user", user);

  const data: TransBankDetails = {
    userId: user._id as string,
    bankDetailsId: newPathname,
  };

  const { data: checkData, error: checkError, isLoading: checkIsLoading } = useGetCheckBankBalance(data);
  const {
    data: transactionData,
    error,
    isLoading,
  } = useGetUserTransactions(data);

  if (isLoading) return <Loader />;
  if (error && !isLoading) return <div className="text-white">Check your connection</div>;

  return (
    <div className="p-1 h-[90vh] overflow-y-auto">
      {!checkIsLoading && checkData && checkData.data.length > 0 && !checkError ? (
        <>
          <Transactions bankDetailsId={newPathname as string} user={user} />
          {transactionData?.data.length > 0 && !isLoading && !error ? (
            <div className="w-full">
              <TransactionData
                fid={newPathname}
                transactionData={transactionData}
                error={error}
                isLoading={isLoading}
              />
            </div>
          ) : (
            <div className="text-white">No data yet</div>
          )}
        </>
      ) : (
        <div className="p-4 text-white flex flex-col gap-y-8">
          <div>
            First, you should add your bank balance details for it
          </div>
          <div>
            <Link href={`/accounts/${newPathname}`} className="p-4 bg-green-600">
              Add the bank balance
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default TransactionSecond;
