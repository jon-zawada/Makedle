import React from "react";
import { Game } from "../../types/types";
import { useNavigate } from "react-router-dom";

interface IGameItemProps {
  game: Game;
  view?: string;
}

export default function GameItem({ game, view }: IGameItemProps) {
  const { id, name, image } = game;
  const navigate = useNavigate();

  const handleNavigateClick = () => {
    navigate(`/games/${id}`, { state: { gameData: game } });
  };

  const baseStyles = "bg-white relative group hover:cursor-pointer rounded-xl transition-all duration-200"; //perhaps opacity diff on hover? not a border
  const carouselStyles = "h-[90%] w-[90%]";
  const defaultStyles = "w-full h-[245px]";

  const styles = view === "carousel" ? `${baseStyles} ${carouselStyles}` : `${baseStyles} ${defaultStyles}`;
  return (
    <div
      className={styles}
      onClick={handleNavigateClick}
    >
      <img
        src={image}
        alt={`${name} image`}
        className="h-[100%] w-[100%] object-contain rounded-xl"
      />
      <div className="absolute p-2 inset-0 flex items-end justify-center text-white text-lg font-bold rounded-xl hover:underline hover:text-green-500">
        {name}
      </div>
      <div className="absolute inset-0 rounded-xl outline-none group-hover:outline group-hover:outline-4 group-hover:outline-green-500 pointer-events-none"></div>
    </div>
  );
}
