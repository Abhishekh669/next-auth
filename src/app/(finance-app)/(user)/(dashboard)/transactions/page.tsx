import { auth } from '@/auth'
import TransactionFirst from '@/components/users/transaction/TransactionFirst'
import React from 'react'

async function page() {
  const session = await auth();
  return (
    <div>
      <TransactionFirst  user={session?.user}/>
    </div>
  )
}

export default page
