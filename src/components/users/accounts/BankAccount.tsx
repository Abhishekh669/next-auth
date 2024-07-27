"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SheetClose, SheetFooter } from "@/components/ui/sheet";
import { useCreateBankDetails } from "@/utils/hooks/mutateHooks/accounts/useCreateBankDetails";
import React, { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";


interface BankDetail{
    bank_name : string,
    bank_branch : string
}
function BankAccount() {
  const [error, setError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<BankDetail>();
  const {mutate : server_bankDetails} = useCreateBankDetails();
  const createBank:SubmitHandler<FieldValues> =  async(data : FieldValues ) => {
    try {
        if(data){
            server_bankDetails(data);
            

        }
        
        
    } catch (error) {
        console.log("failed to create the back account")
        
    }

  };
  return (
    <>
      <form onSubmit={handleSubmit(createBank)} className="">
        <div className="flex flex-col gap-y-6">
          <div className="mb-4 relative flex flex-col gap-y-2  ">
            {error && <div className="text-red-600 text-sm my-2">{error}</div>}
            <Label className="block uppercase tracking-wide text-green-600 text-[16px] font-bold mb-2">
              Bank Name :
            </Label>
            <Input
              placeholder="Bank Name"
              {...register("bank_name", {
                required: "plz enter the name of bank",
                maxLength: {
                  value: 20,
                  message: "maximum length is 15 characters",
                },
              })}
              className="w-full  p-3  border border-gray-300 rounded-[10px]"
            />

            <div className="absolute -bottom-7  left-2">
              {errors.bank_name && (
                <span className="text-red-500 text-sm">
                  {errors.bank_name.message as string}
                </span>
              )}
            </div>
          </div>

          <div className="mb-4 relative  flex flex-col gap-y-2">
            {error && <div className="text-red-600 text-sm my-2">{error}</div>}
            <Label className="block uppercase tracking-wide text-green-600 text-[16px] font-bold mb-2">
              Bank Branch :
            </Label>
            <Input
              placeholder="Bank Name"
              {...register("bank_branch", {
                required: "plz enter the branch of the bank ",
                maxLength: {
                  value: 15,
                  message: "maximum length is 15 characters",
                },
              })}
              className="w-full  p-3  border border-gray-300 rounded-[10px]"
            />

            <div className="absolute -bottom-7  left-2">
              {errors.bank_branch && (
                <span className="text-red-500 text-sm">
                  {errors.bank_branch.message as string}
                </span>
              )}
            </div>
          </div>

          <SheetFooter>
            <SheetClose asChild>
              <Button
                size={"sm"}
                type="submit"
                className="text-white  mb-2 w-full h-[50px] hover:bg-[#22c55e] text-[20px] mt-4 bg-gradient-to-t from-[#00D399] to-[#056817]  rounded-[5px]  "
              >
                Submit
              </Button>
            </SheetClose>
          </SheetFooter>
        </div>
      </form>
    </>
  );
}

export default BankAccount;
