"use client"
import Dashboard from '@/components/users/Dashboard';
import Loader from '@/components/Loader';
import { useGetUserData } from '@/utils/hooks/queryHooks/useGetUserData';
import { useSession } from 'next-auth/react';
import React from 'react'

  function UserDashboard() {
  const session = useSession();
  const { data, error, isLoading } = useGetUserData(
    session?.data?.user._id as string
  );
  if(isLoading) return <Loader />;
  return (
    <div>
      <Dashboard />
    </div>
  )
}

export default UserDashboard
