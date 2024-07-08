"use client";

import { SignUpHandler } from "@/actions/auth/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { errorRes, sucessRes } from "@/types/error.types";
import { SignUpValidation } from "@/types/user.types";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

function Page() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpValidation>();
  const [error, setError] = useState("");
  const router = useRouter();
  const [pass1show, setPass1Show] = useState(false);
  const [pass2show, setPass2Show] = useState(false);

  const loginFun = async (data: SignUpValidation) => {
    if (!data) {
      setError("No data found");
      return;
    }
    if (data.password !== data.confirmPassword) {
      setError("Password did not match");
      return;
    }
    const res: any = await SignUpHandler(data);
    console.log("this is the response", res.error);
    if (res.error) {
      setError(res.error);
      return;
    } else {
      router.push("/sign-in");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-white">

      <div className=" w-[25rem] p-8 flex flex-col  gap-y-4 rounded-lg shadow-md md:p-14 lg:p-14">
        <h2 className="text-2xl font-bold mb-4 text-blue-600 text-[40px] ">
          Create an account
        </h2>

      {error && <span className="text-red-500 text-sm italic">{error}</span>}
        <div className="mb-4">
          <Input
            className="w-full p-3 border border-gray-300 rounded-md"
            type="text"
            placeholder="Name"
            {...register("name", {
              required: "Name is required",
            })}
          />
          {errors.name && (
            <span className="text-red-500 text-sm italic absolute mt-2 ml-1">
              {errors.name.message}
            </span>
          )}
        </div>
        <div className="mb-4">
          <Input
            className="w-full p-3 border border-gray-300 rounded-md"
            type="text"
            placeholder="Username"
            {...register("username", {
              required: "Username is required",
              pattern: {
                value: /^[a-z][a-z0-9]*$/,
                message:
                  "Username must start with a lowercase letter and contain only lowercase letters and numbers.",
              },
            })}
          />

          {errors.username && (
            <span className="text-red-500 text-sm italic absolute mt-2 ml-1">
              {errors.username.message}
            </span>
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
            <span className="text-red-500 text-sm italic absolute mt-2 ml-1">
              {errors.email.message}
            </span>
          )}
        </div>
        <div className="flex relative mb-4">
          <Input
            className="w-full p-3 border border-gray-300 rounded-md"
            type={pass1show ? "text" : "password"}
            placeholder="Password"
            {...register("password", {
              required: "Password is necessary",
              minLength: 8,
            })}
          />
          <span
            className="absolute right-3 top-3 cursor-pointer"
            onClick={() => setPass1Show(!pass1show)}
          >
            {pass1show ? <EyeOff /> : <Eye />}
          </span>
          {errors.password && (
            <span className="text-red-500 text-sm italic absolute -bottom-6 mt-2 ml-1">
              {errors.password.message}
            </span>
          )}
        </div>
        <div className="flex relative mb-4">
          <Input
            className="w-full p-3 border border-gray-300 rounded-md"
            type={pass2show ? "text" : "password"}
            placeholder="confirm password"
            {...register("confirmPassword", {
              required: "Password is necessary",
            })}
          />
          <span
            className="absolute right-3 top-3 cursor-pointer"
            onClick={() => setPass2Show(!pass2show)}
          >
            {pass2show ? <EyeOff /> : <Eye />}
          </span>
          {errors.confirmPassword && (
            <span className="text-red-500 text-sm italic absolute -bottom-6 mt-2 ml-1">
              {errors.confirmPassword.message}
            </span>
          )}
        </div>

        <Button
          className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleSubmit(loginFun)}
        >
          Login
        </Button>
        <div className="my-4 ">
          <span>
            Already have an account?{" "}
            <Link
              className="text-blue-600 underline hover:text-blue-700"
              href="sign-in"
            >
              login{" "}
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
}

export default Page;
