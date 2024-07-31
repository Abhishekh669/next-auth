"use client"
import { useGetTransactions } from '@/utils/hooks/queryHooks/transactions/useGetTransactions';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger, Separator } from '@radix-ui/react-dropdown-menu';
import { Delete, Edit, Ellipsis, Trash } from 'lucide-react';
import { StringSchemaDefinition } from 'mongoose';
import React from 'react';
import { DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from '../ui/dropdown-menu';
import { useDeleteTransaction } from '@/utils/hooks/mutateHooks/transactions/useDeleteTransation';
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '../ui/table';
import { useRouter } from 'next/navigation';
import { useGetUserData } from '@/utils/hooks/queryHooks/users/useGetUserData';
import { useSession } from 'next-auth/react';
import { useGetUserTransactions } from '@/utils/hooks/queryHooks/transactions/useGetUserTransactions';
import Loader from '../Loader';

export interface DataType {
  _id: string
  name: string
  createdAt: string,
  quantity: number,
  price: number,
  totalAmount: number,
  category: string,
  userId : string


}

function TransactionData({fid } : {fid : string}) {
  const session = useSession();

  const { data: transactionData, error, isLoading } = useGetUserTransactions(session?.data?.user._id as string);
  console.log("this is the data okie man ", transactionData);
  console.log('this isthe isloading', isLoading);


  const router = useRouter();
  if(isLoading) return <Loader />
  if(error && !isLoading) return <div className='text-white'>check your connection </div>
  if(transactionData?.data.length === 0 && !isLoading && !error) return <div className='text-white'>No transcaiotn yet in this bra ch bank</div>
  
  if(transactionData?.data.length > 0 && !isLoading && !error) return (
    <div className="bg-primary text-primary-foreground ">
      <div className="container mx-auto py-8">
        <Table className='text-[#25D366]    '>
          <TableHeader>
            <TableRow className="bg-primary/90 border-whites" >
              <TableHead className="px-4 py-3 text-left font-semibold">Name</TableHead>
              <TableHead className="hidden md:table-cell px-4 py-3  font-semibold text-[15px]">Quantity</TableHead>
              <TableHead className="hidden md:table-cell px-4 py-3  font-semibold text-[15px]">Price</TableHead>
              <TableHead className="px-4 py-3 text-left font-semibold text-[15px]">Category</TableHead>
              <TableHead className="px-2 py-3 font-semibold text-[15px]">Total Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactionData && transactionData.data && transactionData.data.slice().reverse().map((transaction: DataType) => (
              <TableRow
                key={transaction._id} 
                className='active:bg-[#25D366] cursor-pointer active:text-white hover:bg-[#25D366] hover:text-white'
                onClick={()=>{
                      router.push(`/transactions/${fid}/${transaction._id}`)
                }}
              >
                <TableCell className="font-medium">{(transaction.name).charAt(0).toUpperCase() + (transaction.name).slice(1)}</TableCell>
                <TableCell className="hidden md:table-cell font-medium px-4 py-3 bg-red-600">{transaction.quantity}</TableCell>
                <TableCell className="hidden md:table-cell px-4 py-3 font-medium  bg-green-600">${transaction.price}</TableCell>
                <TableCell className="text-left">{transaction.category}</TableCell>
                <TableCell className="font-medium">${transaction.totalAmount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

      </div>
    </div>
  );
}

export default TransactionData;
