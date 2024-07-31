"use client"
import TransactionId from "@/components/users/TransactionId";
import { usePathname } from "next/navigation";
import React from "react";

function Page() {
  const pathname=usePathname();
  console.log("this ishte chekcing",pathname.split("/"))
  const prevPathname=pathname.split("/")[2];
  const newPathname=pathname.split("/")[3];
  console.log("this is the newpath in the second route ",newPathname)
  console.log("this is the newpath in the prev  route ",prevPathname)
  return (
    <>
      <TransactionId transId={newPathname} prevId={prevPathname}/>
    </>
  );
}

export default Page;
