import { SuccessResponse } from "./common.type";

export type UploadMediaData = {
  url: string;
  mimeType: string;
  size: number;
};

export type UploadMediaResponse = SuccessResponse<UploadMediaData>;
