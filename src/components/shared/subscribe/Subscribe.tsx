"use client";

import { Button, Input, Typography, Card, Space, Form } from "antd";

import Image from "next/image";

const { Title, Text } = Typography;

export const Subscribe = () => {
  return (
    <section className="container mx-auto">
      <Card>
        <div className="flex flex-col lg:flex-row items-center gap-4">
          {/* Image Section */}
          <div className="w-full lg:w-1/2 relative rounded-lg overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1466096115517-bceecbfb6fde?q=80&w=2370&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Subscribe illustration"
              width={600}
              height={400}
              className="w-full h-66 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-t-lg lg:rounded-l-lg lg:rounded-tr-none" />
          </div>

          {/* Content Section */}
          <div className="w-full lg:w-1/2 p-4">
            <Space direction="vertical" size="large" className="w-full">
              {/* Header */}
              <div className="text-center lg:text-left">
                <Title level={2} className="mb-2 !text-gray-800">
                  Đăng ký nhận bài viết mới
                </Title>
                <Text className="text-gray-600 text-lg block">
                  Nhận thông báo khi có bài viết mới và những nội dung thú vị khác từ blog
                </Text>
              </div>

              <Form layout="vertical" className="w-full">
                <Form.Item name="email">
                  <Input placeholder="your.email@example.com" />
                </Form.Item>

                <Button type="primary" htmlType="submit" block>
                  Đăng ký ngay
                </Button>
              </Form>
            </Space>
          </div>
        </div>
      </Card>
    </section>
  );
};
