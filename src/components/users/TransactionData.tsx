"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Loader from '../Loader';
import { Trash } from 'lucide-react';
import { useDeleteTransaction } from '@/utils/hooks/mutateHooks/transactions/useDeleteTransation';

export interface DataType {
  _id: string;
  name: string;
  createdAt: string;
  quantity: number;
  price: number;
  totalAmount: number;
  category: string;
  userId: string;
}

interface TransactionData {
  fid: string;
  transactionData: any;
  error: any;
  isLoading: boolean;
}

function formatDate(dateString: string) {
  const date = new Date(dateString);
  const options = { year: 'numeric', month: 'long', day: 'numeric' } as const;
  return date.toLocaleDateString(undefined, options);
}

function formatTime(dateString: string) {
  const date = new Date(dateString);
  const options = { hour: '2-digit', minute: '2-digit', second: '2-digit' } as const;
  return date.toLocaleTimeString(undefined, options);
}

function TransactionData({ fid, transactionData, error, isLoading }: TransactionData) {
  const router = useRouter();
  const { mutate: server_deleteTransaction } = useDeleteTransaction();

  if (isLoading) return <Loader />;
  if (error && !isLoading) return <div className='text-white'>Check your connection</div>;
  if (transactionData?.data.length === 0 && !isLoading && !error) return <div className='text-white'>No transaction yet in this branch bank</div>;

  return (
    <div className="bg-primary text-primary-foreground h-[90vh] overflow-y-auto">
      <div className="container mx-auto py-8 flex flex-col gap-y-8">
        {transactionData.data.slice().reverse().map((transaction: DataType) => (
          <div key={transaction._id} className='flex flex-col justify-between text-white w-full border-[1px] border-white'>
            <div className='flex border-[1px] p-3 border-green-600 justify-between text-lg font-semibold'>
              <div>
                {formatDate(transaction.createdAt)}
              </div>
              <div>
                {formatTime(transaction.createdAt)}
              </div>
              <div
                onClick={() => server_deleteTransaction({ transId: transaction._id })}
              >
                <Trash className='text-red-600 text-[18px]' />
              </div>
            </div>
            <div className='flex justify-between mt-2 p-4 cursor-pointer'
              onClick={() => router.push(`/transactions/${fid}/${transaction._id}`)}
            >
              <span>
                {(transaction.name).charAt(0).toUpperCase() + (transaction.name).slice(1)}
              </span>
              <span className='hidden md:inline-block'>
                ${transaction.price} (no. of items)
              </span>
              <span className='hidden md:inline-block'>
                {transaction.quantity} (per item)
              </span>
              <span>
                ${transaction.totalAmount} (total)
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return null; // Fallback if no conditions match
}

export default TransactionData;
