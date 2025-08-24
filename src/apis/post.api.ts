import { CreatePostData, GetPostsResponse } from "@/types/post.type";
import { axiosApi } from "./axios.api";
import { PaginationParams } from "@/types/common.type";

export const getPosts = (params?: PaginationParams) =>
  axiosApi.get<GetPostsResponse>("/posts", { params });

export const createPost = (data: CreatePostData) => axiosApi.post("/posts", data);
