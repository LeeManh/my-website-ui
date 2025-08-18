import React from "react";
import { MainHeader } from "@/components/shared/header/MainHeader";
import { MainNavbar } from "@/components/shared/navbar/MainNavbar";
import { Footer } from "@/components/shared/footer/Footer";
import { Subscribe } from "@/components/shared/subscribe/Subscribe";

interface MainLayoutProps {
  children: React.ReactNode;
  showNavbar?: boolean;
}

export const MainLayout = ({ children, showNavbar = true }: MainLayoutProps) => {
  return (
    <div>
      <MainHeader />
      {showNavbar && <MainNavbar />}
      <div className="container mx-auto py-8">{children}</div>
      <Subscribe />
      <Footer />
    </div>
  );
};
