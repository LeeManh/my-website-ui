"use client";

import { message, Progress, Upload, UploadProps } from "antd";
import styles from "./CustomUpload.module.scss";
import clsx from "clsx";
import { DEFAULT_MAX_SIZE } from "@/constants/file.constant";
import { uploadFile } from "@/apis/media.api";
import { useState } from "react";

interface CustomUploadProps extends UploadProps {
  variant?: "thumbnail";
  maxSize?: number;
  onUploadSuccess?: (url: string) => void;
}

export const CustomUpload = ({
  variant,
  className,
  maxSize = DEFAULT_MAX_SIZE,
  onChange,
  onUploadSuccess,
  children,
  ...props
}: CustomUploadProps) => {
  const [isUploading, setIsUploading] = useState(false);
  const [percent, setPercent] = useState<number>(0);

  const beforeUpload = (file: File) => {
    const isLtMax = file.size <= maxSize;
    if (!isLtMax) {
      message.error(`File size must be less than ${maxSize}MB`);
      return Upload.LIST_IGNORE;
    }
    return true;
  };

  return (
    <div>
      <Upload
        beforeUpload={beforeUpload}
        className={clsx(styles.upload, { [styles.thumbnail]: variant === "thumbnail" }, className)}
        customRequest={async (
          options: Parameters<NonNullable<UploadProps["customRequest"]>>[0]
        ) => {
          const file = options.file as File;

          try {
            setIsUploading(true);
            const response = await uploadFile(file, (p) => {
              setPercent(p);
              options.onProgress?.({ percent: p } as any);
            });
            const url = response.data.url;

            onUploadSuccess?.(url);
            options.onSuccess?.(response, file);
          } catch (error) {
            message.error("Upload failed");
            options.onError?.(error as Error);
          } finally {
            setIsUploading(false);
            setPercent(0);
          }
        }}
        // onChange={onChange}
        {...props}
      >
        {children}
      </Upload>

      {isUploading && (
        <div className="absolute inset-0 bg-white flex items-center justify-center rounded-lg border border-dashed border-gray-200">
          <div className="w-1/2">
            <Progress percent={percent} />
          </div>
        </div>
      )}
    </div>
  );
};
