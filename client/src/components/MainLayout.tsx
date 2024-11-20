import React from "react";
import { Outlet } from "react-router-dom"; // import Outlet to render child routes
import PageHeader from "../components/PageHeader";
import Sidebar from "../components/Sidebar";

const MainLayout = () => {
  return (
    <div className="grid grid-cols-[250px_1fr] gap-4 max-h-screen">
      <PageHeader />
      <Sidebar />
      <main className="h-[75vh] bg-green-50">
        <Outlet />
      </main>
      <footer className="bg-green-100 p-4 col-span-2 text-center">
        FOOTER!
      </footer>
    </div>
  );
};

export default MainLayout;
