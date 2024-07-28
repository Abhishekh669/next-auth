"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SheetClose, SheetFooter } from "@/components/ui/sheet";
import { useCreateBankDetails } from "@/utils/hooks/mutateHooks/accounts/useCreateBankDetails";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

interface BankDetail {
  bank_name: string;
  bank_branch: string;
}

function BankAccount({userId} : {userId : string}) {
  const [submitting, setSubmitting] = useState(false); // State to track form submission
  
  const { data : bankDetails, mutate: server_bankDetails } = useCreateBankDetails();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<BankDetail>();
  const [formError, setFormError] = useState<string>("");
  const createBank: SubmitHandler<BankDetail> = async (data) => {
    try {
      // Prevent multiple submissions
      if (submitting) return;
      
      setSubmitting(true); // Set submitting state to true

      // Convert bank_name and bank_branch to lowercase if needed
      const newData = {
        userId : userId,
        bank_name: data.bank_name.toLowerCase(),
        bank_branch: data.bank_branch.toLowerCase(),
      };

      console.log("this is the new data", newData);
      
      // Call mutation hook to create bank details
      const res = server_bankDetails(newData);
     
console.log("this isthe res",bankDetails)
      // Reset form and state after successful submission
      reset();
      setSubmitting(false);
      
      // Handle success or further actions based on `result` if needed

    } catch (error) {
      console.error("Failed to create bank account:", error);
      setFormError("Failed to create the bank account");
      setSubmitting(false); // Reset submitting state on error
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(createBank)} className="">
        <div className="flex flex-col gap-y-6">
          <div className="mb-4 relative flex flex-col gap-y-2">
            {formError && (
              <div className="text-red-600 text-sm my-2">{formError}</div>
            )}
            <Label className="block uppercase tracking-wide text-green-600 text-[16px] font-bold mb-2">
              Bank Name:
            </Label>
            <Input
              placeholder="Bank Name"
              {...register("bank_name", {
                required: "Please enter the name of the bank",
                maxLength: {
                  value: 20,
                  message: "Maximum length is 20 characters",
                },
              })}
              className="w-full p-3 border border-gray-300 rounded-[10px]"
            />
            <div className="absolute -bottom-7 left-2">
              {errors.bank_name && (
                <span className="text-red-500 text-sm">
                  {errors.bank_name.message}
                </span>
              )}
            </div>
          </div>

          <div className="mb-4 relative flex flex-col gap-y-2">
            <Label className="block uppercase tracking-wide text-green-600 text-[16px] font-bold mb-2">
              Bank Branch:
            </Label>
            <Input
              placeholder="Bank Branch"
              {...register("bank_branch", {
                required: "Please enter the branch of the bank",
                maxLength: {
                  value: 15,
                  message: "Maximum length is 15 characters",
                },
              })}
              className="w-full p-3 border border-gray-300 rounded-[10px]"
            />
            <div className="absolute -bottom-7 left-2">
              {errors.bank_branch && (
                <span className="text-red-500 text-sm">
                  {errors.bank_branch.message}
                </span>
              )}
            </div>
          </div>

          <SheetFooter>
            <SheetClose asChild>
              <Button
                size="sm"
                type="submit"
                className="text-white mb-2 w-full h-[50px] hover:bg-[#22c55e] text-[20px] mt-4 bg-gradient-to-t from-[#00D399] to-[#056817] rounded-[5px]"
                disabled={submitting}
              >
                {submitting ? "Submitting..." : "Submit"}
              </Button>
            </SheetClose>
          </SheetFooter>
        </div>
      </form>
    </>
  );
}

export default BankAccount;
