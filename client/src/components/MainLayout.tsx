import React from "react";
import { Outlet } from "react-router-dom";
import PageHeader from "../components/PageHeader";

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <PageHeader />
      <main className="flex-1 bg-green-50 overflow-x-hidden px-8 pb-4">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
