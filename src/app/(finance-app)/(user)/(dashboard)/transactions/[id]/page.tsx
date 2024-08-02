import { auth } from '@/auth';
import TransactionSecond from '@/components/users/transaction/TransactionSecond'
import React from 'react'

async function page() {
  const session = await auth();
  return (
    <div>
      <TransactionSecond user={session?.user}/>
    </div>
  )
}

export default page
