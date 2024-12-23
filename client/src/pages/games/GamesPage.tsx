import React, { useEffect, useState } from "react";
import useHttpService from "../../api/useHttpService";
import { Game } from "../../types/types";
import GameItem from "./GameItem";
import PageLayout from "../../components/common/PageLayout";
import toast from "react-hot-toast";
import PaginatedList from "../../components/common/PaginatedList";
const PAGE_SIZE_LIMIT = 20;

export default function GamesPage() {
  const [games, setGames] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const httpService = useHttpService();

  useEffect(() => {
    initGames();
  }, []);

  const page = 1;
  
  const initGames = async () => {
    try {
      setLoading(true);
      const response = await httpService.get("/games", {
        params: {
          page: page,
          limit: PAGE_SIZE_LIMIT,
        },
      });
      const { games, totalCount } = response.data;
      setTotalCount(totalCount);
      setGames(games);
    } catch {
      toast.error("Issue loading games, try again later");
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageLayout title="Games" loading={loading}>
      <PaginatedList listLength={totalCount}>
        <div className="grid gap-4  sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {games.map((game: Game) => (
            <GameItem key={game.id} game={game} />
          ))}
        </div>
      </PaginatedList>
    </PageLayout>
  );
}
