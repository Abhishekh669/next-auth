"use client"
import { useGetUserTransactions } from '@/utils/hooks/queryHooks/transactions/useGetUserTransactions'
import { BarChart, PieChart } from '@mantine/charts'
import React from 'react'
import { BankBalanceType } from './BankData'
import { DataType } from '../TransactionData'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useGEtTranEachField } from '@/utils/hooks/queryHooks/transactions/useGetTraEachField'

type Item = {
    _id: string;
    userId: string;
    bankDetailsId: string;
    name: string;
    quantity: number;
    price: number;
    category: string;
    createdAt: string;
    totalAmount: number;
    __v: number;
  };
  
  type CategoryData = {
    [key: string]: Item[];
  };
  
  type ChartDataItem = {
    name: string;
    value: number;
    color: string;
  };

function AccountBarGraph({ newData, bankBalance }: { newData: { userId: string, bankDetailsId: string }, bankBalance: BankBalanceType[] }) {
    const { data: transData, isLoading, error } = useGetUserTransactions(newData);
    const {data : transactions, error : transError, isLoading : transIsLoading} = useGEtTranEachField(newData)
    console.log("this is the dat a in traaneachfiled", transactions)

    // Check if data is loading or if there's an error
    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading transactions.</div>;

    // Define categories
const categories = [
    "Health",
    "Expenses",
    "Household",
    "Transportation",
    "Investment",
    "Others",
  ];

  // Initialize the result object
const categorizedTransactions : CategoryData = categories.reduce((acc : any, category: any) => {
    acc[category] = [];
    return acc;
  }, {});
  
  // Categorize transactions
 transactions &&  transactions.data && transactions.data.forEach((transaction : any ) => {
    const category = transaction.category;
    if (categorizedTransactions[category]) {
      categorizedTransactions[category].push(transaction);
    } else {
      console.warn(`Category "${category}" not recognized`);
    }
  });


  const newTransactions : ChartDataItem[]= Object.entries(categorizedTransactions).map(([category, items]) => ({
    name: category,
    value : items.reduce((total : any, item : any) => total + item.totalAmount, 0),
    color: getColorForCategory(category) // Function to assign a color based on the category
  }));
  
  function getColorForCategory(category : string) : string {
    const colors: { [key: string]: string } = {
        Health: "green",
        Expenses: "blue",
        Household: "red",
        Transportation: "grey",
        Investment: "purple",
        Others: "orange"
      };
    return colors[category] || "black"; // Default color if category not found
  }

  console.log("this is the transaction of new", newTransactions)

  console.log("htis is hte categorized data ", JSON.stringify(categorizedTransactions))

    // Aggregate transaction data by date
    const aggregatedData = (transData?.data || []).reduce((acc : any, trans: DataType) => {
        const date = new Date(trans.createdAt);
        const formattedDate = date.toLocaleString('default', { month: 'short', day: 'numeric' });

        if (!acc[formattedDate]) {
            acc[formattedDate] = 0;
        }
        acc[formattedDate] += trans.totalAmount;

        return acc;
    }, {} as Record<string, number>);

    // Convert aggregated data into the format required by BarChart
    const chartData = Object.entries(aggregatedData).map(([date, amount]) => ({
        date,
        amount
    }));

    console.log("Aggregated data for chart:", chartData);

    return (
        <div>
            {chartData.length >= 2 ? (
                <div className='flex flex-col gap-y-12'>
                    <div>
                        <p className='text-center text-white font-semibold text-[20px]'>Bar-Graph of Transactions :</p>
                    </div>
                    <BarChart
                        h={300}
                        className='text-white'
                        data={chartData}
                        dataKey="date"
                        xAxisLabel="Date"
                        yAxisLabel="Amount($)"
                        series={[
                            { name: 'amount', color: 'blue.6' },
                        ]}
                    />
                </div>
            ) : (
                <div className='flex flex-col gap-y-5'>
                    At least 3 transactions are needed
                    <Link href={`/transactions/${newData.bankDetailsId}`} className='text-white mb-2 w-full h-[50px] text-center p-3 hover:bg-[#22c55e] text-[20px] mt-4 bg-gradient-to-t from-[#00D399] to-[#056817] rounded-[5px]'>
                        Go To Transaction
                    </Link>
                </div>
            )}
            <div>
            <PieChart data={newTransactions} withTooltip tooltipDataSource="segment" mx="auto" />
            </div>
        </div>
    );
}

export default AccountBarGraph;
