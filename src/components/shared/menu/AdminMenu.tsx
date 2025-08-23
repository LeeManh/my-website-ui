"use client";

import type { MenuProps } from "antd";
import { Menu } from "antd";
import { ArrowLeft, FileText, LayoutDashboard, List, Plus, Tag, User } from "lucide-react";
import Link from "next/link";
import { ROUTE_PATH } from "@/constants/route-path.constant";
import { Logo } from "../logo/Logo";
import { usePathname } from "next/navigation";
import { useMemo } from "react";

type MenuItem = Required<MenuProps>["items"][number];

const ADMIN_MENU_KEY = {
  DASHBOARD: "dashboard",
  POSTS: "posts",
  LIST_POSTS: "list-posts",
  CREATE_POST: "create-post",
  USERS: "users",
  LIST_USERS: "list-users",
  TAGS: "tags",
  LIST_TAGS: "list-tags",
  CREATE_TAG: "create-tag",
  HOME: "home",
} as const;

type AdminMenuKey = (typeof ADMIN_MENU_KEY)[keyof typeof ADMIN_MENU_KEY];

// Declarative mapping for selected item by exact pathname
const PATH_TO_SELECTED: Record<string, AdminMenuKey> = {
  [ROUTE_PATH.ADMIN.DASHBOARD]: ADMIN_MENU_KEY.DASHBOARD,
  [ROUTE_PATH.ADMIN.POSTS]: ADMIN_MENU_KEY.LIST_POSTS,
  [ROUTE_PATH.ADMIN.CREATE_POST]: ADMIN_MENU_KEY.CREATE_POST,
  [ROUTE_PATH.ADMIN.TAGS]: ADMIN_MENU_KEY.LIST_TAGS,
  [ROUTE_PATH.ADMIN.CREATE_TAG]: ADMIN_MENU_KEY.CREATE_TAG,
  [ROUTE_PATH.ADMIN.USERS]: ADMIN_MENU_KEY.LIST_USERS,
};

// Declarative mapping for which submenu to open by URL prefix
const PREFIX_TO_OPEN: Array<{ prefix: string; key: AdminMenuKey }> = [
  { prefix: ROUTE_PATH.ADMIN.POSTS, key: ADMIN_MENU_KEY.POSTS },
  { prefix: ROUTE_PATH.ADMIN.TAGS, key: ADMIN_MENU_KEY.TAGS },
  { prefix: ROUTE_PATH.ADMIN.USERS, key: ADMIN_MENU_KEY.USERS },
];

const items: MenuItem[] = [
  {
    key: ADMIN_MENU_KEY.DASHBOARD,
    label: <Link href={ROUTE_PATH.ADMIN.DASHBOARD}>Dashboard</Link>,
    icon: <LayoutDashboard className="w-4 h-4" />,
  },
  {
    key: ADMIN_MENU_KEY.POSTS,
    label: "Posts Management",
    icon: <FileText className="w-4 h-4" />,
    children: [
      {
        key: ADMIN_MENU_KEY.LIST_POSTS,
        label: <Link href={ROUTE_PATH.ADMIN.POSTS}>Posts List</Link>,
        icon: <List className="w-4 h-4" />,
      },
      {
        key: ADMIN_MENU_KEY.CREATE_POST,
        label: <Link href={ROUTE_PATH.ADMIN.CREATE_POST}>Create Post</Link>,
        icon: <Plus className="w-4 h-4" />,
      },
    ],
  },
  {
    key: ADMIN_MENU_KEY.USERS,
    label: "Users Management",
    icon: <User className="w-4 h-4" />,
    children: [
      {
        key: ADMIN_MENU_KEY.LIST_USERS,
        label: <Link href={ROUTE_PATH.ADMIN.USERS}>Users List</Link>,
        icon: <List className="w-4 h-4" />,
      },
    ],
  },
  {
    key: ADMIN_MENU_KEY.TAGS,
    label: "Tags Management",
    icon: <Tag className="w-4 h-4" />,
    children: [
      {
        key: ADMIN_MENU_KEY.LIST_TAGS,
        label: <Link href={ROUTE_PATH.ADMIN.TAGS}>Tags List</Link>,
        icon: <List className="w-4 h-4" />,
      },
      {
        key: ADMIN_MENU_KEY.CREATE_TAG,
        label: <Link href={ROUTE_PATH.ADMIN.CREATE_TAG}>Create Tag</Link>,
        icon: <Plus className="w-4 h-4" />,
      },
    ],
  },
  {
    type: "divider",
  },
  {
    key: ADMIN_MENU_KEY.HOME,
    label: <Link href={ROUTE_PATH.HOME}>Back to Home</Link>,
    icon: <ArrowLeft className="w-4 h-4" />,
    danger: true,
  },
];

export const AdminMenu = () => {
  const pathname = usePathname();

  const { selectedKeys, defaultOpenKeys } = useMemo(() => {
    const selected = PATH_TO_SELECTED[pathname] ?? ADMIN_MENU_KEY.DASHBOARD;

    const open = PREFIX_TO_OPEN.filter(({ prefix }) => pathname.startsWith(prefix)).map(
      ({ key }) => key
    );

    return { selectedKeys: [selected], defaultOpenKeys: open };
  }, [pathname]);

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
        selectedKeys={selectedKeys}
        defaultOpenKeys={defaultOpenKeys}
        mode="inline"
        items={items}
        className="!border-none h-full !w-[256px]"
      />
    </div>
  );
};
