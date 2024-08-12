import { auth } from "@/auth";
import TransactionId from "@/components/users/TransactionId";
import { usePathname } from "next/navigation";
import React from "react";

async function Page() {
  const session = await auth()

  console.log("")
  
  return (
    <>
      <TransactionId session={session}/>
    </>
  );
}

export default Page;
