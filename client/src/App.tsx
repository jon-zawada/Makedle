import React, { useEffect } from "react";
import PageHeader from "./components/PageHeader";
import Button from "./components/common/Button";
import httpService from "./api/httpService";

const App = () => {

  //delete this later
  useEffect(() => {
    httpService.get("/games")
      .then(res => {
        console.log(res.data);        
      })
  }, []);

  return (
    <div className="max-h-screen flex flex-col">
      <PageHeader />
      <div className="flex gap-1 justify-center">
        <Button>
          Play a game
        </Button> 
        <Button>
          Make a game
        </Button> 
      </div>
    </div>
  );
};

export default App;
