import { MainLayout } from "@/components/layouts/MainLayout";
import { Card } from "@/components/shared/card/Card";
import { Pagination } from "antd";

export default function Series() {
  return (
    <MainLayout>
      <div>
        <div className="flex-1 grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-4">
          {Array.from({ length: 12 }).map((_, index) => (
            <Card key={index} />
          ))}
        </div>

        <Pagination align="center" defaultCurrent={1} total={50} className="!mt-10" />
      </div>
    </MainLayout>
  );
}
