import Link from 'next/link'
import React from 'react'

function page() {
  return (
    <div>
      this isthe main page
      <Link href={'dashboard'} className='m-4 border-2 border-black rounded-md p-4'>dashboard</Link>
    </div>
  )
}

export default page
