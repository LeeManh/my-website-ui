import { AdminLayout } from "@/components/layouts/AdminLayout";
import { AdminDashBoardProvider } from "@/contexts/AdminDashBoardContext";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AdminDashBoardProvider>
      <AdminLayout>{children}</AdminLayout>;
    </AdminDashBoardProvider>
  );
}
