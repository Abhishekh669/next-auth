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