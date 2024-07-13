"use client"
import { useGetAllUsers } from '@/utils/hooks/queryHooks/useGetAllUsers'
import React from 'react'

function Admin_Home_Page() {
  const {data, error , isLoading} = useGetAllUsers();
  console.log("this is data",data);
  return (
    <div>
      this is the admin home page
    </div>
  )
}

export default Admin_Home_Page
