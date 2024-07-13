"use client"
import { useGetUserData } from '@/utils/hooks/queryHooks/useGetUserData';
import { useSession } from 'next-auth/react'
import React from 'react'
import Loader from './Loader';

function Dashboard() {
 const session = useSession();
 const { data, error, isLoading } = useGetUserData(
   session?.data?.user._id as string
 );
 if (isLoading) return <Loader />;
  

  
  return (
    <div>
      this is the dashboard
    </div>
  )
}

export default Dashboard
