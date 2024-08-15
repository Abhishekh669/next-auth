"use client";

import { useGetBankInfo } from "@/utils/hooks/queryHooks/accounts/useGetBankInfo";
import { useGetUserBankDetails } from "@/utils/hooks/queryHooks/accounts/useGetUserBankDetails";
import React from "react";
import AccountBarGraph from "./AccountBarGraph";
import { Edit } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { Label } from "@/components/ui/label";

export interface BankBalanceType {
  _id: string;
  bankBalance: string;
  userId: string;
  bankDetailsId: string;
  bankAccount: string;
}

// Function to determine the greeting based on the current time
const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) {
    return "Good Morning";
  } else if (hour < 18) {
    return "Good Afternoon";
  } else {
    return "Good Evening";
  }
};

function BankData({
  bankBalance,
  session,
}: {
  bankBalance: BankBalanceType[];
  session: any;
}) {
  console.log("this is the bankBalance data okoie man ", bankBalance);
  const newData = {
    userId: session._id,
    bankDetailsId: bankBalance[0].bankDetailsId,
  };
  console.log("this is the new data", newData);
  const { data: bankInfo, isLoading, error } = useGetBankInfo(newData);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  console.log("this is the bank info ", bankInfo);

  const updateData = async (data: any) => {
    console.log("this is the data", data);
  };

  return (
    <div className="p-4 flex flex-col gap-y-16">
      <div>
        {bankBalance &&
          bankBalance.map((data: BankBalanceType) => (
            <div
              key={data._id}
              className="w-full text-white flex flex-col gap-y-4"
            >
              <div>
                {bankInfo && bankInfo.data && (
                  <div className="text-white w-full">
                    <p className="text-center text-[20px] font-semibold">
                      {bankInfo.data[0].bank_name}
                    </p>
                  </div>
                )}
              </div>
              <div className="border-[1px] px-4 py-4 border-green-600">
                <div className="w-full flex justify-between">
                  <span>
                    {getGreeting()},{" "}
                    {session.name.charAt(0).toUpperCase() +
                      session.name.slice(1)}
                  </span>
                  <span className="p-3">
                    <Dialog>
                      <DialogTrigger>
                        <Edit className="text-white text-[20px]" />
                      </DialogTrigger>
                      <DialogContent className="text-white bg-black">
                        <DialogTitle>Update the Account details</DialogTitle>
                        <div>
                          <form onSubmit={handleSubmit(updateData)}>
                            <div className="mb-4 flex flex-col gap-y-2">
                              <Label className="block uppercase tracking-wide text-green-600 text-[16px] font-bold mb-2">
                                Account No. :
                              </Label>
                              <Input
                                placeholder="account number"
                                {...register("bankAccount", {
                                  required: "Please enter your bank account number",
                                  maxLength: {
                                    value: 16,
                                    message: "Maximum length is 16",
                                  },
                                  minLength: {
                                    value: 12,
                                    message: "Minimum length is 12",
                                  },
                                })}
                                className="w-full p-3 border border-gray-300 rounded-[10px]"
                              />
                              {errors.bankAccount && (
                                <span className="text-red-500 text-sm">
                                  {errors.bankAccount.message as string}
                                </span>
                              )}
                            </div>

                            <div className="mb-4 flex flex-col gap-y-2">
                              <Label className="block uppercase tracking-wide text-green-600 text-[16px] font-bold mb-2">
                                Bank Balance :
                              </Label>
                              <Input
                                placeholder="$ Balance"
                                {...register("bankBalance", {
                                  required: "Please enter your bank balance",
                                })}
                                className="w-full p-3 border border-gray-300 rounded-[10px]"
                              />
                              {errors.bankBalance && (
                                <span className="text-red-500 text-sm">
                                  {errors.bankBalance.message as string}
                                </span>
                              )}
                            </div>
                            <DialogFooter>
                              <Button type="submit">Update</Button>
                            </DialogFooter>
                          </form>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </span>
                </div>
                <div>
                  <div className="flex flex-col">
                    <span>Saving Account</span>
                    <span>{data.bankAccount}</span>
                  </div>
                </div>
                <div>
                  <span>$ {data.bankBalance}</span>
                </div>
              </div>
            </div>
          ))}
      </div>
      <AccountBarGraph newData={newData} bankBalance={bankBalance} />
    </div>
  );
}

export default BankData;
