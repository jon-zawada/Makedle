import React from "react";
import PageHeader from "./components/PageHeader";
import Button from "./components/common/Button";

const App = () => {
  return (
    <div className="grid grid-rows-[auto_1fr_auto] grid-cols-1 md:grid-cols-[250px_1fr] gap-4 max-h-screen">
      <PageHeader />
      <aside className="bg-gray-300 p-4">SIDEBAR</aside>
      <main className="flex gap-1 justify-center h-[75vh] bg-green-50">
        <div className="flex flex-col justify-center items-center">
          <div>MAIN CONTENT</div>
          <div className="flex gap-1">
            <Button>Play a game</Button>
            <Button>Make a game</Button>
          </div>
        </div>
      </main>
      <footer className="bg-green-100 p-4 col-span-2 text-center">FOOTER</footer>
    </div>
  );
};

export default App;
