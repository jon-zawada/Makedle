import React from "react";
import { Outlet } from "react-router-dom";
import PageHeader from "../components/PageHeader";

const MainLayout = () => {
  return (
    <div className="grid grid-cols-[250px_1fr] gap-4 max-h-screen">
      <PageHeader />
      <main className="col-span-2 h-[75vh] bg-green-50 overflow-x-hidden px-8 pb-4">
        <Outlet />
      </main>
      <footer className="bg-green-100 p-4 col-span-2 text-center">
        FOOTER!
      </footer>
    </div>
  );
};

export default MainLayout;
