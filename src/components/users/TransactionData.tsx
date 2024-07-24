"use client"
import { useGetTransactions } from '@/utils/hooks/queryHooks/useGetTransactions';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu';
import { Delete, Edit, Ellipsis, Trash } from 'lucide-react';
import { StringSchemaDefinition } from 'mongoose';
import React from 'react';
import { DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from '../ui/dropdown-menu';
import { useDeleteTransaction } from '@/utils/hooks/mutateHooks/useDeleteTransation';
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '../ui/table';

export interface DataType {
  _id: string
  name: string
  createdAt: string,
  quantity: number,
  price: number,
  totalAmount: number,
  category: string,


}

const invoices = [
  {
    invoice: "INV001",
    paymentStatus: "Paid",
    totalAmount: "$250.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV002",
    paymentStatus: "Pending",
    totalAmount: "$150.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV003",
    paymentStatus: "Unpaid",
    totalAmount: "$350.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV004",
    paymentStatus: "Paid",
    totalAmount: "$450.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV005",
    paymentStatus: "Paid",
    totalAmount: "$550.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV006",
    paymentStatus: "Pending",
    totalAmount: "$200.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV007",
    paymentStatus: "Unpaid",
    totalAmount: "$300.00",
    paymentMethod: "Credit Card",
  },
]
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
  const { mutate: server_deleteTransaction } = useDeleteTransaction()

  return (
    // <div>
    //     <div className='flex flex-col   border-2 border-blue-600'>
    //         <div className='p-3 flex justify-between bg-red-600'>
    //             <label className="">Name</label>
    //             <label className="hidden md:inline-block">Quantity</label>
    //             <label className="hidden md:inline-block">Price</label>
    //             <label className="">Category</label>
    //             <label className="">Total Amount</label>

    //         </div>
    //         {transactionData && transactionData?.data.length > 0 && transactionData.data.slice().reverse().map((transaction: DataType) => (
    //             <div key={transaction._id} className=''>
    //                 <div className='bg-[#d1d5db] p-2 flex justify-between gap-x-2 '>
    //                     <div className='flex gap-x-2'>
    //                         <div>
    //                             {renderDate(transaction.createdAt).datePart}
    //                         </div>
    //                         <div>
    //                             {renderDate(transaction.createdAt).timePart}
    //                         </div>
    //                     </div>
    //                     <div>
    //                         <DropdownMenu>
    //                             <DropdownMenuTrigger>
    //                                 <Ellipsis />
    //                             </DropdownMenuTrigger>
    //                             <DropdownMenuContent className='bg-gradient-to-t from-[#00D399] to-[#056817]  opcaity-0.6 size-[10rem] text-white rounded-[10px]'>
    //                                 <DropdownMenuLabel className='text-[20px]'>Options</DropdownMenuLabel>
    //                                 <DropdownMenuSeparator className='bg-white m-1' />
    //                                 <DropdownMenuItem className='flex gap-x-4  hover:text-black'>
    //                                     <Edit  />
    //                                     <span className='text-[20px]'>Edit</span>
    //                                 </DropdownMenuItem>
    //                                 <DropdownMenuSeparator className='bg-white m-1' />
    //                                 <DropdownMenuItem >
    //                                    <div className='flex gap-x-4  hover:text-black' onClick={()=> server_deleteTransaction({transactionId : transaction._id})}>
    //                                    <Trash className='text-red-600' />
    //                                    <span className='text-[20px] '>Delete</span>
    //                                    </div>
    //                                 </DropdownMenuItem>

    //                             </DropdownMenuContent>
    //                         </DropdownMenu>
    //                     </div>

    //                 </div>
    //                 <div className='flex justify-between p-3'>
    //                     <span className=''> {transaction.name}</span>

    //                     <span className='hidden md:inline-block'>{transaction.quantity}</span>
    //                     <span className='hidden md:inline-block'>{transaction.price}</span>
    //                     <span className=''> {transaction.category}</span>
    //                     <span className=''>{transaction.totalAmount}</span>
    //                 </div>
    //             </div>
    //         ))}
    //     </div>
    // </div>
    <div className="bg-primary text-primary-foreground">
    <div className="container mx-auto py-8">
    <Table>
<TableHeader>
  <TableRow className="bg-primary/90">
    <TableHead className="px-4 py-3 text-left font-medium">Name</TableHead>
    <TableHead className="hidden md:table-cell px-4 py-3  font-medium">Quantity</TableHead>
    <TableHead className="hidden md:table-cell px-4 py-3  font-medium">Price</TableHead>
    <TableHead className="px-4 py-3 text-left font-medium">Category</TableHead>
    <TableHead className="px-4 py-3 font-medium">Total Price</TableHead>
  </TableRow>
</TableHeader>
<TableBody>
  {transactionData && transactionData.data && transactionData.data.map((transaction :DataType )=> (
    <TableRow key={transaction._id}>
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
