"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SheetClose, SheetFooter } from "@/components/ui/sheet";
import { isNumeric } from "@/lib/Checker";
import { useCreateBankBalance } from "@/utils/hooks/mutateHooks/accounts/useCreateBankBalance";
import { useGetUserBankDetails } from "@/utils/hooks/queryHooks/accounts/useGetUserBankDetails";
import { useGetTransBankDetails } from "@/utils/hooks/queryHooks/transactions/useGetTransBankDetails";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { AccountFormType } from "./AccountForm";

function BankInfo({
  session, bankDetailsId
} :{session : any, bankDetailsId : string} ) {



  console.log("this is hte session in her",session)

  const {
    register,
    handleSubmit,
    formState: { errors },
    
  } = useForm();

  const {data : bankBalance, mutate: server_bankBalance, } = useCreateBankBalance()

  const createBankBalance = async(data : any) =>{
        if(data){
          const checkAccountNumber = isNumeric(data.bankAccount)
          const checkAccountBalance = isNumeric(data.bankBalance)
          if(!checkAccountNumber || !checkAccountBalance) return 
          const newData = {
            userId : session?._id,
            bankDetailsId : bankDetailsId,
            ...data
          }
          console.log("this is the  new data formed data", newData)
          server_bankBalance(newData)
        }
  }

  return (
    <form onSubmit={handleSubmit(createBankBalance)}>
      <div className="text-white flex flex-col gap-y-4">
      <div className="mb-4 relative flex flex-col gap-y-2">
        <Label className="block uppercase tracking-wide text-green-600 text-[16px] font-bold mb-2">
          Account No. :
        </Label>
        <Input
          placeholder="account number"
          {...register("bankAccount", {
            required: "Please enter the your bank balance",
            maxLength : {
              value : 16,
              message : "max length 16"
            },
            minLength : {
              value : 12,
              message : " length 12 is required"
            }
          })}
          className="w-full p-3 border border-gray-300 rounded-[10px]"
        />
        <div className="absolute -bottom-7 left-2">
          {errors.bankAccount && (
            <span className="text-red-500 text-sm">
            {errors.bankAccount.message as string}
            </span>
          )}
        </div>
      </div>

      <div className="mb-4 relative flex flex-col gap-y-2">
        <Label className="block uppercase tracking-wide text-green-600 text-[16px] font-bold mb-2">
          Bank Balance :
        </Label>
        <Input
          placeholder=" $ Balance"
          {...register("bankBalance", {
            required: "Please enter the your bank balance",
          })}
          className="w-full p-3 border border-gray-300 rounded-[10px]"
        />
        <div className="absolute -bottom-7 left-2">
          {errors.bankBalance && (
            <span className="text-red-500 text-sm">
              {errors.bankBalance.message as string}
            </span>
          )}
        </div>
      </div>

              <Button
                size="sm"
                type='submit'
                className="text-white mb-2 w-full h-[50px] hover:bg-[#22c55e] text-[20px] mt-4 bg-gradient-to-t from-[#00D399] to-[#056817] rounded-[5px]"
              >
                submit
              </Button>
       
    </div>
    </form>
  );
}

export default BankInfo;
