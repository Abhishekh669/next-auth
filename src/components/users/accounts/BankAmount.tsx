"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SheetClose, SheetFooter } from "@/components/ui/sheet";
import { useCreateBankDetails } from "@/utils/hooks/mutateHooks/accounts/useCreateBankDetails";
import React, { useState, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { bankName } from "../../../../db"; // Assuming this contains bank details including head office

interface BankDetail {
  bank_name: string;
  bank_branch: string;
  head_office: string;
}

function BankAmount({ userId }: { userId: string }) {
  const [submitting, setSubmitting] = useState(false); // State to track form submission

  const { data: bankDetails, mutate: server_bankDetails } = useCreateBankDetails();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue, // Function to programmatically set values
  } = useForm<BankDetail>();

  const [formError, setFormError] = useState<string>("");

  // Watch the bank_name field to dynamically update the head_office field
  const selectedBankName = watch("bank_name");

  useEffect(() => {
    const selectedBank = bankName.find((bank) => bank.name === selectedBankName);
    if (selectedBank) {
      setValue("head_office", selectedBank.head_office);
    } else {
      setValue("head_office", ""); // Clear head office if no bank is selected
    }
  }, [selectedBankName, setValue]);

  const createBank: SubmitHandler<BankDetail> = async (data) => {
    try {
      // Prevent multiple submissions
      if (submitting) return;

      setSubmitting(true); // Set submitting state to true

      const newData = {
        userId: userId,
        bank_name: data.bank_name,
        bank_branch: data.bank_branch.toLowerCase(),
        head_office: data.head_office, // Include head_office in the submission data
      };

      console.log("this is the new data", newData);
      
      // Call mutation hook to create bank details
      await server_bankDetails(newData);
     
      console.log("this is the bank details response", bankDetails);

      // Reset form and state after successful submission
      reset();
      setSubmitting(false);

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
            <div className="relative flex">
              <select
                id="category"
                className="w-full h-full p-2 rounded-[10px] bg-black border-[1px] border-white active:border-blue-600"
                {...register("bank_name", { required: true })}
              >
                <option value="">Select a category</option>
                {bankName.map((bank) => (
                  <option
                    key={bank.name}
                    value={bank.name}
                    className="text-[14px]"
                  >
                    {bank.name}
                  </option>
                ))}
              </select>
              {errors.bank_name && (
                <span className="text-red-500 text-sm absolute -bottom-7  left-3">
                  Please select a bank name
                </span>
              )}
            </div>
          </div>
          <div className="mb-4 relative flex flex-col gap-y-2">
            <Label className="block uppercase tracking-wide text-green-600 text-[16px] font-bold mb-2">
              Head Office:
            </Label>
            <Input
              placeholder="Head Office"
              {...register("head_office")}
              className="w-full p-3 border border-gray-300 rounded-[10px]"
              readOnly // Make this input read-only as it is auto-updated
            />
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

export default BankAmount;
