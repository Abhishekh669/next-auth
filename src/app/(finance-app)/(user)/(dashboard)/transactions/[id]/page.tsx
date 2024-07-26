import TransactionId from "@/components/users/TransactionId";
import React from "react";

function page({ params }: { params: { id: string } }) {
  return (
    <>
      <TransactionId transId={params.id as string} />
    </>
  );
}

export default page;
