"use client";

import Link from "next/link";
import { Logo } from "@/components/shared/logo/Logo";
import { ROUTE_PATH } from "@/constants/route-path.constant";
import { Button, FloatButton, Input, Select } from "antd";
import Image from "next/image";
import { ICONS } from "@/constants/assets.constant";
import { useAuth } from "@/contexts/AuthContext";
import { ProfileAvatar } from "../avatar/ProfileAvatar";

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

          {isAuthenticated ? <ProfileAvatar /> : <Button href={ROUTE_PATH.LOGIN}>Login</Button>}
        </section>
      </div>

      <FloatButton.BackTop />
    </header>
  );
};
