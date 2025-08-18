import Link from "next/link";
import { Logo } from "@/components/shared/logo/Logo";
import { ROUTE_PATH } from "@/constants/route-path.constant";
import Image from "next/image";
import { ICONS } from "@/constants/assets.constant";
import { Button } from "antd";

export const Footer = () => {
  return (
    <footer className="border-t border-gray-200 bg-gray-50 mt-10">
      <div className="container mx-auto py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Logo />
            <p className="mt-4 text-gray-500 text-sm">Summoned by a bug</p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href={ROUTE_PATH.HOME}>Home</Link>
              </li>
              <li>
                <Link href={ROUTE_PATH.ABOUT}>About</Link>
              </li>
              <li>
                <Link href={ROUTE_PATH.CONTACT}>Contact</Link>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="font-semibold mb-4">Connect</h3>
            {/* Social icons */}
            <ul className="flex gap-2">
              <li>
                <Button
                  type="text"
                  shape="circle"
                  icon={<Image src={ICONS.EMAIL} alt="github" width={16} height={16} />}
                />
              </li>
              <li>
                <Button
                  type="text"
                  shape="circle"
                  icon={<Image src={ICONS.GITHUB} alt="github" width={16} height={16} />}
                />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};
