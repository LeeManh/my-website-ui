import { UploadMediaResponse } from "@/types/media.type";
import { axiosApi } from "./axios.api";

export const uploadFile = async (file: File, onProgress?: (percent: number) => void) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await axiosApi.post<UploadMediaResponse>("medias/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    onUploadProgress: (event) => {
      if (event.total) {
        const percent = Math.round((event.loaded / event.total) * 100);
        onProgress?.(percent);
      }
    },
  });
  return response;
};
