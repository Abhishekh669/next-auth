"use client"
import React from "react";
import HeaderLogo from "./header-logo";
import Navigation from "./navigation";
import WelcomeMsg from "../welcomemsg"
import AuthButton from "./AuthButton";
import { auth } from "@/auth";
import { useSession } from "next-auth/react";
 function header() {
  
  return (
   
    <header className=" hidden  h-[7rem]  md:flex md:flex-col  md:items-center bg-gradient-to-t from-[#00D399] to-[#056817]">
      <div className="w-full h-full p-2 flex   items-center">
          <HeaderLogo />
          <Navigation />
          <AuthButton />
      </div>
      <WelcomeMsg />
    </header>

  );
}

export default header;
