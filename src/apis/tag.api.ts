import { PaginationParams } from "@/types/common.type";
import { axiosApi } from "./axios.api";
import { GetTagsResponse } from "@/types/tag.type";

export const getTags = (params?: PaginationParams) => {
  return axiosApi.get<GetTagsResponse>("/tags", { params });
};
