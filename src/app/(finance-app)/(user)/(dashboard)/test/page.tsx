"use client"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { DataType } from "@/components/users/TransactionData";
import { useGetTransactions } from "@/utils/hooks/queryHooks/useGetTransactions";

export default function Component() {
    const { data: transactionData, error, isLoading } = useGetTransactions();
    console.log("this is the data", transactionData);
    console.log('this isthe isloading', isLoading);
  
    const renderDate = (isoString: string) => {
      const dateObj = new Date(isoString);
      const datePart = dateObj.toISOString().split('T')[0];
      const timePart = dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
      return { datePart, timePart };
    }
  return (
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
        <TableCell className="font-medium">{transaction.name}</TableCell>
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
  )
}