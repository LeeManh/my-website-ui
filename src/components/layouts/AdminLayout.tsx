"use client";

import { AdminBreadCrumb } from "../shared/header/AdminBreadCrumb";
import { AdminHeader } from "../shared/header/AdminHeader";
import { AdminMenu } from "../shared/menu/AdminMenu";

export const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex">
      <AdminMenu />

      <div className="flex-1 flex flex-col">
        <AdminHeader />
        <AdminBreadCrumb />
        <div className="p-6 bg-gray-100 flex-1">{children}</div>
      </div>
    </div>
  );
};
