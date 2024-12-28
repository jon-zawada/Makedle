import React from "react";
import PageLayout from "../components/common/PageLayout";
import { Link } from "react-router-dom";

const HomePage = () => {
  const description = (
    <>
      Where Wordle Fans{" "}
      <Link to={"/create"}>
        <span className="underline font-bold hover:text-green-300 cursor-pointer">
          Create
        </span>{" "}
      </Link>
      and{" "}
      <Link to={"/games"}>
        <span className="underline font-bold hover:text-green-300 cursor-pointer">
          Play
        </span>
      </Link>
      !
    </>
  );

  return (
    <PageLayout title="Welcome to Makedle" description={description}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 ">
        <div className="lg:col-span-2 border-2 shadow rounded h-[392px]">Big Tile</div>
        <div className="flex flex-col gap-2">
          <div className="border-2 shadow rounded h-48">Small Tile 1</div>
          <div className="border -2 shadow rounded h-48">Small Tile 2</div>
        </div>
      </div>
    </PageLayout>
  );
};

export default HomePage;
