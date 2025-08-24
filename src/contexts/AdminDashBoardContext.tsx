"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";

interface AdminDashBoardContextType {
  collapsed: boolean;
  toggleCollapsed: () => void;
}

const AdminDashBoardContext = createContext<AdminDashBoardContextType | null>(null);

export const AdminDashBoardProvider = ({ children }: { children: React.ReactNode }) => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapsed = useCallback(() => {
    setCollapsed((prev) => !prev);
  }, []);

  const value = useMemo(() => ({ collapsed, toggleCollapsed }), [collapsed, toggleCollapsed]);

  return <AdminDashBoardContext.Provider value={value}>{children}</AdminDashBoardContext.Provider>;
};

export const useAdminDashBoard = () => {
  const context = useContext(AdminDashBoardContext);

  if (!context) {
    throw new Error("useAdminDashBoard must be used within a AdminDashBoardProvider");
  }

  return context;
};
