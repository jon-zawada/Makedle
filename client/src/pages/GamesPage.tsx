import React, { useEffect, useState } from 'react'
import useHttpService from '../api/useHttpService'
import { Game } from '../types/types';
import Modal from '../components/common/Modal';

export default function GamesPage() {
  const [games, setGames] = useState([]);
  const [showModal, setShowModal] = useState(true);
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
        {games.map((game: Game) => (
          <li key={game.id}>{game.name}</li>
        ))}
      </ul>
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title='Example modal'
      >
        Hello world
      </Modal>
    </div>
  )
}
