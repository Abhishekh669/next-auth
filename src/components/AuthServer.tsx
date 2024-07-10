import React from 'react'
import {SessionProvider, } from "next-auth/react";
import AuthButtonClient from "./AuthButton"
import { BASE_PATH, auth } from '@/auth';
async function AuthServer() {
    const session = await auth();
    // console.log("this iste session",session)
  return (
    <SessionProvider basePath={BASE_PATH} session={session} >
            <AuthButtonClient />
    </SessionProvider>
        
  )
}

export default AuthServer;
