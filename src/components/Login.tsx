"use client";
import { loginHandler } from "@/actions/auth/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SignInValidation } from "@/types/user.types";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

interface Props {
  email: string;
  password: string;
  errors: string;
}

function Page() {
  const [show, setShow] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Props>();
  const [error, setError] = useState("");

  const loginFun = async (data: SignInValidation) => {
    if (!data) {
      setError("No Data found");
      return;
    }
    try {
      const res = await loginHandler(data);
      console.log("this is the response in the frontend", res);
      if (!!res.error) {
        setError(res.error);
      } else {
        router.push("/dashboard");
      }
    } catch (error) {
      console.log("failed to login (client side)");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-[#f7f7f7]">
      {error && <span className="text-red-500 text-sm mb-4">{error}</span>}
      <div className="max-w-md p-12 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <form onSubmit={handleSubmit(loginFun)}>
          <div className="mb-4">
            <Input
              type="email"
              placeholder="Email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
              className="w-full p-3 border border-gray-300 rounded-md"
            />
            {errors.email && (
              <span className="text-red-500 text-sm">
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
            type="submit"
            className="w-full p-3 bg-[#3498db] text-white rounded-md"
          >
            Login
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Page;
