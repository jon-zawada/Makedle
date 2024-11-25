import React, { useEffect, useState } from "react";
import useHttpService from "../../api/useHttpService";
import { Game } from "../../types/types";
import GameItem from "./GameItem";
import PageLayout from "../../components/common/PageLayout";

export default function GamesPage() {
  const [games, setGames] = useState([]);
  const httpService = useHttpService();

  useEffect(() => {
    initGames();
  }, []);

  const initGames = async () => {
    const response = await httpService.get("/games");
    const games = response.data;
    setGames(games);
  };

  return (
    <PageLayout title="Games">
      <div className="grid gap-4  sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {games.map((game: Game) => (
          <GameItem key={game.id} game={game} />
        ))}
      </div>
    </PageLayout>
  );
}
