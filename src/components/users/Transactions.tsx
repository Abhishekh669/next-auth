"use client"

import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { ArrowUpDown, LucideArrowDownUp, Plus } from "lucide-react";
import { Input } from "../ui/input";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { Label } from "@radix-ui/react-dropdown-menu";
import categories from "@/lib/data";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTrigger } from "../ui/sheet";

interface TransactionData{
  name : string,
  quantity : number
  price : number,
  category : string,

}

function Transactions() {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [showAmount, setShowAmount] = useState(false);
  const [ totalAmount, setTotalAmount] = useState(3000);
  const [error, setError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TransactionData>({
    defaultValues : {
      name : "",
      quantity : 0,
      price : 0,
      category : ""
    }
  });
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000); // Update every second

    // Clean up interval on component unmount
    return () => clearInterval(interval);
  }, []);

  const currentYear = currentDateTime.getFullYear();
  const currentMonth = currentDateTime.getMonth() + 1; // Months are zero-indexed, so add 1
  const currentDay = currentDateTime.getDate();
  const currentHour = currentDateTime.getHours();
  const currentMinute = currentDateTime.getMinutes();
  const currentSecond = currentDateTime.getSeconds();
  const addTransaction: SubmitHandler<FieldValues> = (
    data
  ) => {
    if (data) {
      const newQuantity = parseInt(data.quantity)
      const newPrice = parseInt(data.price)

      
      if(!Number.isInteger(newQuantity)  ||  !Number.isInteger(newPrice)){
        console.log(typeof(newQuantity))
        console.log(typeof(newPrice))
        setError('Enter valid input in price or quantity')
        return;
      }

       

      console.log("this is the data", data);

      setShowAmount(true);
    }
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
            >
              <Plus className="size-4 mr-2 text-white" />
              add new
            </Button>
          </div>
        </SheetTrigger>
        <SheetContent className="bg-white pt-12">
          <SheetHeader className="text-[25px] font-bold  text-[#374151">
            Add an Transactions
          </SheetHeader>

          {
            error && (
              <div className="text-red-600 text-sm m-2">
                {error}
              </div>
            )
          }
          <SheetDescription className="p-4 md:p-6 flex   flex-col   gap-y-6">
            <div className="mb-4 relative  ">
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
                type="number"
                {...register("quantity")}
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
              type="number"
                placeholder="0"
                {...register("price", {
                  required: "fill these field",
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
                  {Object.keys(categories).map((category) => (
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
            <div>
              <Button
                size={"sm"}
                className="text-white  w-full h-[50px] hover:bg-[#22c55e] text-[20px] mt-4 bg-gradient-to-t from-[#00D399] to-[#056817]  rounded-[5px]  "
                onClick={handleSubmit(addTransaction)}
              >
                Submit
              </Button>
            </div>

            {showAmount && (
              <div className="text-[25px]  border-2  border-gray-400  py-6 px-2 rounded-[5px] mt-4 flex font-semibold">
                <div>
                  {" "}
                  Total Amount :
                  <span className="text-[25px]"> Rs {totalAmount}</span>
                </div>
              </div>
            )}
          </SheetDescription>
          
        </SheetContent>
      </Sheet>
    </div>
  );
}

export default Transactions;
