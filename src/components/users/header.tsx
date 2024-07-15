import React from "react";
import HeaderLogo from "./header-logo";
import Navigation from "./navigation";
import WelcomeMsg from "../welcomemsg"
import AuthButton from "./AuthButton";
function header() {
  
  
  return (
   
    <header className=" h-[6rem]  flex flex-col  items-center bg-gradient-to-t from-[#00D399] to-[#056817]">
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
