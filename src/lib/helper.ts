"use server"
import { auth } from "@/auth";
export async function  getUserId(){
    const userId = auth();
    return userId;
}