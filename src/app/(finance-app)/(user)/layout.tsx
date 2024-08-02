import { auth } from "@/auth";
import Loader from "@/components/Loader";
import Header from "@/components/users/header";
import { useGetUserData } from "@/utils/hooks/queryHooks/users/useGetUserData";
import { useSession } from "next-auth/react";
type Props = {
  children: React.ReactNode,
  session : any
};

const DashboardLayout =  async({ children }: Props) => {
  const session = await auth();
  console.log("this is the sesion me",session)
  if(session && session.user) return (
    <div className="w-full min-h-screen h-full bg-[#191414]">
      <Header />
      {children}
    </div>
  );
};  
export default DashboardLayout;
