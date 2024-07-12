"use client"
import React from 'react'
import Header from "@/components/header"
import { useSession } from 'next-auth/react'
import { useGetUserData } from '@/utils/hooks/queryHooks/useGetUserData';
function Dashboard() {
  
  return (
    <div>
      this is the dashboard
    </div>
  )
}

export default Dashboard
