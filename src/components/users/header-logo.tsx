import Link from 'next/link'
import React from 'react'

function headerLogo() {
  return (
   <Link href="/">
            <div className="hidden lg:flex items-center">
                Logo
                <p className='font-semibold  text-sxl ml-2.5'>Finance</p>
            </div>
   </Link>
  )
}

export default headerLogo
