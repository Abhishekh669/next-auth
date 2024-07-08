import { auth } from '@/auth'
import Dashboard from '@/components/Dashboard';
import React from 'react'

 async function page() {
  const session =  await auth();
  console.log("This is the session okie",session)
  return (
    <div>
      {/* this isthe dashbaord */}
      <Dashboard />
    </div>
  )
}

export default page
