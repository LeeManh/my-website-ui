"use client";

import Link from "next/link";
import { Button, Form, Input, Typography } from "antd";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { Logo } from "@/components/shared/logo/Logo";
import { ROUTE_PATH } from "@/constants/route-path.constant";
import CustomFormItem from "@/components/shared/custom-form/CustomFormItem";
import { useAuth } from "@/contexts/AuthContext";

const { Text } = Typography;

interface LoginFormValues {
  email: string;
  password: string;
  remember: boolean;
}

export default function Login() {
  const { login, isLoggingIn } = useAuth();

  const onFinish = (values: LoginFormValues) => {
    login(values);
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
        <Form onFinish={onFinish} layout="vertical">
          <CustomFormItem
            name="email"
            rules={[
              { required: true, message: "Email is required!" },
              { type: "email", message: "Invalid email!" },
            ]}
          >
            <Input prefix={<MailOutlined />} placeholder="Email" />
          </CustomFormItem>

          <CustomFormItem
            name="password"
            rules={[
              { required: true, message: "Password is required!" },
              { min: 6, message: "Password must be at least 6 characters!" },
            ]}
          >
            <Input.Password prefix={<LockOutlined />} type="password" placeholder="Password" />
          </CustomFormItem>

          <CustomFormItem>
            <Link className="float-right" href="">
              Forgot password?
            </Link>
          </CustomFormItem>

          <Button block type="primary" htmlType="submit" loading={isLoggingIn}>
            Log in
          </Button>

          <div className="mt-6 text-center w-full">
            <Text className="text-gray-500">Don&apos;t have an account?</Text>{" "}
            <Link href={ROUTE_PATH.REGISTER}>Register now</Link>
          </div>
        </Form>
      </div>
    </section>
  );
}
