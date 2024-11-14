import React from "react";
import { Route, Routes } from "react-router-dom";
import PageHeader from "./components/PageHeader";
import Sidebar from "./components/Sidebar";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";

const App = () => {
  return (
    <div className="grid grid-cols-[250px_1fr] gap-4 max-h-screen">
      <PageHeader />
      <Sidebar />
      <main className="h-[75vh] bg-green-50">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </main>
      <footer className="bg-green-100 p-4 col-span-2 text-center">
        FOOTER!
      </footer>
    </div>
  );
};

export default App;
