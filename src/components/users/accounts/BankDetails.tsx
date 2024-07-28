import { bankdetailtype } from '@/types/bankdetail.types'
import React from 'react'

interface DataType{
    data : any,
    isLoading : boolean,
    error : any
}

function BankDetails({data, isLoading, error} : DataType) {
    console.log("this is the data in teh bankdetail apage",data)
  return (
    <div>
        <span className="text-white">hello world</span>
    </div>
  )
}

export default BankDetails
