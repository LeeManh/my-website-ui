"use client";

import React, { useState } from "react";
import { Button, Card, Input, Select, Space, Table, Tag, Tooltip } from "antd";
import type { TableProps } from "antd";
import { Edit, Plus, Trash } from "lucide-react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/constants/query-keys.constant";
import { getAdminPosts } from "@/apis/post.api";
import { PostStatus, PostVisibility } from "@/constants/post.constant";
import { Post } from "@/types/post.type";
import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";
import { ROUTE_PATH } from "@/constants/route-path.constant";

const statusColor: Record<PostStatus, string> = {
  [PostStatus.DRAFT]: "default",
  [PostStatus.PUBLISHED]: "green",
  [PostStatus.SCHEDULED]: "blue",
};

const visibilityColor: Record<PostVisibility, string> = {
  [PostVisibility.PUBLIC]: "green",
  [PostVisibility.PRIVATE]: "default",
};

const statusLabel: Record<PostStatus, string> = {
  [PostStatus.DRAFT]: "Draft",
  [PostStatus.PUBLISHED]: "Published",
  [PostStatus.SCHEDULED]: "Scheduled",
};

const visibilityLabel: Record<PostVisibility, string> = {
  [PostVisibility.PUBLIC]: "Public",
  [PostVisibility.PRIVATE]: "Private",
};

export const columns: TableProps<Post>["columns"] = [
  {
    title: "Thumbnail",
    dataIndex: "thumbnail",
    key: "thumbnail",
    width: 200,
    align: "center",
    render: (src) => (
      <Image src={src} alt="thumbnail" width={400} height={200} className="object-cover rounded" />
    ),
  },
  {
    title: "Title",
    dataIndex: "title",
    key: "title",
    width: 300,
  },
  {
    title: "Tags",
    dataIndex: "tags",
    key: "tags",
    width: 300,
    align: "center",
    render: (_, record) => {
      return (
        <div className="flex items-center gap-2 flex-wrap">
          {record.tags?.map((tag) => (
            <Tag key={tag.id} className="!m-0" color="blue">
              {tag.name}
            </Tag>
          ))}
        </div>
      );
    },
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    width: 120,
    align: "center",
    render: (status: PostStatus) => <Tag color={statusColor[status]}>{statusLabel[status]}</Tag>,
  },
  {
    title: "Visibility",
    dataIndex: "visibility",
    key: "visibility",
    width: 120,
    align: "center",
    render: (v: PostVisibility) => (
      <Tag color={visibilityColor[v]} className="!mx-auto">
        {visibilityLabel[v]}
      </Tag>
    ),
  },
  {
    title: "Likes",
    dataIndex: "likeCount",
    key: "likeCount",
    width: 110,
    align: "center",
  },
  {
    title: "Comments",
    dataIndex: "commentCount",
    key: "commentCount",
    width: 110,
    align: "center",
  },
  {
    title: "Bookmarks",
    dataIndex: "bookmarkCount",
    key: "bookmarkCount",
    width: 110,
    align: "center",
  },
  {
    title: "Published At",
    key: "publishedAt",
    width: 200,
    align: "center",
    render: (_, r) => {
      const at = r.publishedAt;
      return at ? dayjs(at).format("YYYY-MM-DD HH:mm") : "—";
    },
  },
  {
    title: "Created At",
    dataIndex: "createdAt",
    key: "createdAt",
    width: 180,
    render: (v: string) => dayjs(v).format("YYYY-MM-DD HH:mm"),
  },
  {
    title: "Scheduled At",
    key: "scheduledAt",
    width: 200,
    align: "center",
    render: (_, r) => {
      const at = r.scheduledAt;
      return at ? dayjs(at).format("YYYY-MM-DD HH:mm") : "—";
    },
  },
  {
    title: "Actions",
    key: "actions",
    fixed: "right",
    render: (_, r) => (
      <div className="flex items-center gap-2">
        <Tooltip title="Edit">
          <Button type="text" shape="circle">
            <Edit className="size-4" />
          </Button>
        </Tooltip>
        <Tooltip title="Delete">
          <Button type="text" shape="circle" danger>
            <Trash className="size-4" />
          </Button>
        </Tooltip>
      </div>
    ),
  },
];

const PostsManagement = () => {
  const [filter, setFilter] = useState({
    search: "",
    page: 1,
    limit: 10,
  });

  const { data, isLoading } = useQuery({
    queryKey: [QUERY_KEYS.ADMIN_POSTS, filter],
    queryFn: () => getAdminPosts(filter),
    placeholderData: keepPreviousData,
  });

  return (
    <Card>
      <div className="mb-8 flex items-center justify-between">
        <Link href={ROUTE_PATH.ADMIN.CREATE_POST}>
          <Button type="primary">
            <Plus className="w-4 h-4" />
            Create Post
          </Button>
        </Link>

        <div className="flex items-center gap-2">
          <Select
            className="!w-[150px]"
            options={[
              { value: PostVisibility.PUBLIC, label: "Public" },
              { value: PostVisibility.PRIVATE, label: "Private" },
            ]}
            allowClear
            placeholder="Select Visibility"
          />
          <Select
            className="!w-[150px]"
            options={[
              { value: PostStatus.DRAFT, label: "Draft" },
              { value: PostStatus.PUBLISHED, label: "Published" },
              { value: PostStatus.SCHEDULED, label: "Scheduled" },
            ]}
            allowClear
            placeholder="Select Status"
          />
          <Input.Search
            placeholder="Search"
            className="!w-[300px]"
            defaultValue={filter.search}
            onSearch={(value) => setFilter((prev) => ({ ...prev, search: value }))}
          />
        </div>
      </div>

      <Table<Post>
        rowKey="id"
        columns={columns}
        dataSource={data?.data ?? []}
        bordered
        pagination={{
          total: data?.meta.total,
          pageSize: data?.meta.limit,
          onChange(page) {
            setFilter((prev) => ({ ...prev, page }));
          },
        }}
        loading={isLoading}
      />
    </Card>
  );
};

export default PostsManagement;
