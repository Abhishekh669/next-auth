import { auth } from '@/auth';
import React from 'react'

async function welcomemsg() {
    const session = await auth();

  return (
    <div className=' text-2xl  text-white lg:text-4xl font-medium '>
        Welcome Back{session ? `, ${session.user.name}` : " "}
      
    </div>
  )
}

export default welcomemsg;
