import React from "react";
import PageLayout from "../components/common/PageLayout";
import Button from "../components/common/Button";
import { useNavigate } from "react-router-dom";

export default function ErrorPage() {
  const navigate = useNavigate();
  return (
    <PageLayout title="">
      <div className="flex flex-col items-center min-h-screen">
        <h1 className="text-9xl font-bold text-green-400">404</h1>
        <p className="my-4 text-2xl text-green-400">Oops! Page not found.</p>
        <Button onClick={() => navigate("/")}>Go back to Home</Button>
      </div>
    </PageLayout>
  );
}
