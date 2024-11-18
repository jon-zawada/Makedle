import React from "react";
import Button from "../components/common/Button";
import useHttpService from "../api/useHttpService";

const HomePage = () => {
  const httpService = useHttpService();
  // TODO delete
  const test = () => {
    httpService.get("/users");
  }
  return (
    <div>
      <div className="flex flex-col justify-center items-center">
        <div>MAIN CONTENT</div>
        <div className="flex gap-1">
          <Button onClick={test}>Play a game</Button>
          <Button>Make a game</Button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
