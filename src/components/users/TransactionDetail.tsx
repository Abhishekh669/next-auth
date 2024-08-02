"use client"
import { useGetTransactionData } from "@/utils/hooks/queryHooks/transactions/useGetTransaction";
import { useSession } from "next-auth/react";
import React from "react";
import Loader from "../Loader";
interface TransactionDetailDataType{
  transaction : any,
  error : any,
  isLoading : boolean
}

function TransactionDetail({ transaction, error, isLoading }: TransactionDetailDataType) {
  const session = useSession();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Month is zero-based
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`; // Format as YYYY-MM-DD
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12;
    const formattedMinutes = String(minutes).padStart(2, "0");
    return `${formattedHours}:${formattedMinutes} ${ampm}`; // Format as 5:40 PM
  };
  console.log("this isthe trassaction specifif c id ",transaction)



  if (!isLoading && session?.data?.user._id === transaction?.data?.userId) {
    return (
      <div className="text-white text-[16px]">
        <div className="border-[1px] border-green-600">
          <div className="border-[1px] border-green-600 p-3 flex flex-col gap-y-2">
            <p className="text-center my-3 underline text-[28px] font-semibold text-red-600">User Info</p>
            <div>
              <span className="text-white font-semibold">UserId : <span className="text-green-200 bg-red-400 p-1 rounded-[5px] font-normal">{transaction?.data.userId}</span></span>
            </div>
            <div>
              <span className="font-semibold text-white">Name : </span>
              <span className="text-green-600">
                {session && session.data && session.data.user && session.data.user.name
                  ? session.data.user.name.charAt(0).toUpperCase() + session.data.user.name.slice(1)
                  : ""}
              </span>
            </div>
          
            <div className="text-white font-semibold">Email : <span className="text-green-600 font-normal">{session?.data?.user?.email}</span></div>
          </div>
          <div className="border-[1px] border-green-600 p-3 flex flex-col gap-y-2">
            <div className="my-3">
              <p className="text-center text-[28px] underline font-semibold text-red-600">Transaction Info</p>
            </div>
            <div>
              <span className="text-white font-semibold">Transaction Id : </span>
              <span className="text-green-200 bg-red-400 p-1 rounded-[5px]">{transaction?.data._id}</span>
            </div>
            <div>
              <span className="text-white font-semibold">Name : </span>
              <span className="text-green-600">{transaction?.data.name}</span>
            </div>
            <div>
              <span className="text-white font-semibold">Quantity : </span>
              <span className="text-green-600">{transaction?.data.quantity}</span>
            </div>
            <div>
              <span className="text-white font-semibold">Price : </span>
              <span className="text-green-600"> <span className="text-[20px] font-semibold">$</span>{transaction?.data.price} (per item)</span>
            </div>
            <div>
              <span className="text-white font-semibold">Transaction Amount : </span>
              <span className="text-green-600"> <span className="text-[20px] font-semibold">$</span>{transaction?.data.totalAmount}</span>
            </div>
            <div>
              <span className="text-white font-semibold">Transaction Date : </span>
              <span className="text-green-600">{formatDate(transaction?.data.createdAt)}</span>
            </div>
            <div>
              <span className="text-white font-semibold">Transaction Time : </span>
              <span className="text-green-600">{formatTime(transaction?.data.createdAt)}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null; // Handle loading state or when user does not have permission
}

export default TransactionDetail;
