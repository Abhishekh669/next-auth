
import { auth } from "@/auth";
import AccountPage from "@/components/users/accounts/AccountPage";
import React from "react";

 async function page() {
  const session = await auth();
    return (
    <>
     <AccountPage  user={session?.user}/>
    </>
  );
}

export default page;
