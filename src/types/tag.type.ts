import { SuccessPaginationResponse } from "./common.type";

export interface Tag {
  id: string;
  name: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
}

export type GetTagsResponse = SuccessPaginationResponse<Tag[]>;
