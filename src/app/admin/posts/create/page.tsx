"use client";

import { createPost } from "@/apis/post.api";
import { getTags } from "@/apis/tag.api";
import CustomFormItem from "@/components/shared/custom-form/CustomFormItem";
import { Editor } from "@/components/shared/editor/Editor";
import { OptionSelectAndCreate, SelectAndCreate } from "@/components/shared/select/SelectAndCreate";
import { CustomUpload } from "@/components/shared/upload/CustomUpload";
import { ALLOWED_IMAGE_TYPES } from "@/constants/file.constant";
import { PostStatus, PostVisibility } from "@/constants/post.constant";
import { QUERY_KEYS } from "@/constants/query-keys.constant";
import { useInfiniteQuery, useMutation } from "@tanstack/react-query";
import { Button, Card, DatePicker, Form, Input, message, Select } from "antd";
import dayjs from "dayjs";
import { Plus } from "lucide-react";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { useDebounce } from "@/hooks/useDebounce";

const buttonLabels = {
  [PostStatus.DRAFT]: "Save as draft",
  [PostStatus.PUBLISHED]: "Publish",
  [PostStatus.SCHEDULED]: "Schedule",
};

type FormValues = {
  title: string;
  description: string;
  thumbnail: string;
  content: string;
  tags: OptionSelectAndCreate[];
  status: PostStatus;
  publishAt?: dayjs.Dayjs;
};

const CreatePost = () => {
  const [messageApi, contextHolder] = message.useMessage();

  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 400);
  const {
    data: dataTags,
    fetchNextPage,
    hasNextPage,
    isLoading: isLoadingTags,
    isFetching: isFetchingTags,
  } = useInfiniteQuery({
    queryKey: [QUERY_KEYS.TAGS, debouncedSearch],
    initialPageParam: 1,
    queryFn: ({ pageParam = 1 }) => {
      return getTags({ page: pageParam, limit: 10, search: debouncedSearch });
    },
    getNextPageParam: (lastPage, pages) => {
      const { page, totalPages } = lastPage.meta;

      if (page >= totalPages) {
        return undefined;
      }

      return page + 1;
    },
  });

  const tags = useMemo(() => dataTags?.pages.flatMap((page) => page.data) ?? [], [dataTags]);
  const [optionsTags, setOptionsTags] = useState<OptionSelectAndCreate[]>([]);

  const [form] = Form.useForm();
  const status = Form.useWatch("status", form);
  const thumbnail = Form.useWatch("thumbnail", form);

  const createPostMutation = useMutation({
    mutationFn: createPost,
    onSuccess(data, variables, context) {
      messageApi.success("Post created successfully");
      form.resetFields();
    },
    onError(error, variables, context) {
      messageApi.error("Something went wrong!");
    },
  });

  const handleSubmit = (values: FormValues) => {
    const visibility =
      values.status === PostStatus.DRAFT ? PostVisibility.PRIVATE : PostVisibility.PUBLIC;
    createPostMutation.mutate({
      ...values,
      tags: values.tags.map((tag) => {
        // custom tag
        if (tag.value === tag.label) {
          return { name: tag.label };
        }

        return { name: tag.label, id: tag.value };
      }),
      visibility,
    });
  };

  useEffect(() => {
    const newTags = tags.map((tag) => ({ label: tag.name, value: tag.id }));
    setOptionsTags(newTags);
  }, [tags]);

  return (
    <div>
      {contextHolder}
      <Form
        layout="vertical"
        className="flex gap-4"
        form={form}
        initialValues={{
          status: PostStatus.DRAFT,
          visibility: PostVisibility.PRIVATE,
          content: "",
        }}
        onFinish={handleSubmit}
      >
        <div className="!space-y-4 flex-1">
          <Card>
            <CustomFormItem
              name="title"
              label="Title"
              className="!mb-0"
              rules={[{ required: true, message: "Title is required" }]}
            >
              <Input.TextArea placeholder="Title" rows={5} />
            </CustomFormItem>
          </Card>

          <Card>
            <CustomFormItem
              name="description"
              label="Description"
              className="!mb-0"
              rules={[{ required: true, message: "Description is required" }]}
            >
              <Input.TextArea placeholder="Description" rows={5} />
            </CustomFormItem>
          </Card>

          <Card>
            <CustomFormItem
              name="thumbnail"
              label="Thumbnail"
              className="!mb-0"
              rules={[{ required: true, message: "Thumbnail is required" }]}
            >
              <CustomUpload
                maxCount={1}
                name="thumbnail"
                listType="picture-card"
                showUploadList={false}
                variant="thumbnail"
                accept={ALLOWED_IMAGE_TYPES.join(",")}
                onUploadSuccess={(url) => {
                  form.setFieldValue("thumbnail", url);
                }}
              >
                <div className="flex items-center justify-center gap-2 h-[240px]">
                  {thumbnail ? (
                    <Image
                      src={thumbnail}
                      alt="thumbnail"
                      layout="fill"
                      className="w-full h-full object-cover rounded-md"
                    />
                  ) : (
                    <>
                      <Plus className="size-4" />
                      <span>Upload thumbnail</span>
                    </>
                  )}
                </div>
              </CustomUpload>
            </CustomFormItem>
          </Card>

          <Card>
            <CustomFormItem
              name="content"
              label="Content"
              className="!mb-0"
              rules={[{ required: true, message: "Content is required" }]}
            >
              <Editor allowInsertImage />
            </CustomFormItem>
          </Card>
        </div>

        <div className="w-1/4 !space-y-4">
          <Card>
            <CustomFormItem name="tags" label="Tags" className="!mb-0">
              <SelectAndCreate
                options={optionsTags}
                onChangeOptions={setOptionsTags}
                placeholder="Select or create tag"
                placeholderInMenu="Enter tag"
                filterOption={false}
                onPopupScroll={(e) => {
                  const target = e.target as HTMLDivElement;

                  const isScrollToBottom =
                    target?.scrollTop + target?.clientHeight >= target?.scrollHeight;

                  if (isScrollToBottom && hasNextPage) fetchNextPage();
                }}
                loading={isLoadingTags || isFetchingTags}
                onSearch={(value) => setSearch(value)}
                searchValue={search}
              />
            </CustomFormItem>
          </Card>

          {/* <Card>
            <CustomFormItem
              name="visibility"
              label="Visibility"
              className="!mb-0"
              rules={[{ required: true, message: "Visibility is required" }]}
            >
              <Select
                placeholder="Select visibility"
                options={[
                  { value: PostVisibility.PUBLIC, label: "Public" },
                  { value: PostVisibility.PRIVATE, label: "Private" },
                ]}
              />
            </CustomFormItem>
          </Card> */}

          <Card>
            <CustomFormItem
              name="status"
              label="Status"
              className="!mb-0"
              rules={[{ required: true, message: "Status is required" }]}
            >
              <Select
                placeholder="Select status"
                options={[
                  { value: PostStatus.DRAFT, label: "Draft" },
                  { value: PostStatus.PUBLISHED, label: "Published" },
                  { value: PostStatus.SCHEDULED, label: "Scheduled" },
                ]}
              />
            </CustomFormItem>
          </Card>

          {status === PostStatus.SCHEDULED && (
            <Card>
              <CustomFormItem
                name="publishAt"
                label="Publish At"
                className="!mb-0"
                rules={[{ required: true, message: "Publish at is required" }]}
              >
                <DatePicker
                  showTime
                  className="w-full"
                  placeholder="Select publish at"
                  disabledDate={(current) => current && current < dayjs()}
                />
              </CustomFormItem>
            </Card>
          )}

          <Card>
            <Button
              type="primary"
              htmlType="submit"
              className="min-w-[140px]"
              loading={createPostMutation.isPending}
            >
              {buttonLabels[status as PostStatus]}
            </Button>
          </Card>
        </div>
      </Form>
    </div>
  );
};

export default CreatePost;
