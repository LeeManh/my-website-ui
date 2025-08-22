import { ICONS } from "@/constants/assets.constant";
import { ROUTE_PATH } from "@/constants/route-path.constant";
import Image from "next/image";
import Link from "next/link";

export const Logo = () => {
  return (
    <Link href={ROUTE_PATH.HOME} className="inline-block">
      <Image alt="logo" src={ICONS.LOGO} width={36} height={36} />
    </Link>
  );
};
