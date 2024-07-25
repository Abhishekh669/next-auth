"use client"
import { useGetTransactionData } from '@/utils/hooks/queryHooks/useGetTransaction'
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router'
import React from 'react'

function Page({ params }: { params: { id: string } }) {
  const { data: transaction, error, isLoading } = useGetTransactionData(params.id);
  const session = useSession();






  console.log("this is the data in specifice place", transaction?.data?._id)
  if (!isLoading && session?.data?.user._id === transaction?.data?.userId) return (
    <div className='text-white p-3'>
      <span className="text-[35px] font-bold bg-gradient-to-t from-[#00D399] to-[#056817] rounded-[5px] bg-clip-text text-transparent filter drop-shadow-[0_2px_2px_rgba(0,0,0,0.5)]">
        Transactions Details
      </span>
      <div className='border-2 border-green-600'>
       <div>
        <span>User Info</span>
       <div>
          <span>Name : </span>
          <span>{session && session.data && session.data.user && session.data.user.name ?
            session.data.user.name.charAt(0).toUpperCase() + session.data.user.name.slice(1)
            : ''}</span>
        </div>
        <div>
          <span>
            UserId : {transaction?.data.userId}
          </span>
        </div>
        <div>
          Email : {session?.data?.user?.email}
        </div>
       </div>
       
        <div>

        </div>
        <div>

        </div>

      </div>
    </div>
  )

}

export default Page
