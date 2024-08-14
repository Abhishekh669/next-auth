import { auth } from "@/auth";
import Header from "@/components/users/header";
import MobileNavbar from "@/components/users/MobileNavbar";

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
      <MobileNavbar />
    </div>
  );
};  
export default DashboardLayout;
