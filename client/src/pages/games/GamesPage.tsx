import React, { useEffect, useState } from "react";
import useHttpService from "../../api/useHttpService";
import { Game } from "../../types/types";
import GameItem from "./GameItem";

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
    <div className="flex flex-col items-center justify-center gap-2">
      <h2 className="text-xl">Games</h2>
      <div className="grid gap-4  sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {games.map((game: Game) => (
          <GameItem key={game.id} {...game} />
        ))}
      </div>
    </div>
  );
}
