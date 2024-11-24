import React from "react";
import Button from "../components/common/Button";
import useHttpService from "../api/useHttpService";
import PageLayout from "../components/common/PageLayout";

const HomePage = () => {
  const httpService = useHttpService();
  // TODO delete
  const test = () => {
    httpService.get("/users");
  };
  return (
    <PageLayout title="Home">
      <div className="flex gap-1">
        <Button onClick={test}>Play a game</Button>
        <Button>Make a game</Button>
      </div>
    </PageLayout>
  );
};

export default HomePage;
