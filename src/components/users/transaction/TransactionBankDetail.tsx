import { useRouter } from 'next/navigation'
import React from 'react'
import { useRendersCount } from 'react-use'

function TransactionBankDetail(data : any) {
    console.log("this is the data in the transaction bank details ",data.data.data)
    const router = useRouter()
  return (
    <div className='text-white flex flex-col gap-y-4 '>
      {data   &&  data.data.data.length > 0 && data.data.data.slice().reverse().map((account : any)=>(
        <div 
            className='text-white m-4 border-2 cursor-pointer p-4 border-green-600' 
            key={account._id}
            onClick={
                () =>{
                    router.push(`/transactions/${account._id}`)
                }
            }
        >
                <h1 className='text-white'>Transaciton of the {account.bank_name}</h1>
                <span>Bank Branch : {account.bank_branch}</span>
        </div>
      ))}
    </div>
  )
}

export default TransactionBankDetail
