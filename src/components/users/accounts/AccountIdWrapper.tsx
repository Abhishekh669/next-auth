"use client"
import React from 'react'
import BankInfo from './BankInfo'
import BankData from './BankData'
import { useGetBankBalance } from '@/utils/hooks/queryHooks/accounts/useGetBankBalance'
import Loader from '@/components/Loader'
import AccountForm from './AccountForm'

function AccountIdWrapper({session, bankDetailsId} : {session : any, bankDetailsId : string}) {
  console.log("this is me okie guys i am just chekcin ")
  const newData = {userId : session?._id, bankDetailsId : bankDetailsId}
  const {data : bankBalance, error, isLoading} = useGetBankBalance(newData)
  console.log("this is the data of bankbalance", bankBalance?.data.length)
  if(isLoading) return <Loader />
  if(error) return <div className='text-white'>no interconnection</div>
  return (<>
    {
      (!isLoading && bankBalance  && bankBalance.data.length > 0) ?  (
        <div>
          <BankData bankBalance={bankBalance?.data}  session={session}/>
        </div>
      ) : (
        <div>
          <AccountForm  session={session} bankDetailsId={bankDetailsId}/>
        </div>
      )
    }
    </>
  )
}

export default AccountIdWrapper
