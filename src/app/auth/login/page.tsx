"use client";

import React from "react";

import { Button, Checkbox, Form, Input, Typography } from "antd";

import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { Logo } from "@/components/shared/logo/Logo";
import { ROUTE_PATH } from "@/constants/route-path.constant";
import Link from "next/link";

const { Text } = Typography;

interface LoginFormValues {
  email: string;
  password: string;
  remember: boolean;
}

export default function Login() {
  const onFinish = (values: LoginFormValues) => {
    console.log("Received values of form: ", values);
  };

  return (
    <section className="flex items-center min-h-screen sm:h-auto bg-white md:py-16">
      <div className="mx-auto w-[380px] px-4 md:px-6">
        <div className="mb-8">
          <Logo />
          <Text className="block !text-2xl font-bold">Login</Text>
          <Text className="text-gray-500">
            Welcome back to vui.coding!
            <br />
            Please enter your details below to login.
          </Text>
        </div>
        <Form
          name="normal_login"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          layout="vertical"
          requiredMark="optional"
        >
          <Form.Item name="email">
            <Input prefix={<MailOutlined />} placeholder="Email" />
          </Form.Item>
          <Form.Item name="password">
            <Input.Password prefix={<LockOutlined />} type="password" placeholder="Password" />
          </Form.Item>
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
            <Link className="float-right" href="">
              Forgot password?
            </Link>
          </Form.Item>
          <Form.Item className="mb-0">
            <Button block type="primary" htmlType="submit">
              Log in
            </Button>
            <div className="mt-6 text-center w-full">
              <Text className="text-gray-500">Don&apos;t have an account?</Text>{" "}
              <Link href={ROUTE_PATH.REGISTER}>Register now</Link>
            </div>
          </Form.Item>
        </Form>
      </div>
    </section>
  );
}
