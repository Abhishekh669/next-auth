"use client";
import Loader from "@/components/Loader";
import Header from "@/components/users/header";
import { useGetUserData } from "@/utils/hooks/queryHooks/useGetUserData";
import { useSession } from "next-auth/react";
type Props = {
  children: React.ReactNode;
};

const DashboardLayout = ({ children }: Props) => {
  const session = useSession();
  const { isLoading } = useGetUserData(session?.data?.user._id as string);
  if (isLoading) return <Loader />;
  return (
    <div>
      <Header />
      {children}
    </div>
  );
};
export default DashboardLayout;
