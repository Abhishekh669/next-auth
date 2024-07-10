"use server"

import { connectDB } from "@/lib/connectDB"
import { User } from "@/models/user.model";

connectDB();


export async function getUserData(id : string){
    try {
        const user = await User.findOne({_id : id});
        if(!user){
            return {
                error : "No user exists"
            }
        }
        return {
            message : "User found successfully",
            data : JSON.stringify(user)
        }

    } catch (error) {
        console.log("Failed to get the user data")
        return {
            error : "Failed to get the user data"
        }
        
    }
}