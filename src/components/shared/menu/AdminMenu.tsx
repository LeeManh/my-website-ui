import type { MenuProps } from "antd";
import { Menu } from "antd";
import { ArrowLeft, FileText, LayoutDashboard, List, Plus, Tag, User } from "lucide-react";
import Link from "next/link";
import { ROUTE_PATH } from "@/constants/route-path.constant";
import { Logo } from "../logo/Logo";

type MenuItem = Required<MenuProps>["items"][number];

const items: MenuItem[] = [
  {
    key: "dashboard",
    label: <Link href={ROUTE_PATH.ADMIN.DASHBOARD}>Dashboard</Link>,
    icon: <LayoutDashboard className="w-4 h-4" />,
  },
  {
    key: "posts",
    label: "Posts Management",
    icon: <FileText className="w-4 h-4" />,
    children: [
      {
        key: "list-posts",
        label: <Link href={ROUTE_PATH.ADMIN.POSTS}>Posts List</Link>,
        icon: <List className="w-4 h-4" />,
      },
      {
        key: "create-post",
        label: <Link href={ROUTE_PATH.ADMIN.CREATE_POST}>Create Post</Link>,
        icon: <Plus className="w-4 h-4" />,
      },
    ],
  },
  {
    key: "users",
    label: "Users Management",
    icon: <User className="w-4 h-4" />,
    children: [
      {
        key: "list-users",
        label: <Link href={ROUTE_PATH.ADMIN.USERS}>Users List</Link>,
        icon: <List className="w-4 h-4" />,
      },
    ],
  },
  {
    key: "tags",
    label: "Tags Management",
    icon: <Tag className="w-4 h-4" />,
    children: [
      {
        key: "list-tags",
        label: <Link href={ROUTE_PATH.ADMIN.TAGS}>Tags List</Link>,
        icon: <List className="w-4 h-4" />,
      },
      {
        key: "create-tag",
        label: <Link href={ROUTE_PATH.ADMIN.CREATE_TAG}>Create Tag</Link>,
        icon: <Plus className="w-4 h-4" />,
      },
    ],
  },
  {
    type: "divider",
  },
  {
    key: "home",
    label: <Link href={ROUTE_PATH.HOME}>Back to Home</Link>,
    icon: <ArrowLeft className="w-4 h-4" />,
    danger: true,
  },
];

export const AdminMenu = () => {
  const onClick: MenuProps["onClick"] = (e) => {
    console.log("click ", e);
  };

  return (
    <div className="flex flex-col border-r border-gray-200 h-screen">
      <div className="h-14 p-6 border-b border-gray-200 flex items-center sticky top-0 bg-white z-10">
        <Logo />
      </div>

      <Menu
        onClick={onClick}
        defaultSelectedKeys={["dashboard"]}
        mode="inline"
        items={items}
        className="!border-none h-full !w-[256px]"
      />
    </div>
  );
};
