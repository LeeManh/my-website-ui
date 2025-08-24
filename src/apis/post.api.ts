import {
  CreateBookmarkData,
  CreateLikeData,
  CreatePostData,
  GetDetailPostResponse,
  GetPostsResponse,
} from "@/types/post.type";
import { axiosApi } from "./axios.api";
import { PaginationParams } from "@/types/common.type";

export const getPosts = (params?: PaginationParams) =>
  axiosApi.get<GetPostsResponse>("/posts", { params });
export const getPostById = (id: string) => axiosApi.get<GetDetailPostResponse>(`/posts/${id}`);

export const getAdminPosts = (params?: PaginationParams) =>
  axiosApi.get<GetPostsResponse>("/posts/admin/all", { params });
export const createPost = (data: CreatePostData) => axiosApi.post("/posts", data);

export const createLike = (data: CreateLikeData) => axiosApi.post("/likes", data);
export const createBookmark = (data: CreateBookmarkData) => axiosApi.post("/bookmarks", data);
