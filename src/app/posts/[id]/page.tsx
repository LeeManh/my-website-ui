"use client";

import { MainLayout } from "@/components/layouts/MainLayout";
import { Typography, Tag, Space, Divider, Button } from "antd";
import Link from "next/link";
import { ROUTE_PATH } from "@/constants/route-path.constant";
import { useTOC } from "@/hooks/useTOC";
import { TOC } from "@/components/shared/toc/TOC";
import { CommentForm } from "@/components/shared/comment/CommentForm";
import { CommentSection } from "@/components/shared/comment/CommentSection";
import { useMutation, useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/constants/query-keys.constant";
import { useParams } from "next/navigation";
import { createBookmark, createLike, getPostById } from "@/apis/post.api";
import { formatFullDisplayDate } from "@/utils/date";
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUp, Bookmark, Calendar, Share } from "lucide-react";
import { BookmarkTargetType, LikeTargetType, Reaction } from "@/constants/post.constant";
import { PostDetailsSkeleton } from "@/components/shared/posts/PostDetailsSkeleton";

const { Text } = Typography;

const PostDetails = () => {
  const { id } = useParams<{ id: string }>();

  const { data, isLoading, refetch } = useQuery({
    queryKey: [QUERY_KEYS.DETAIL_POST, id],
    queryFn: () => getPostById(id!),
    enabled: !!id,
  });
  const post = data?.data;
  const { tableOfContents, contentWithIds } = useTOC({ content: post?.content || "" });

  const createLikeMutation = useMutation({
    mutationFn: createLike,
    onSuccess(data, variables, context) {
      refetch();
    },
  });

  const createBookmarkMutation = useMutation({
    mutationFn: createBookmark,
    onSuccess(data, variables, context) {
      refetch();
    },
  });

  if (isLoading)
    return (
      <MainLayout showNavbar={false}>
        <PostDetailsSkeleton />
      </MainLayout>
    );

  if (!post) return <div>Post not found</div>;

  return (
    <MainLayout showNavbar={false}>
      <div className="container mx-auto flex gap-6">
        <aside className="w-16 sticky top-20 h-fit flex flex-col gap-3 p-2">
          {/* Like Button */}
          <div className="flex flex-col items-center">
            <Button
              onClick={() => {
                createLikeMutation.mutate({
                  targetId: post.id,
                  targetType: LikeTargetType.POST,
                });
              }}
              icon={<ArrowUp className="size-4" />}
              className="w-[32px] !flex !items-center !justify-center"
              type={post.reaction === Reaction.LIKE ? "primary" : "default"}
            />
            <span className="text-sm text-gray-600 mt-1 font-medium">{post.likeCount}</span>
          </div>

          {/* Dislike Button */}
          <div className="flex flex-col items-center">
            <Button
              icon={<ArrowDown className="size-4" />}
              className="w-[32px] !flex !items-center !justify-center"
              type={post.reaction === Reaction.DISLIKE ? "primary" : "default"}
              onClick={() => {
                createLikeMutation.mutate({
                  targetId: post.id,
                  targetType: LikeTargetType.POST,
                  isDislike: true,
                });
              }}
            />
            <span className="text-sm text-gray-600 mt-1 font-medium">{post.dislikeCount || 0}</span>
          </div>

          {/* Bookmark Button */}
          <div className="flex flex-col items-center">
            <Button
              icon={<Bookmark className="size-4" />}
              className="w-[32px] !flex !items-center !justify-center"
              type={post.bookmarkStatus === "bookmarked" ? "primary" : "default"}
              onClick={() => {
                createBookmarkMutation.mutate({
                  targetId: post.id,
                  targetType: BookmarkTargetType.POST,
                });
              }}
            />
            <span className="text-sm text-gray-600 mt-1 font-medium">
              {post.bookmarkCount || 0}
            </span>
          </div>

          {/* Share Button */}
          <div className="flex flex-col items-center">
            <Button
              icon={<Share className="size-4" />}
              type="default"
              className="w-[32px] !flex !items-center !justify-center"
            />
          </div>
        </aside>

        <section>
          <div className="mb-6">
            <div className="mb-2 text-2xl font-bold">{post.title}</div>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <div className="flex items-center gap-6 text-gray-600">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-full bg-gray-100">
                    <Calendar className="size-4 text-gray-600" />
                  </div>
                  <Text className="text-sm font-medium">
                    {formatFullDisplayDate(post.publishedAt || "")}
                  </Text>
                </div>
              </div>
            </div>

            <Space wrap size={1} className="mb-4">
              {post.tags.map((tag) => (
                <Tag key={tag.id} color="blue">
                  {tag.name}
                </Tag>
              ))}
            </Space>

            {/* {post.series && (
              <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6 rounded-r">
                <Text strong className="text-blue-800">
                  Series: {post.series}
                </Text>
              </div>
            )} */}
          </div>

          <Divider />

          <div className="prose prose-lg max-w-none tiptap">
            <div dangerouslySetInnerHTML={{ __html: contentWithIds }} className="" />
          </div>

          <Divider className="my-8" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            {/* Previous Post */}
            <Link
              href={ROUTE_PATH.POST_DETAILS.replace(":id", "1")}
              className="group p-6 border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all duration-300 rounded-xl bg-gradient-to-r from-gray-50 to-white hover:from-blue-50 hover:to-white"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-full bg-blue-100 group-hover:bg-blue-200 transition-colors duration-200">
                  <ArrowLeft className="size-4 text-blue-600" />
                </div>
                <Text type="secondary" className="text-sm font-medium text-blue-600">
                  Bài viết trước
                </Text>
              </div>
              <div className="text-gray-800 font-semibold group-hover:text-blue-700 transition-colors duration-200">
                Giới thiệu về bảo mật web
              </div>
            </Link>

            {/* Next Post */}
            <Link
              href={ROUTE_PATH.POST_DETAILS.replace(":id", "1")}
              className="group p-6 border border-gray-200 hover:border-green-300 hover:shadow-md transition-all duration-300 rounded-xl bg-gradient-to-r from-gray-50 to-white hover:from-green-50 hover:to-white"
            >
              <div className="flex items-center gap-3 mb-3 justify-end">
                <Text type="secondary" className="text-sm font-medium text-green-600">
                  Bài viết tiếp theo
                </Text>
                <div className="p-2 rounded-full bg-green-100 group-hover:bg-green-200 transition-colors duration-200">
                  <ArrowRight className="size-4 text-green-600" />
                </div>
              </div>
              <div className="text-gray-800 font-semibold group-hover:text-green-700 transition-colors duration-200 text-right">
                Phát hiện các cuộc tấn công web (2)
              </div>
            </Link>
          </div>

          <Divider className="my-8" />

          <div className="flex flex-col gap-6">
            <CommentForm />
            <CommentSection />
          </div>
        </section>

        <aside className="w-64 sticky top-20 h-fit">
          <TOC tableOfContents={tableOfContents} />
        </aside>
      </div>
    </MainLayout>
  );
};

export default PostDetails;
