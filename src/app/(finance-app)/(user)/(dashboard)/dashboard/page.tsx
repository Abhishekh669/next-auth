import Dashboard from '@/components/users/Dashboard';
import Loader from '@/components/Loader';
import { useGetUserData } from '@/utils/hooks/queryHooks/users/useGetUserData';
import { useSession } from 'next-auth/react';
import React from 'react'
import { auth } from '@/auth';

 async  function UserDashboard() {
      const session=await auth()
      console.log("This is the session in teh dashboard",session)
    return (
    <div>
      <Dashboard user={session?.user}/>
    </div>
  )
}

export default UserDashboard
