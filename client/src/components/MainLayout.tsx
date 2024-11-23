import React from "react";
import { Outlet } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import Sidebar from "../components/Sidebar";
import { useAuth } from "../context/AuthProvider";

const MainLayout = () => {
  const {appUser} = useAuth();

  return (
    <div className="grid grid-cols-[250px_1fr] gap-4 max-h-screen">
      <PageHeader />
      {appUser && <Sidebar />}
      <main className={`h-[75vh] bg-green-50 overflow-x-hidden px-8 pb-4 ${!appUser && "col-span-2"}`}>
        <Outlet />
      </main>
      <footer className="bg-green-100 p-4 col-span-2 text-center">
        FOOTER!
      </footer>
    </div>
  );
};

export default MainLayout;
