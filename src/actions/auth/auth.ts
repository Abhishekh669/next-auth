"use server"

import { SignInValidation, SignUpValidation } from "@/types/user.types"
import { connectDB } from "@/lib/connectDB"
import { User } from "@/models/user/user.model";
import bcryptjs, { hash } from "bcryptjs"
import { signIn } from "@/auth";



connectDB();
export const loginHandler = async(data: SignInValidation) => {
    try {
        const res = await signIn("credentials",{
            email : data.email,
            password  : data.password,
            redirect : false
        })
        console.log("this is the response of the login in the backend",res)
        return res;
    } catch (error) {
        return {
            error : "Invalid Credentails"
        }
        
    }
    
}


export const SignUpHandler = async(data:SignUpValidation) => {
    try {
        //check wheather the user exist or not
        const exitUser = await User.findOne({
            $or : [
                {email : data.email}, {username : data.username}
            ]
        })
        if(exitUser){
            return {
                error : "User already exist"
            }
        }
        const hashedPassword = await hash(data.password, 10);
        const newData = {...data, password : hashedPassword}
        const user = await new User(newData);
        const savedUser = await user.save();
        if(!savedUser){
            return {
                error  : "Failed to save the user"
            }
        }
        return {
            message  :"User created sucessfully",
            
        }
    } catch (error) {
        return {
            error : "Failed to create the user"
        }
        
    }
}