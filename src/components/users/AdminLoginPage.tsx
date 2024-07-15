"use client"
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { Eye, EyeOff } from 'lucide-react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
type Props ={
  email : string,
  password : string
}
function AdminLoginPage() {
   const [show, setShow] = useState(false);
   const {
     register,
     handleSubmit,
     formState: { errors },
   } = useForm<Props>();
   const [error, setError] = useState("");
   const loginFun = (data : Props) =>{
    

   }
  return (
    <div className="h-screen flex items-center justify-center bg-[#f7f7f7]">
      <div className="max-w-md p-12 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-10 ">Login</h2>
        <div className="relative  flex flex-col gap-y-4">
          <div className="absolute -top-8 w-full  text-center">
            {error && (
              <span className=" text-red-500 text-sm mb-4">{error}</span>
            )}
          </div>
          <div className="mb-4">
            <Input
              className="w-full p-3 border border-gray-300 rounded-md"
              type="email"
              placeholder="Email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
            />
            {errors.email && (
              <span className="text-red-500 text-sm italic absolute mt-1 ml-1">
                {errors.email.message}
              </span>
            )}
          </div>
          <div className="mb-4 relative">
            <Input
              type={show ? "text" : "password"}
              placeholder="Password"
              {...register("password", {
                required: "Password is necessary",
              })}
              className="w-full p-3 border border-gray-300 rounded-md"
            />
            <span
              className="absolute right-3 top-3 cursor-pointer"
              onClick={() => setShow(!show)}
            >
              {show ? <EyeOff /> : <Eye />}
            </span>
            {errors.password && (
              <span className="text-red-500 text-sm">
                {errors.password.message}
              </span>
            )}
          </div>
          <Button
            onClick={handleSubmit(loginFun)}
            className="w-full p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-md"
          >
            Login
          </Button>
          
        </div>
      </div>
    </div>
  );
}

export default AdminLoginPage
