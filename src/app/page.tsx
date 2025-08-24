"use client";

import { MainLayout } from "@/components/layouts/MainLayout";
import ListPost from "@/components/shared/card/ListPost";
import { FloatButton } from "antd";

export default function Home() {
  return (
    <MainLayout>
      <ListPost />

      <FloatButton.BackTop />
    </MainLayout>
  );
}
