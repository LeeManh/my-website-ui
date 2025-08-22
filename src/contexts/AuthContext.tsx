import { login } from "@/apis/auth.api";
import { ROUTE_PATH } from "@/constants/route-path.constant";
import { LoginBody, LoginResponse } from "@/types/auth.type";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { createContext, useCallback, useContext, useMemo, useState } from "react";

interface AuthContextType {
  accessToken: string;
  refreshToken: string;
  isAuthenticated: boolean;
  setAccessToken: (accessToken: string) => void;
  setRefreshToken: (refreshToken: string) => void;
  login: (body: LoginBody) => void;
  isLoggingIn: boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const [accessToken, setAccessToken] = useState("");
  const [refreshToken, setRefreshToken] = useState("");

  const isAuthenticated = useMemo(() => !!accessToken, [accessToken]);

  const handleLoginSuccess = useCallback(
    (data: LoginResponse) => {
      const { accessToken: newAccessToken, refreshToken: newRefreshToken } = data.data;

      localStorage.setItem("accessToken", newAccessToken);
      localStorage.setItem("refreshToken", newRefreshToken);

      setAccessToken(newAccessToken);
      setRefreshToken(newRefreshToken);

      router.push(ROUTE_PATH.HOME);
    },
    [router]
  );

  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: handleLoginSuccess,
  });

  const handleLogin = useCallback(
    (body: LoginBody) => {
      loginMutation.mutate(body);
    },
    [loginMutation]
  );

  const handleLogout = useCallback(() => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setAccessToken("");
    setRefreshToken("");
    router.push(ROUTE_PATH.LOGIN);
  }, [router]);

  const value = useMemo(
    () => ({
      accessToken,
      refreshToken,
      isAuthenticated,
      setAccessToken,
      setRefreshToken,
      login: handleLogin,
      isLoggingIn: loginMutation.isPending,
      logout: handleLogout,
    }),
    [accessToken, refreshToken, handleLogin, loginMutation.isPending, isAuthenticated, handleLogout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
