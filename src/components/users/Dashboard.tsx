"use client"
import {
  Activity,
  BookCheck,
  CircleX,
  Users
} from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getSession, useSession } from "next-auth/react";
import { useState } from "react";
import { useGetUserData } from "@/utils/hooks/queryHooks/users/useGetUserData";
import Loader from "../Loader";

export default  function Dashboard({user}  : {user : any}) {

console.log("this is the session",user)
const {data, error, isLoading} = useGetUserData(user._id);
if(isLoading) return <Loader />
if(error) return <div className="text-white">no internet connection </div>
if(!isLoading && data?.data) return ( 
    <main className="flex flex-1 flex-col gap-4 text-white p-4 md:gap-8 md:p-8">
      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
        <Card x-chunk="dashboard-01-chunk-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Clients</CardTitle>
            <Users className="h-6 w-6 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">will put some logic</p>
          </CardContent>
        </Card>
        <Card x-chunk="dashboard-01-chunk-1">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Completed Assignments
            </CardTitle>
            <BookCheck className="h-6 w-6 text-green-600 text-semibold" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">100</div>
            <p className="text-xs text-muted-foreground">check for the date</p>
          </CardContent>
        </Card>
        <Card x-chunk="dashboard-01-chunk-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Left Assignments
            </CardTitle>
            <CircleX className="h-6 w-6 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">
              +19% from last month
            </p>
          </CardContent>
        </Card>
        <Card x-chunk="dashboard-01-chunk-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">+19 since last hour</p>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
