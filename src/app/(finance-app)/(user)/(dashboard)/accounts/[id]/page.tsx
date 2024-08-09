import AccountForm from '@/components/users/accounts/AccountForm'
import React from 'react'

function page({params} : {params : {id : string}}) {
  return (
    <div className='text-white'>
      <AccountForm  />
    </div>
  )
}

export default page
