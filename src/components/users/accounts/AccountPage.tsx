"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCreateBankDetails } from "@/utils/hooks/mutateHooks/accounts/useCreateBankDetails";
import React, { useState, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { bankName } from "../../../../db"; // Assuming this contains bank details including head office

import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Plus } from "lucide-react";
import { useGetUserBankDetails } from "@/utils/hooks/queryHooks/accounts/useGetUserBankDetails";
import BankDetails from "./BankDetails";

interface BankDetail {
  bank_name: string;
  bank_branch: string;
  head_office: string;
}

function AccountPage({ user }: { user: any }) {
  const { data, isLoading, error } = useGetUserBankDetails(user._id as string);
  const [isSheetOpen, setIsSheetOpen] = useState(false); // State to control sheet visibility
  const [submitting, setSubmitting] = useState(false); // State to track form submission
  const { mutate: server_bankDetails } = useCreateBankDetails();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm<BankDetail>();

  const [formError, setFormError] = useState<string>("");

  const selectedBankName = watch("bank_name");

  useEffect(() => {
    const selectedBank = bankName.find(
      (bank) => bank.name === selectedBankName
    );
    if (selectedBank) {
      setValue("head_office", selectedBank.head_office);
    } else {
      setValue("head_office", "");
    }
  }, [selectedBankName, setValue]);

  const createBank: SubmitHandler<BankDetail> = async (data) => {
    try {
      if (submitting) return;
      setSubmitting(true);

      const newData = {
        userId: user._id,
        bank_name: data.bank_name,
        bank_branch: data.bank_branch.toLowerCase(),
        head_office: data.head_office,
      };

      await server_bankDetails(newData); // Ensure server_bankDetails is awaited
      reset();
      setFormError(""); // Clear any previous errors
      setSubmitting(false);
      setIsSheetOpen(false); // Close the sheet on successful submission
    } catch (error) {
      console.error("Failed to create bank account:", error);
      setFormError("Failed to create the bank account");
      setSubmitting(false);
      // Do not close the sheet on error
    }
  };

  return (
    <>
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <Card className="border-none drop-shadow-sm text-white">
          <CardHeader className="lg:items-center lg:justify-between gap-y-2 lg:flex-row">
            <CardTitle className="text-xl line-clamp-1">
              Account Details
            </CardTitle>
            <SheetTrigger asChild>
              <Button
                size={"sm"}
                className="w-full text-white bg-gradient-to-t from-[#00D399] to-[#056817] rounded-[10px] hover:bg-green-500"
                onClick={() => setIsSheetOpen(true)}
              >
                <Plus className="size-4 mr-2" />
                Add Bank
              </Button>
            </SheetTrigger>
          </CardHeader>
        </Card>

        <SheetContent className="bg-black border-l-2 border-l-green-600 text-white flex flex-col gap-y-8">
          <SheetHeader>
            <SheetTitle className="text-[24px]">
              <span className="text-[30px] font-bold bg-gradient-to-t from-[#00D399] to-[#056817] rounded-[5px] bg-clip-text text-transparent filter drop-shadow-[0_2px_2px_rgba(0,0,0,0.5)]">
                Add Bank Detail
              </span>
            </SheetTitle>
          </SheetHeader>
          <form onSubmit={handleSubmit(createBank)} className="">
            <div className="flex flex-col gap-y-6">
              {formError && (
                <div className="text-red-600 text-sm my-2">{formError}</div>
              )}
              <div className="mb-4 relative flex flex-col gap-y-2">
                <Label className="block uppercase tracking-wide text-green-600 text-[16px] font-bold mb-2">
                  Bank Name:
                </Label>
                <div className="relative flex">
                  <select
                    id="category"
                    className="w-full h-full p-2 rounded-[10px] bg-black border-[1px] border-white active:border-blue-600"
                    {...register("bank_name", { required: true })}
                  >
                    <option value="">Select a bank</option>
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
                    <span className="text-red-500 text-sm absolute -bottom-7 left-3">
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
                  {...register("head_office",{required  : true})}
                  className="w-full p-3 border border-gray-300 rounded-[10px]"
                  readOnly
                />
                  <div className="absolute -bottom-7 left-2">
                  {errors.head_office && (
                    <span className="text-red-500 text-sm">
                      please choose bank for head office
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
                <Button
                  size="sm"
                  type="submit"
                  className="text-white mb-2 w-full h-[50px] hover:bg-[#22c55e] text-[20px] mt-4 bg-gradient-to-t from-[#00D399] to-[#056817] rounded-[5px]"
                  disabled={submitting}
                >
                  {submitting ? "Submitting..." : "Submit"}
                </Button>
              </SheetFooter>
            </div>
          </form>
        </SheetContent>
      </Sheet>

      <BankDetails data={data} isLoading={isLoading} error={error} />
    </>
  );
}

export default AccountPage;
