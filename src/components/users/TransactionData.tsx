"use client"
import { useGetTransactions } from '@/utils/hooks/queryHooks/useGetTransactions';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu';
import { Delete, Edit, Ellipsis, Trash } from 'lucide-react';
import { StringSchemaDefinition } from 'mongoose';
import React from 'react';
import { DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from '../ui/dropdown-menu';
import { useDeleteTransaction } from '@/utils/hooks/mutateHooks/useDeleteTransation';

interface DataType {
    _id: string
    name: string
    createdAt: string,
    quantity: number,
    price: number,
    totalAmount: number,
    category: string,

}
function TransactionData() {
    const { data: transactionData, error, isLoading } = useGetTransactions();
    console.log("this is the data", transactionData);
    console.log('this isthe isloading', isLoading);

    const renderDate = (isoString: string) => {
        const dateObj = new Date(isoString);
        const datePart = dateObj.toISOString().split('T')[0];
        const timePart = dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
        return { datePart, timePart };
    };
    const {mutate : server_deleteTransaction} = useDeleteTransaction()

    return (
        <div>
            <div className='flex flex-col   border-2 border-blue-600'>
                {transactionData && transactionData?.data.length > 0 && transactionData.data.slice().reverse().map((transaction: DataType) => (
                    <div key={transaction._id} className=''>
                        <div className='bg-[#d1d5db] p-2 flex justify-between gap-x-2 '>
                            <div className='flex gap-x-2'>
                                <div>
                                    {renderDate(transaction.createdAt).datePart}
                                </div>
                                <div>
                                    {renderDate(transaction.createdAt).timePart}
                                </div>
                            </div>
                            <div>
                                <DropdownMenu>
                                    <DropdownMenuTrigger>
                                        <Ellipsis />
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className='bg-gradient-to-t from-[#00D399] to-[#056817]  opcaity-0.6 size-[10rem] text-white rounded-[10px]'>
                                        <DropdownMenuLabel className='text-[20px]'>Options</DropdownMenuLabel>
                                        <DropdownMenuSeparator className='bg-white m-1' />
                                        <DropdownMenuItem className='flex gap-x-4  hover:text-black'>
                                            <Edit  />
                                            <span className='text-[20px]'>Edit</span>
                                        </DropdownMenuItem>
                                        <DropdownMenuSeparator className='bg-white m-1' />
                                        <DropdownMenuItem >
                                           <div className='flex gap-x-4  hover:text-black' onClick={()=> server_deleteTransaction({transactionId : transaction._id})}>
                                           <Trash className='text-red-600' />
                                           <span className='text-[20px] '>Delete</span>
                                           </div>
                                        </DropdownMenuItem>

                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>

                        </div>
                        <div className='flex justify-between p-3'>
                            <span className=''> {transaction.name}</span>
                            <span className=''> {transaction.category}</span>

                            <span className='hidden md:inline-block'>{transaction.quantity}</span>
                            <span className='hidden md:inline-block'>{transaction.price}</span>
                            <span className=''>{transaction.totalAmount}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default TransactionData;
