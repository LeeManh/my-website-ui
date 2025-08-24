import { PostStatus, PostVisibility, Reaction } from "@/constants/post.constant";
import { Tag } from "./tag.type";
import { Author } from "./user.type";
import { SuccessPaginationResponse } from "./common.type";

export interface Post {
  id: string;
  title: string;
  description: string;
  slug: string;
  thumbnail: string;
  content: string;
  authorId: string;
  seriesId: string | null;
  status: PostStatus;
  visibility: PostVisibility;
  publishedAt: string | null;
  scheduledAt: string | null;
  likeCount: number;
  dislikeCount: number;
  commentCount: number;
  bookmarkCount: number;
  reaction: Reaction | null;
  bookmarkStatus: "bookmarked" | null;
  author: Author;
  tags: Tag[];
  createdAt: string;
  updatedAt: string;
}

export type GetPostsResponse = SuccessPaginationResponse<Post[]>;

export interface CreatePostData {
  title: string;
  description: string;
  thumbnail: string;
  content: string;
  tags: { id?: string; name: string }[];
  status: PostStatus;
  visibility: PostVisibility;
  scheduledAt?: string;
}
