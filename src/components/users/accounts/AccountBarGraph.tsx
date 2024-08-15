"use client"
import { useGetUserTransactions } from '@/utils/hooks/queryHooks/transactions/useGetUserTransactions'
import { BarChart } from '@mantine/charts'
import React from 'react'
import { BankBalanceType } from './BankData'
import { DataType } from '../TransactionData'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

function AccountBarGraph({ newData, bankBalance }: { newData: { userId: string, bankDetailsId: string }, bankBalance: BankBalanceType[] }) {
    const { data: transData, isLoading, error } = useGetUserTransactions(newData);

    // Check if data is loading or if there's an error
    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading transactions.</div>;

    // Transform the transaction data
    const data = transData?.data.map((trans: DataType) => {
        const date = new Date(trans.createdAt);
        const formattedDate = date.toLocaleString('default', { month: 'short', day: 'numeric' });
        return {
            date: formattedDate,
            amount: trans.totalAmount,
        };
    }) || []; // Ensure data is an array even if transData is undefined

    console.log("this is the data", data);

 return (
       <div>
        {
            (transData && transData.data.length >=  3) ? (
                <div className='flex flex-col gap-y-12'>
                <div>
                  <p className='text-center text-white font-semibold text-[20px]'>Bar-Graph of Transactions : </p>
                </div>
                  <BarChart
                      h={300}
                      className='text-white'
                      data={data}
                      dataKey="date"
                      xAxisLabel="Date"
                      yAxisLabel="Amount($)"
                      series={[
                          { name: 'amount', color: 'blue.6' },
                      ]}
                  />
      
      
              </div>
            ):(
                <div className='flex flex-col  gap-y-5'>
                    At leat 4 transaction is needed
                   <Link href={`/transactions/${newData.bankDetailsId}`} className='text-white mb-2 w-full h-[50px] text-center p-3 hover:bg-[#22c55e] text-[20px] mt-4 bg-gradient-to-t from-[#00D399] to-[#056817] rounded-[5px'>Go To Transaction</Link>
                </div>

            )
        }
       </div>
    );
}

export default AccountBarGraph;
