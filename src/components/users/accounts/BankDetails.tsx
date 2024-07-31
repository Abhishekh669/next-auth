import Loader from '@/components/Loader'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { bankdetailtype } from '@/types/bankdetail.types'
import { useRouter } from 'next/navigation'
import React from 'react'

interface DataType{
    data : any,
    isLoading : boolean,
    error : any
}

function BankDetails({data, isLoading, error} : DataType) {
  const router = useRouter();
  if(isLoading)  return <Loader /> 
  if(!data?.data.length && !isLoading && !error) return <div className='text-white'>No account yet</div>
    console.log("this is the data in teh bankdetail apage",data.data)
  if(data?.data && !isLoading && !error) return (
    <div className='text-green-600 p-4 flex flex-col gap-y-4'>
        <div>
            Your Accounts : 
        </div>
       <div className='flex flex-col gap-y-4'>
       {
            data && data.data && data.data.slice().reverse().map((account : bankdetailtype) =>(
                <Card x-chunk="dashboard-01-chunk-0" className='p-2 cursor-pointer  flex flex-col gap-y-3'
                  onClick={
                    () =>{
                      router.push(`/accounts/${account._id}`)
                    }
                  }
                  key={account._id}
                >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-[20px] font-semibold">{account.bank_name}</CardTitle>
          </CardHeader>
          <CardContent>
            <div>
                <span className='font-semibold'>Branch</span> : {account.bank_branch}
            </div>
          </CardContent>
        </Card>
            ))

        }
       </div>
         
    </div>
  )
}

export default BankDetails
