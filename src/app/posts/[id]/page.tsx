"use client";

import { MainLayout } from "@/components/layouts/MainLayout";
import { Typography, Tag, Space, Divider, Button } from "antd";
import {
  CalendarOutlined,
  EyeOutlined,
  BookOutlined,
  ShareAltOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
  ArrowRightOutlined,
  ArrowLeftOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import { ROUTE_PATH } from "@/constants/route-path.constant";
import { post } from "@/data/dummy.data";
import { Editor } from "@/components/shared/editor/Editor";
import { useTOC } from "@/hooks/useTOC";
import { TOC } from "@/components/shared/toc/TOC";

const { Text } = Typography;

const PostDetails = () => {
  const { tableOfContents, contentWithIds } = useTOC({ content: post.content });

  return (
    <MainLayout showNavbar={false}>
      <div className="container mx-auto flex gap-6">
        <aside className="w-10 sticky top-20 h-fit flex flex-col gap-2">
          <Button icon={<ArrowUpOutlined />} type="text" />
          <Button icon={<ArrowDownOutlined />} type="text" />
          <Button icon={<BookOutlined />} type="text" />
          <Button icon={<ShareAltOutlined />} type="text" />
        </aside>

        <section>
          <div className="mb-6">
            <div className="mb-2 text-2xl font-bold">{post.title}</div>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
              <Space size="middle" className="text-gray-500">
                <Space size="small">
                  <CalendarOutlined />
                  <Text>{post.publishedDate}</Text>
                </Space>
                <Space size="small">
                  <BookOutlined />
                  <Text>{post.readTime}</Text>
                </Space>
                <Space size="small">
                  <EyeOutlined />
                  <Text>{post.views}</Text>
                </Space>
              </Space>
            </div>

            <Space wrap size={1} className="mb-4">
              {post.tags.map((tag) => (
                <Tag key={tag} color="blue">
                  {tag}
                </Tag>
              ))}
            </Space>

            {post.series && (
              <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6 rounded-r">
                <Text strong className="text-blue-800">
                  Series: {post.series}
                </Text>
              </div>
            )}
          </div>

          <Divider />

          <div className="prose prose-lg max-w-none">
            <div dangerouslySetInnerHTML={{ __html: contentWithIds }} className="" />
          </div>

          <Divider className="my-8" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
            <Link
              href={ROUTE_PATH.POST_DETAILS.replace(":id", "1")}
              className="p-4 border border-gray-200 hover:border-gray-400 transition-all duration-300 rounded-lg"
            >
              <Text type="secondary" className="text-sm flex items-center gap-2">
                Bài viết trước
                <ArrowLeftOutlined />
              </Text>
              <div className="!mb-0 !mt-1">Giới thiệu về bảo mật web</div>
            </Link>

            <Link
              href={ROUTE_PATH.POST_DETAILS.replace(":id", "1")}
              className="cursor-pointer border border-gray-200 hover:border-gray-400 transition-all duration-300 p-4 rounded-lg"
            >
              <Text type="secondary" className="text-sm flex items-center gap-2">
                Bài viết tiếp theo
                <ArrowRightOutlined />
              </Text>
              <div className="!mb-0 !mt-1">Phát hiện các cuộc tấn công web (2)</div>
            </Link>
          </div>

          <Divider className="my-8" />

          <Editor />
        </section>

        <aside className="w-64 sticky top-20 h-fit">
          <TOC tableOfContents={tableOfContents} />
        </aside>
      </div>
    </MainLayout>
  );
};

export default PostDetails;
