// "use client";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { SheetClose, SheetFooter } from "@/components/ui/sheet";
// import { useCreateBankDetails } from "@/utils/hooks/mutateHooks/accounts/useCreateBankDetails";
// import React, { useState, useEffect } from "react";
// import { SubmitHandler, useForm } from "react-hook-form";
// import { bankName } from "../../../../db"; // Assuming this contains bank details including head office

// interface BankDetail {
//   bank_name: string;
//   bank_branch: string;
//   head_office: string;
// }

// function BankAccount({ userId }: { userId: string }) {
//   const [submitting, setSubmitting] = useState(false); // State to track form submission
//   const { mutate: server_bankDetails } = useCreateBankDetails();
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     reset,
//     watch,
//     setValue,
//   } = useForm<BankDetail>();
  
//   const [formError, setFormError] = useState<string>("");

//   const selectedBankName = watch("bank_name");

//   useEffect(() => {
//     const selectedBank = bankName.find((bank) => bank.name === selectedBankName);
//     if (selectedBank) {
//       setValue("head_office", selectedBank.head_office);
//     } else {
//       setValue("head_office", "");
//     }
//   }, [selectedBankName, setValue]);

//   const createBank: SubmitHandler<BankDetail> = async (data) => {
//     try {
//       if (submitting) return;
//       setSubmitting(true);

//       const newData = {
//         userId: userId,
//         bank_name: data.bank_name,
//         bank_branch: data.bank_branch.toLowerCase(),
//         head_office: data.head_office,
//       };

//       await server_bankDetails(newData);
//       reset();
//       setSubmitting(false);

//     } catch (error) {
//       console.error("Failed to create bank account:", error);
//       setFormError("Failed to create the bank account");
//       setSubmitting(false);
//     }
//   };

//   return (
   
//   );
// }

// export default BankAccount;
