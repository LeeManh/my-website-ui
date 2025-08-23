import { Skeleton } from "antd";

export const CardSkeleton = () => {
  return (
    <div className="border border-gray-200 rounded-lg">
      <div className="p-4 space-y-2">
        <Skeleton active title paragraph={{ rows: 2, width: "100%" }} />
        <Skeleton.Image active className="!w-full !h-40 !object-cover !rounded-lg" />
      </div>
    </div>
  );
};
