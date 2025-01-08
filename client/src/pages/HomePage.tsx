import React, { useEffect, useState } from "react";
import PageLayout from "../components/common/PageLayout";
import { Link } from "react-router-dom";
import Carousel from "../components/common/Carousel";
import useHttpService from "../api/useHttpService";

const HomePage = () => {
  const [popularGames, setPopularGames] = useState([]);
  const [recentGames, setRecentGames] = useState([]);
  const [loadingPopular, setLoadingPopular] = useState(true);
  const [loadingRecent, setLoadingRecent] = useState(true);
  const httpService = useHttpService();

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

  useEffect(() => {
    getMostPopular();
    getRecent();
  }, []);

  const getMostPopular = async () => {
    try {
      setLoadingPopular(true);
      const response = await httpService.get("/games", {
        params: {
          page: 1,
          limit: 20,
          sort: "POPULARITY",
        },
      });
      const { games } = response.data;
      setPopularGames(games);
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingPopular(false);
    }
  };

  const getRecent = async () => {
    try {
      setLoadingRecent(true);
      const response = await httpService.get("/games", {
        params: {
          page: 1,
          limit: 20,
          sort: "DESC",
        },
      });
      const { games } = response.data;
      setRecentGames(games);
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingRecent(false);
    }
  };

  return (
    <PageLayout title="Welcome to Makedle" description={description}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 border-2 shadow rounded">
          <h2 className="text-xl text-gray-800 p-2">Most Popular Games</h2>
          <Carousel games={popularGames} loading={loadingPopular} />
          <h2 className="text-xl text-gray-800 p-2">Recently Added Games</h2>
          <Carousel games={recentGames} loading={loadingRecent} />
        </div>
        <div className="flex flex-col gap-2">
          <div className="border-2 shadow rounded h-48">Small Tile 1</div>
          <div className="border -2 shadow rounded h-48">Small Tile 2</div>
        </div>
      </div>
    </PageLayout>
  );
};

export default HomePage;
