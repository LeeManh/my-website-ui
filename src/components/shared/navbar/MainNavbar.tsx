"use client";

import Link from "next/link";
import React from "react";
import { ROUTE_PATH } from "@/constants/route-path.constant";
import { usePathname } from "next/navigation";
import clsx from "clsx";

export const MainNavbar = () => {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  const activeClass =
    "text-blue-500 font-bold after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-blue-500";

  return (
    <nav className="border-b border-gray-200">
      <div className="container mx-auto h-16 flex items-center justify-center gap-8">
        <Link
          href={ROUTE_PATH.HOME}
          className={clsx("h-full relative flex items-center justify-center", {
            [activeClass]: isActive(ROUTE_PATH.HOME),
          })}
        >
          Posts
        </Link>
        <Link
          href={ROUTE_PATH.SERIES}
          className={clsx("h-full relative flex items-center justify-center", {
            [activeClass]: isActive(ROUTE_PATH.SERIES),
          })}
        >
          Series
        </Link>
      </div>
    </nav>
  );
};
