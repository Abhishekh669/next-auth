import React from "react";
import WelcomeMsg from "@/components/welcomemsg"
import HeaderLogo from "@/components/header-logo"

import AdminNavigation from "./AdminNavigation";
function Adminheader() {
  const auth = false;
  if(auth){
    return (
      <header className=" h-[6rem]  flex flex-col  items-center bg-gradient-to-t from-[#00D399] to-[#056817]">
        <div className="w-full h-full p-2 flex   items-center">
          <HeaderLogo />
          {/* <Navigation /> */}
          <AdminNavigation />
        </div>
        <WelcomeMsg />
      </header>
    );
  }
}

export default Adminheader;
