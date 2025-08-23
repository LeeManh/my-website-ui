import { Button } from "antd";
import { Menu } from "lucide-react";
import React from "react";

export const AdminHeader = () => {
  return (
    <div className="border-b border-gray-200 h-14 flex items-center p-6 sticky top-0 bg-white z-10 right-0">
      <Button type="text" shape="circle">
        <Menu />
      </Button>
    </div>
  );
};
