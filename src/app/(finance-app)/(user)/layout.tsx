"use client";
import Loader from "@/components/Loader";
import Header from "@/components/users/header";
import { useGetUserData } from "@/utils/hooks/queryHooks/users/useGetUserData";
import { useSession } from "next-auth/react";
type Props = {
  children: React.ReactNode;
};

const DashboardLayout = ({ children }: Props) => {
  const session = useSession();
  const { isLoading } = useGetUserData(session?.data?.user._id as string);
  if (isLoading) return <Loader />;
  return (
    <div className="w-full min-h-screen h-full bg-[#191414]">
      <Header />
      {children}
    </div>
  );
};  
export default DashboardLayout;
