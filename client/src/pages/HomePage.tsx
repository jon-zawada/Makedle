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
        </span>{" "}
      </Link>
      !
    </>
  );

  return (
    <PageLayout title="Welcome to Makedle " description={description}>
      <div className="flex flex-col gap-1">{/* TODO ADD CONTENT */}</div>
    </PageLayout>
  );
};

export default HomePage;
