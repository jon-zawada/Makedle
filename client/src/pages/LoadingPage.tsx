import React from "react";
import PageLayout from "../components/common/PageLayout";
import LoadingSpinner from "../components/common/LoadingSpinner";

export default function LoadingPage() {
  return (
    <PageLayout>
      <LoadingSpinner />
    </PageLayout>
  );
}
