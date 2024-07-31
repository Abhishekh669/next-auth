"use client"
import { Button } from '@/components/ui/button'
import TransactionData from '@/components/users/TransactionData'
import Transactions from '@/components/users/Transactions'
import { usePathname, useRouter } from 'next/navigation'
import path from 'path'
import React from 'react'

function Page() {
  const pathname= usePathname();
  const router = useRouter();
  const newPathname= pathname.split("/")[2];
  console.log("this isthe pathname of the firs route",newPathname)
  const id = ""
  return (
    <div className=''>
        <Transactions bankDetailsId={newPathname as string}/>
        <TransactionData  fid={newPathname as string}/>
        <Button 
        className='text-white'
        onClick= {
            () =>{
              router.push("/transactions")
            }
        }>
            go to transaction
        </Button>
    </div>
  )
}

export default Page 