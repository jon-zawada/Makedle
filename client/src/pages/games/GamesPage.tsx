import React, { useEffect, useState } from "react";
import _isEmpty from "lodash/isEmpty";
import useHttpService from "../../api/useHttpService";
import { Game } from "../../types/types";
import GameItem from "./GameItem";
import PageLayout from "../../components/common/PageLayout";
import toast from "react-hot-toast";
import EmptyState from "../../components/common/EmptyState";

export default function GamesPage() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(false);
  const httpService = useHttpService();

  useEffect(() => {
    initGames();
  }, []);

  const initGames = async () => {
    try {
      setLoading(true);
      const response = await httpService.get("/games");
      const { games, totalCount } = response.data;
      console.log(totalCount); //TODO pagination on client
      setGames(games);
    } catch {
      toast.error("Issue loading games, try again later");
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageLayout title="Games" loading={loading}>
      {_isEmpty(games) ? (
        <EmptyState />
      ) : (
        <div className="grid gap-4  sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {games.map((game: Game) => (
            <GameItem key={game.id} game={game} />
          ))}
        </div>
      )}
    </PageLayout>
  );
}
