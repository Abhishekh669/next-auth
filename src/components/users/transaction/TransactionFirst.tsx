"use client"
import TransactionBankDetail from '@/components/users/transaction/TransactionBankDetail';
import { useGetUserBankDetails } from '@/utils/hooks/queryHooks/accounts/useGetUserBankDetails'
import { useGetTransBankDetails } from '@/utils/hooks/queryHooks/transactions/useGetTransBankDetails';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React from 'react'
function TransactionFirst({user} : {user : any}) {
  const router = useRouter();
  const {data : bankDetails, isLoading, error}  = useGetUserBankDetails(user._id as string);
  console.log("this is the data in teh test seciton",bankDetails?.data.data)
  if(isLoading) return <div className='text-white'>i am loading</div>
  if(error) return <div className='text-white'>connection error</div>
  if(bankDetails?.data.length === 0 && !isLoading && !error) return <div className=' cursor-pointer text-white border-2 border-green-600 p-4  rounded-[4px] m-2 font-semibold text-[20px] ' onClick={
  () =>{
    router.push("/accounts")
  }
  }> 
    <div>
    <span className="text-[40px] font-bold bg-gradient-to-t from-[#00D399] to-[#056817] rounded-[5px] bg-clip-text text-transparent filter drop-shadow-[0_2px_2px_rgba(0,0,0,0.5)]">
              Transactions
            </span> </div>
  create an account
   </div>
  if(bankDetails?.data.length > 0 && !isLoading) return <div className='text-white p-4'>
    <div>
    <span className="text-[40px] font-bold bg-gradient-to-t from-[#00D399] to-[#056817] rounded-[5px] bg-clip-text text-transparent filter drop-shadow-[0_2px_2px_rgba(0,0,0,0.5)]">
              Transactions
            </span>
    </div>
      <TransactionBankDetail data={bankDetails} />
    </div>

   
}

export default TransactionFirst
