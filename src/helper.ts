"use server"

import exp from "constants";
import {auth, signIn as naSignIn, signOut as naSignOut} from "./auth";
export async function signIn(){
    await naSignIn();
}

export async function signOut() {
    await naSignOut();
    
}



export async function checkAuth(){
    const session = await auth()

    if(session?.user) return true
    else return false;
    

}



export  const formatingDate = (dateString: string) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Month is zero-based
    const day = String(date.getDate()).padStart(2, "0");
    console.log("this is the date ", `${day}/${month}/${year}`)
    return `${day}/${month}/${year}`// Format as YYYY-MM-DD
  };