import React from 'react'
import { auth } from '@/auth'
import AccountForm from '@/components/users/accounts/AccountForm'
import AccountIdWrapper from '@/components/users/accounts/AccountIdWrapper'

async function page({params} : {params : {id : string}}) {
  const session = await auth()
  return (
    <div className='text-white'>
      <AccountIdWrapper session={session?.user} bankDetailsId={params.id}  />
    </div>
  )
}

export default page
