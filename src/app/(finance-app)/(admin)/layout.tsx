import React from "react";
import Adminheader from "./_components/AdminHeader";

type Props = {
  children: React.ReactNode;
};
function AdminLayout({ children }: Props) {
  return (
    <div>
      <Adminheader />
      {children}
    </div>
  );
}

export default AdminLayout;
