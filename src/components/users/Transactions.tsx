"use client";

import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { ArrowUpDown, LucideArrowDownUp, Plus } from "lucide-react";
import { Input } from "../ui/input";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { Label } from "@radix-ui/react-dropdown-menu";
import categories from "@/lib/data";
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

interface TransactionData {
  name: string;
  quantity: number;
  price: number;
  category: string;
}

function Transactions() {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [showAmount, setShowAmount] = useState(false);
  const [totalAmount, setTotalAmount] = useState(3000);
       const categories = [
         "Health",
         "Expenses",
         "Household",
         "Transportation",
         "Investment",
         "Others",
       ];
  const [error, setError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TransactionData>();

  const addTransaction: SubmitHandler<FieldValues> = (data) => {
    if (data) {
      const checkQuantity = isNumeric(data.quantity)
      const checkPrice = isNumeric(data.price)
      if(!checkPrice ||  !checkQuantity){
        setError("Enter the valid input in price or qunatity")
        return ;
      }
      console.log("i am both number")
      try {
        
      } catch (error) {
        console.log("Failed to create the transactions")
        
      }

    }
      
    reset();
  };

  return (
    <div>
      <Sheet>
        <SheetTrigger asChild className="p-4 md:p-6 flex flex-col gap-y-6">
          <div className="w-full  flex flex-col md:flex-row gap-y-4  md:justify-between   ">
            <span className="text-[40px] font-bold  text-[#374151]">
              Transactions
            </span>
            <Button
              size={"sm"}
              className="text-white bg-gradient-to-t from-[#00D399] to-[#056817]  rounded-[5px] hover:bg-green-500 "
              onClick={() => {
                reset();
              }}
            >
              <Plus className="size-4 mr-2 text-white" />
              Add New
            </Button>
          </div>
        </SheetTrigger>
        <SheetContent className="bg-white pt-12">
          <SheetHeader className="text-[25px] font-bold  text-[#374151">
            Add an Transactions
          </SheetHeader>

          <form onSubmit={handleSubmit(addTransaction)}>
            <SheetDescription className="p-4 md:p-6 flex   flex-col   gap-y-6">
              <div className="mb-4 relative  ">
          {error && <div className="text-red-600 text-sm my-2">{error}</div>}
                <Label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  Name :
                </Label>
                <Input
                  placeholder="Product name"
                  {...register("name", {
                    required: "plz enter the name of product",
                  })}
                  className="w-full  p-3  border border-gray-300 rounded-[10px]"
                />

                <div className="absolute -bottom-7  left-2">
                  {errors.name && (
                    <span className="text-red-500 text-sm">
                      {errors.name.message as string}
                    </span>
                  )}
                </div>
              </div>
              <div className="mb-4 relative ">
                <Label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  Quantity :
                </Label>
                <Input
                  placeholder="0"
                  {...register("quantity",{
                    required : "enter  the quantity"
                  })}
                  className="w-full p-3  border border-gray-300 rounded-[10px]"
                />

                {errors.quantity && (
                  <span className="text-red-500 text-sm absolute -bottom-7  left-2">
                    {errors.quantity.message as string}
                  </span>
                )}
              </div>

              <div className="mb-4 relative ">
                <Label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  Price :
                </Label>
                <Input
                  placeholder="0"
                  {...register("price", {
                    required: "input the price",
                  })}
                  className="w-full p-3  border border-gray-300 rounded-[10px]"
                />

                {errors.price && (
                  <span className="text-red-500 text-sm absolute -bottom-7  left-2">
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
                  <span className="text-red-500 text-sm absolute -bottom-7  left-3">
                    please select a category
                  </span>
                )}
              </div>
              <SheetFooter>
                <SheetClose asChild>
                  <div>
                    <Button
                      size={"sm"}
                      className="text-white  mb-2 w-full h-[50px] hover:bg-[#22c55e] text-[20px] mt-4 bg-gradient-to-t from-[#00D399] to-[#056817]  rounded-[5px]  "
                      onClick={handleSubmit(addTransaction)}
                    >
                      Submit
                    </Button>
                    {showAmount && (
                      <div className="text-[25px]  border-2  border-gray-400  p-4 rounded-[5px] flex font-semibold">
                        <div>
                          {" "}
                          Total Amount : $
                          <span className="text-[22px]"> {totalAmount}</span>
                        </div>
                      </div>
                    )}
                   
                  </div>
                </SheetClose>
              </SheetFooter>
            </SheetDescription>
          </form>
        </SheetContent>
      </Sheet>
    </div>
  );
}

export default Transactions;
