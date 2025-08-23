"use client";

import CustomFormItem from "@/components/shared/custom-form/CustomFormItem";
import { Editor } from "@/components/shared/editor/Editor";
import { SelectAndCreate } from "@/components/shared/select/SelectAndCreate";
import { CustomUpload } from "@/components/shared/upload/CustomUpload";
import { ALLOWED_IMAGE_TYPES } from "@/constants/file.constant";
import { PostStatus, PostVisibility } from "@/constants/post.constant";
import { Button, Card, DatePicker, Form, Input, Select } from "antd";
import dayjs from "dayjs";
import { Plus } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

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
  tags: string[];
};

const CreatePost = () => {
  const [tags, setTags] = useState(["tag1", "tag2", "tag3"]);

  const [form] = Form.useForm();
  const status = Form.useWatch("status", form);
  const thumbnail = Form.useWatch("thumbnail", form);

  const handleSubmit = (values: FormValues) => {
    console.log(values);
  };

  return (
    <div>
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
                {thumbnail ? (
                  <Image
                    src={thumbnail}
                    alt="thumbnail"
                    layout="fill"
                    className="w-full h-full object-cover rounded-md"
                  />
                ) : (
                  <div className="flex items-center justify-center gap-2">
                    <Plus className="size-4" />
                    <span>Upload thumbnail</span>
                  </div>
                )}
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

          <Card>
            <Button type="primary" htmlType="submit" className="min-w-[140px]">
              {buttonLabels[status as PostStatus]}
            </Button>
          </Card>
        </div>

        <div className="w-1/4 !space-y-4">
          <Card>
            <CustomFormItem name="tags" label="Tags" className="!mb-0">
              <SelectAndCreate
                items={tags}
                setItems={setTags}
                placeholder="Select or create tag"
                placeholderInMenu="Enter tag"
              />
            </CustomFormItem>
          </Card>

          <Card>
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
          </Card>

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
        </div>
      </Form>
    </div>
  );
};

export default CreatePost;
