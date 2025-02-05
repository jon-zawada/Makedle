import React, { useState, useEffect } from "react";
import Button from "./Button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import GameItem from "../../pages/games/GameItem";
import { Game } from "../../types/types";
import LoadingSpinner from "./LoadingSpinner";
import { screenWidths } from "../../styleContants";

interface ICarouselProps {
  items: Game[]; //fix this in future to handle any type of item
  loading: boolean;
  title: string;
}

const Carousel = ({ items, loading, title }: ICarouselProps) => {
  const [sliderIndex, setSliderIndex] = useState(0);
  const [progressIndex, setProgressIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [width, setWidth] = useState<number>(() => window.innerWidth);
  const [itemsPerScreen, setItemsPerScreen] = useState(4);

  useEffect(() => {
    const handleResize = () => {
      setTimeout(() => setWidth(window.innerWidth), 200);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    let items;
    if (width >= screenWidths.xl) {
      items = 4;
    } else if (width >= screenWidths.lg) {
      items = 3;
    } else {
      items = 2;
    }
    setItemsPerScreen(items);
  }, [width]);

  const IMAGE_COUNT = items.length;
  const lastPossibleIndex = IMAGE_COUNT - 1;
  const PROGRESS_COUNT = Math.ceil(IMAGE_COUNT / itemsPerScreen);
  const lastProgressIndex = PROGRESS_COUNT - 1;

  const handleNext = () => {
    setSliderIndex((prev) => {
      const newIndex = prev + itemsPerScreen;
      const newProgressIndex =
        newIndex > lastPossibleIndex
          ? 0
          : Math.floor(newIndex / itemsPerScreen);
      setProgressIndex(newProgressIndex);
      return newIndex > lastPossibleIndex ? 0 : newIndex;
    });
  };

  const handlePrev = () => {
    setSliderIndex((prev) => {
      const newIndex = prev - itemsPerScreen;
      const newProgressIndex =
        newIndex < 0
          ? lastProgressIndex
          : Math.floor(newIndex / itemsPerScreen);
      setProgressIndex(newProgressIndex);
      return newIndex < 0
        ? lastPossibleIndex - (lastPossibleIndex % itemsPerScreen)
        : newIndex;
    });
  };

  const handleMouseEnter = () => !isHovered && setIsHovered(true);
  const handleMouseLeave = () => isHovered && setIsHovered(false);

  return (
    <div>
      <div className="flex justify-between items-center py-2 px-8">
        <h3 className="text-2xl text-gray-800 font-semibold">{title}</h3>
        {!loading && (
          <div className="flex gap-1">
            {Array.from({ length: PROGRESS_COUNT }, (_, i) => (
              <div
                key={i}
                className={`w-6 h-2 ${
                  i === progressIndex ? "bg-black" : "bg-black/30"
                }`}
              ></div>
            ))}
          </div>
        )}
      </div>
      <div
        className="flex justify-center overflow-hidden relative"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {isHovered && (
          <Button
            className="rounded-tl-none rounded-bl-none absolute left-1 top-1/2 -translate-y-1/2 bg-gray-800 bg-opacity-50 text-white h-[90%] z-10 hover:bg-opacity-80 hover:bg-gray-800"
            onClick={handlePrev}
          >
            <ChevronLeft size={48} />
          </Button>
        )}
        {loading ? (
          <div className="flex items-center justify-center w-full h-[250px]">
            <LoadingSpinner />
          </div>
        ) : (
          <div
            className="flex transition-transform ease-in-out duration-250"
            style={{
              transform: `translateX(calc(${sliderIndex} * -100% / ${itemsPerScreen}))`,
            }}
          >
            {items.map((src, index) => (
              <div
                key={index}
                className="flex-shrink-0 flex items-center justify-center"
                style={{
                  width: `${100 / itemsPerScreen}%`,
                  aspectRatio: "16/9",
                }}
              >
                <GameItem game={src} view="carousel" />
              </div>
            ))}
          </div>
        )}
        {isHovered && (
          <Button
            className="rounded-tr-none rounded-br-none absolute right-1 top-1/2 -translate-y-1/2 bg-gray-800 bg-opacity-50 text-white h-[90%] z-10 hover:bg-opacity-80 hover:bg-gray-800"
            onClick={handleNext}
          >
            <ChevronRight size={48} />
          </Button>
        )}
      </div>
    </div>
  );
};

export default Carousel;
