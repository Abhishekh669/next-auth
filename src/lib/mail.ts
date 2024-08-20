"use server"
import nodemailer from "nodemailer"
export async function sendMail({to, name, subject, body
} : {to:string, name:string, subject:string , body: string}){

    const {SMTP_PASSWORD, SMTP_EMAIL} = process.env

    const transport = nodemailer.createTransport({

        service : "gmail",
         auth : {
            user : SMTP_EMAIL,
            pass : SMTP_PASSWORD
         }
    })

    try {
        const testResult = await transport.verify()
        console.log("this hste test result", testResult)

        
    } catch (error) {
        console.log("Error ocucured : ", error)
        
    }
    try {
        const sendRequest  = await transport.sendMail({
            from : SMTP_EMAIL,
            to , subject, html : body,
        })
        console.log("sendREsult : ", sendRequest)
    } catch (error) {
        console.log(error)
        
    }
}