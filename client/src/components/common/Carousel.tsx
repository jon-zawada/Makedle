import React, { useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Button from "./Button";
import GameItem from "../../pages/games/GameItem";
import { Game } from "../../types/types";
import LoadingSpinner from "./LoadingSpinner";

interface ICarouselProps {
  games: Game[];
  loading: boolean;
}

export default function Carousel({ games, loading }: ICarouselProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  const scrollLeft = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({
        left: -800,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({
        left: 800,
        behavior: "smooth",
      });
    }
  };

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isHovered && (
        <Button
          className="absolute left-1 top-1/2 -translate-y-1/2 bg-gray-800 bg-opacity-50 text-white p-3 rounded-full z-10 hover:bg-opacity-70"
          onClick={scrollLeft}
        >
          <ChevronLeft />
        </Button>
      )}
      <div
        ref={containerRef}
        className="flex overflow-x-auto no-scrollbar p-2 gap-4"
      >
        {loading ? (
          <div className="flex items-center justify-center w-full h-[250px]">
            <LoadingSpinner />
          </div>
        ) : (
          games.map((game, index) => <GameItem key={index} game={game} />)
        )}
      </div>
      {isHovered && (
        <Button
          className="absolute right-1 top-1/2 -translate-y-1/2 bg-gray-800 bg-opacity-50 text-white p-3 rounded-full z-10 hover:bg-opacity-70"
          onClick={scrollRight}
        >
          <ChevronRight />
        </Button>
      )}
    </div>
  );
}
