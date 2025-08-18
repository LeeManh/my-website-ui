import { axiosApi } from "./axios.api";

interface LoginBody {
  email: string;
  password: string;
}

export const login = (body: LoginBody) => axiosApi.post("/auth/login", body);
