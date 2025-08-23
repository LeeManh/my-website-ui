import { HTTP_STATUS } from "@/constants/http-status.constant";

export interface MetaData {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export interface SuccessResponse<T> {
  statusCode: HTTP_STATUS;
  data: T;
}

export interface SuccessPaginationResponse<T> {
  statusCode: HTTP_STATUS;
  data: T;
  meta: MetaData;
}

export interface PaginationParams {
  page: number;
  limit: number;
}
