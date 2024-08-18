"use client";

import React, { useState } from "react";
import { Button } from "../ui/button";
import { ArrowUpDown, MoveLeftIcon, Plus } from "lucide-react";
import { Input } from "../ui/input";
import { FieldValues, Form, SubmitHandler, useForm } from "react-hook-form";
import { Label } from "@radix-ui/react-dropdown-menu";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTrigger,
} from "../ui/sheet";
import { isNumeric } from "@/lib/Checker";
import { useCreateTransactions } from "@/utils/hooks/mutateHooks/transactions/useCreateTransactions";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import { useGetBankBalance } from "@/utils/hooks/queryHooks/accounts/useGetBankBalance";
import { useRouter } from "next/navigation";

export interface TransactionData {
  _id?: string;
  bankDetailsId?: string;
  userId?: string;
  createdAt?: string;
  name: string;
  quantity: number;
  price: number;
  category: string;
  totalPrice: number;
}

function Transactions({ bankDetailsId, user }: any) {
  const [totalAmount, setTotalAmount] = useState(0);
  const [error, setError] = useState("");
  const [isSheetOpen, setIsSheetOpen] = useState(false); // Manage sheet open state

  const categories = [
    "Health",
    "Expenses",
    "Household",
    "Transportation",
    "Investment",
    "Others",
  ];

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TransactionData>();
  const router = useRouter();
  const {
    data: bankBalance,
    error: bankBalanceError,
    isLoading,
  } = useGetBankBalance({
    userId: user?._id,
    bankDetailsId: bankDetailsId,
  });

  const { data, mutate: server_createTransactions } = useCreateTransactions();

  const addTransaction: SubmitHandler<FieldValues> = async (mineData) => {
    setError("");
    if (mineData) {
      const checkQuantity = isNumeric(mineData.quantity);
      const checkPrice = isNumeric(mineData.price);
      if (!checkPrice || !checkQuantity) {
        setError("Enter valid input for price or quantity");
        return;
      }

      const parsedPrice = parseFloat(mineData.price);
      const parsedQuantity = parseInt(mineData.quantity);
      const calculatedTotalAmount = parsedPrice * parsedQuantity;
      setTotalAmount(calculatedTotalAmount);

      try {
        const floatBankBalance = parseFloat(
          bankBalance?.data[0]?.bankBalance || "0"
        );

        if (floatBankBalance >= calculatedTotalAmount) {
          const newData = {
            ...mineData,
            userId: user?._id as string,
            bankDetailsId: bankDetailsId as string,
            createdAt: new Date().toISOString(),
            totalAmount: calculatedTotalAmount,
          };

          server_createTransactions(newData);
          setIsSheetOpen(false);
          reset();
          setError("");
          setTotalAmount(0);
        } else {
          setError("Insufficient bank balance");
        }
      } catch (error) {
        console.error("Failed to create the transaction", error);
        toast.error("Failed to create transaction");
      }
    }
  };

  return (
    <div className="p-2">
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen} >
      <div className="flex justify-between items-center">
              <span className="text-[40px] font-bold bg-gradient-to-t from-[#00D399] to-[#056817] rounded-[5px] bg-clip-text text-transparent filter drop-shadow-[0_2px_2px_rgba(0,0,0,0.5)]">
                Transactions
              </span>
              <span
                onClick={() => {
                  router.push("/transactions");
                }}
                className="text-white p-3 cursor-pointer rounded-full bg-red-600"
              >
                <MoveLeftIcon className="text-[20px]" />
              </span>
            </div>
        <SheetTrigger asChild className="p-4 md:p-6 flex flex-col gap-y-6">
          <div className="w-full flex flex-col md:flex-row gap-y-8 md:justify-between">
           
            <Button
              size={"sm"}
              className="text-white h-[50px] text-[20px] bg-gradient-to-t from-[#00D399] to-[#056817] rounded-[5px] hover:bg-green-500"
              onClick={() => reset()}
            >
              <Plus className="size-4 mr-2 text-[20px] text-white" />
              Add New
            </Button>
          </div>
        </SheetTrigger>
        <SheetContent className="bg-white pt-12">
          <SheetHeader className="text-[25px] font-bold text-[#374151]">
            Add a Transaction
          </SheetHeader>

          <form onSubmit={handleSubmit(addTransaction)}>
            <SheetDescription className="p-2 md:p-6 flex flex-col gap-y-6">
              <div className="mb-4 relative">
                {error && (
                  <div className="text-red-600 text-sm my-2">{error}</div>
                )}
                <Label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  Name:
                </Label>
                <Input
                  placeholder="Product name"
                  {...register("name", {
                    required: "Please enter the name of the product",
                    maxLength: {
                      value: 15,
                      message: "Maximum length is 15 characters",
                    },
                  })}
                  className="w-full p-3 border border-gray-300 rounded-[10px]"
                />

                <div className="absolute -bottom-7 left-2">
                  {errors.name && (
                    <span className="text-red-500 text-sm">
                      {errors.name.message as string}
                    </span>
                  )}
                </div>
              </div>
              <div className="mb-4 relative">
                <Label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  Quantity:
                </Label>
                <Input
                  placeholder="0"
                  {...register("quantity", {
                    required: "Enter the quantity",
                  })}
                  className="w-full p-3 border border-gray-300 rounded-[10px]"
                />

                {errors.quantity && (
                  <span className="text-red-500 text-sm absolute -bottom-7 left-2">
                    {errors.quantity.message as string}
                  </span>
                )}
              </div>

              <div className="mb-4 relative">
                <Label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  Price:
                </Label>
                <Input
                  placeholder="0"
                  {...register("price", {
                    required: "Input the price",
                  })}
                  className="w-full p-3 border border-gray-300 rounded-[10px]"
                />

                {errors.price && (
                  <span className="text-red-500 text-sm absolute -bottom-7 left-2">
                    {errors.price.message as string}
                  </span>
                )}
              </div>

              <div className="mb-6 relative">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  Category:
                </label>
                <div className="relative">
                  <select
                    id="category"
                    className="block outline-none appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:border-blue-500"
                    {...register("category", { required: true })}
                  >
                    <option value="">Select a category</option>
                    {categories.map((category) => (
                      <option
                        key={category}
                        value={category}
                        className="text-[14px]"
                      >
                        {category}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <ArrowUpDown />
                  </div>
                </div>
                {errors.category && (
                  <span className="text-red-500 text-sm absolute -bottom-7 left-3">
                    Please select a category
                  </span>
                )}
              </div>

              <div>
                <Button
                  size={"sm"}
                  type="submit"
                  className="text-white mb-2 w-full h-[50px] hover:bg-[#22c55e] text-[20px] mt-4 bg-gradient-to-t from-[#00D399] to-[#056817] rounded-[5px]"
                >
                  Submit
                </Button>
              </div>
            </SheetDescription>
          </form>
        </SheetContent>
      </Sheet>
    </div>
  );
}

export default Transactions;
