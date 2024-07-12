import React from "react";
type Props = {
  children: React.ReactNode;
};
function AdminLayout({ children }: Props) {
  return <div>{children}</div>;
}

export default AdminLayout;
