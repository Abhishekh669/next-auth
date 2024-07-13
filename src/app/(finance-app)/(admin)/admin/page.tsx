import AdminLogin from '@/app/(auth)/(admin)/admin-login/page'
import React from 'react'

function page() {
    const auth  = false;
    if(!auth) return <div>you are not admin</div>
  return (
    <div>
      this is the page of the admin 
    </div>
  )
}

export default page
