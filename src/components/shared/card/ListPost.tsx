"use client";

import { useGetPosts } from "@/queries/useGetPosts";
import { Card } from "./Card";
import { CardSkeleton } from "./CardSkeleton";
import { Pagination } from "antd";
import { useState } from "react";
import { PaginationParams } from "@/types/common.type";
import { useScrollTop } from "@/hooks/useScrollTop";

const ListPostSkeleton = () => {
  return (
    <div className="flex-1 grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-4">
      {Array.from({ length: 12 }).map((_, index) => (
        <CardSkeleton key={index} />
      ))}
    </div>
  );
};

const ListPost = () => {
  const scrollToTop = useScrollTop();

  const [params, setParams] = useState<PaginationParams>({
    page: 1,
    limit: 12,
  });
  const { data, isLoading } = useGetPosts({ params });
  if (isLoading) return <ListPostSkeleton />;
  const { total } = data?.meta || {};

  return (
    <>
      <div className="flex-1 grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-4">
        {data?.data.map((post) => (
          <Card key={post.id} data={post} />
        ))}
      </div>

      <Pagination
        align="center"
        defaultCurrent={params.page}
        total={total}
        pageSize={params.limit}
        className="!mt-10"
        onChange={(page) => {
          setParams({ ...params, page });
          scrollToTop();
        }}
      />
    </>
  );
};

export default ListPost;
