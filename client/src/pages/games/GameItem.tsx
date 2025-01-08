import React from "react";
import { Game } from "../../types/types";
import { useNavigate } from "react-router-dom";

interface IGameItemProps {
  game: Game;
}

export default function GameItem({ game }: IGameItemProps) {
  const { id, name, image } = game;
  const navigate = useNavigate();

  const handleNavigateClick = () => {
    navigate(`/games/${id}`, { state: { gameData: game } });
  };

  return (
    <div
      className="relative flex flex-shrink-0 flex-col gap-2 group hover:cursor-pointer"
      onClick={handleNavigateClick}
    >
      <img
        src={image || `https://picsum.photos/id/${id}/5000/3333`}
        className="block w-full h-[250px] object-cover duration-200 rounded-xl opacity-95 group-hover:opacity-100 transition-[border-radius,opacity]"
      />
      <div className="absolute p-2 inset-0 flex items-end justify-center text-white text-lg font-bold rounded-xl hover:underline hover:text-green-500">
        {name}
      </div>
      <div className="absolute inset-0 rounded-xl outline-none group-hover:outline group-hover:outline-4 group-hover:outline-green-500 pointer-events-none"></div>
    </div>
  );
}
