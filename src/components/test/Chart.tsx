import React from 'react'
import { Button } from '../ui/button'
import { sendMail } from '@/lib/mail'
import { send } from 'process'

function Chart() {
    const send = async() => {
        "use server"
        await sendMail({
            to : "nepaliabhishekh669@gmail.com",
            name : "abhi",
            subject : "testing ",
            body : `<h1>hello world</h1>`
        })
    }
    
  return (
    <form>
      <Button
      className='text-white'
      formAction={send}
      >
            click me
      </Button>
    </form>
  )
}

export default Chart
