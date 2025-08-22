"use client";

import Link from "next/link";
import { Logo } from "@/components/shared/logo/Logo";
import { ROUTE_PATH } from "@/constants/route-path.constant";
import { Avatar, Button, Input, Select } from "antd";
import Image from "next/image";
import { ICONS } from "@/constants/assets.constant";
import { useAuth } from "@/contexts/AuthContext";

const { Search } = Input;

const languages = [
  {
    label: "EN",
    value: "en",
  },
  {
    label: "VI",
    value: "vi",
  },
];

export const MainHeader = () => {
  const { isAuthenticated } = useAuth();

  return (
    <header className="border-b border-gray-200 sticky top-0 left-0 right-0 z-50 bg-white h-16">
      <div className="flex items-center justify-between container mx-auto py-4">
        <section className="flex items-center gap-8">
          <Logo />
          <Link href={ROUTE_PATH.HOME}>Home</Link>
          <Link href={ROUTE_PATH.ABOUT}>About</Link>
          <Link href={ROUTE_PATH.CONTACT}>Contact</Link>
        </section>

        <section className="flex items-center gap-4">
          <Search placeholder="Search ..." />
          <Select options={languages} defaultValue={"vi"} className="w-28" />

          <Button
            type="text"
            shape="circle"
            icon={<Image src={ICONS.BELL} alt="bell" width={18} height={18} />}
          />

          {isAuthenticated ? (
            <Avatar
              size="default"
              alt=""
              src="https://images.unsplash.com/photo-1478098711619-5ab0b478d6e6?q=80&w=2370&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              className="flex-shrink-0"
            />
          ) : (
            <Button href={ROUTE_PATH.LOGIN}>Login</Button>
          )}
        </section>
      </div>
    </header>
  );
};
