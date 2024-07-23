"use server"

import { connectDB } from "@/lib/connectDB"
import { User } from "@/models/user/user.model";

connectDB();


export async function getUserData(id : string){
    try {
        const user = await User.findOne({_id : id}).select("-password");
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


export async function getAllUser(){
    try {
        const users = await User.find().select("-password");
        if(!users){
            return {
                error : "No users found"
            }
        }
        return {
            message : "Users fetched sucessfully.",
            data : JSON.stringify(users),
        }


    } catch (error) {
        return {
            error : "Failed to get all the users"
        }
        
    }
}