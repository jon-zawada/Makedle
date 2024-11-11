import React from "react";
import Button from "../components/common/Button";

const HomePage = () => {
  return (
    <div>
      <div className="flex flex-col justify-center items-center">
        <div>MAIN CONTENT</div>
        <div className="flex gap-1">
          <Button>Play a game</Button>
          <Button>Make a game</Button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
