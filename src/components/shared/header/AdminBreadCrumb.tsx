"use client";

import { ROUTE_PATH } from "@/constants/route-path.constant";
import { Breadcrumb } from "antd";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const AdminBreadCrumb = () => {
  const pathname = usePathname();

  const segments = pathname.split("/").filter(Boolean);

  const items: { title: React.ReactNode }[] = [
    { title: <Link href={ROUTE_PATH.ADMIN.DASHBOARD}>Dashboard</Link> },
  ];

  const isAdmin = segments[0] === "admin";

  if (isAdmin) {
    const second = segments[1];
    const third = segments[2];

    if (second === "posts") {
      items.push({ title: <Link href={ROUTE_PATH.ADMIN.POSTS}>Posts</Link> });
      if (third === "create") items.push({ title: "Create" });
    }

    if (second === "tags") {
      items.push({ title: <Link href={ROUTE_PATH.ADMIN.TAGS}>Tags</Link> });
      if (third === "create") items.push({ title: "Create" });
    }

    if (second === "users") {
      items.push({ title: <Link href={ROUTE_PATH.ADMIN.USERS}>Users</Link> });
    }
  }

  return (
    <div className="h-14 flex items-center p-6 border-b border-gray-200">
      <Breadcrumb items={items} />
    </div>
  );
};
