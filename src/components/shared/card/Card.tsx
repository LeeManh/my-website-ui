import { ROUTE_PATH } from "@/constants/route-path.constant";
import { Tag } from "antd";
import Image from "next/image";
import Link from "next/link";

export const Card = () => {
  return (
    <Link
      href={ROUTE_PATH.POST_DETAILS.replace(":id", "1")}
      className="border border-gray-200 rounded-lg hover:border-gray-400 hover:shadow transition-all duration-300"
    >
      <div className="p-4 space-y-2">
        <div className="text-lg font-bold">
          Organize Everything in One Place – ClickUp Is Ready for You!
        </div>

        <div className="flex gap-2 flex-wrap">
          {Array.from({ length: 10 }).map((_, index) => (
            <Tag key={index} className="!m-0" color="blue">
              nodejs
            </Tag>
          ))}
        </div>

        <div className="text-xs text-gray-500">May 12, 2025 - 4 min read</div>

        <Image
          src="https://images.unsplash.com/photo-1750779940923-8d6cf0867df7?q=80&w=2371&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
          width={360}
          height={360}
          className="w-full h-40 object-cover rounded-lg"
        />
      </div>
    </Link>
  );
};
