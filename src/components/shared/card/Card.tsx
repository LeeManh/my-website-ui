import { ROUTE_PATH } from "@/constants/route-path.constant";
import { Post } from "@/types/post.type";
import { Tag } from "antd";
import Image from "next/image";
import Link from "next/link";
import { formatDisplayDate } from "@/utils/date";

interface CardProps {
  data: Post;
}

export const Card = (props: CardProps) => {
  const { data } = props;

  return (
    <Link
      href={ROUTE_PATH.POST_DETAILS.replace(":id", data.id.toString())}
      className="border border-gray-200 rounded-lg hover:border-gray-400 hover:shadow transition-all duration-300"
    >
      <div className="p-4 space-y-2 flex flex-col h-full">
        <div className="text-lg font-bold mb-0 line-clamp-2">{data.title}</div>
        <div className="text-sm text-gray-500 line-clamp-3">{data.description}</div>

        <div className="flex-1 flex flex-col justify-end gap-2">
          <div className="flex gap-2 flex-wrap">
            {data.tags.map((tag) => (
              <Tag key={tag.id} className="!m-0" color="blue">
                {tag.name}
              </Tag>
            ))}
          </div>
          <div className="text-xs text-gray-500">
            {formatDisplayDate(data.createdAt)} - 4 min read
          </div>

          <Image
            src={data.thumbnail}
            alt=""
            width={360}
            height={360}
            className="w-full h-40 object-cover rounded-lg"
          />
        </div>
      </div>
    </Link>
  );
};
