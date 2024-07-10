import React from "react";
import HeaderLogo from "./header-logo";
import Navigation from "./navigation";
import WelcomeMsg from "./welcomemsg"
import AuthServer from "./AuthServer";
import AuthButton from "./AuthButton";
function header() {
  
  return (
    <header className=" p-8 bg-gradient-to-t from-[#00D399] to-[#056817] ">
        <div className="w-full flex items-center relative">
          <HeaderLogo />
          <Navigation />
          <AuthServer />
        </div>
        
    </header>
  );
}

export default header;
