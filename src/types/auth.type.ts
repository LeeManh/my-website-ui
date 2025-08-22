import { SuccessResponse } from "./common.type";

export interface LoginBody {
  email: string;
  password: string;
}

export interface LoginData {
  accessToken: string;
  refreshToken: string;
}

export type LoginResponse = SuccessResponse<LoginData>;
