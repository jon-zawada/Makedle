import React, { useEffect, useState } from 'react'
import useHttpService from '../api/useHttpService'

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
  }

  return (
    <div>
      <h2>Games</h2>
      <ul>
        {games.map((game) => (
          <li key={game.id}>{game.name}</li>
        ))}
      </ul>
    </div>
  )
}
