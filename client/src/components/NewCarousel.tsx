import React, { useState } from "react";
import Button from "./common/Button";
import { ChevronLeft, ChevronRight } from "lucide-react";

const SliderComponent = () => {
  const [sliderIndex, setSliderIndex] = useState(0);
  const [progressIndex, setProgressIndex] = useState(0);

  //TODO rework to be based on props
  const ITEMS_PER_SCREEN = 4;
  const IMAGE_COUNT = 10;
  const lastPossibleIndex = IMAGE_COUNT - 1;
  const PROGRESS_COUNT = Math.ceil(IMAGE_COUNT / ITEMS_PER_SCREEN);
  const lastProgressIndex = PROGRESS_COUNT - 1;

  const images = Array.from(
    { length: IMAGE_COUNT },
    (_, i) => `https://placehold.co/600x400?text=${i + 1}`
  );

  const handleNext = () => {
    setSliderIndex((prev) => {
      const newIndex = prev + ITEMS_PER_SCREEN;
      const newProgressIndex =
        newIndex > lastPossibleIndex
          ? 0
          : Math.floor(newIndex / ITEMS_PER_SCREEN);
      setProgressIndex(newProgressIndex);
      return newIndex > lastPossibleIndex ? 0 : newIndex;
    });
  };

  const handlePrev = () => {
    setSliderIndex((prev) => {
      const newIndex = prev - ITEMS_PER_SCREEN;
      const newProgressIndex =
        newIndex < 0
          ? lastProgressIndex
          : Math.floor(newIndex / ITEMS_PER_SCREEN);
      setProgressIndex(newProgressIndex);
      return newIndex < 0
        ? lastPossibleIndex - (lastPossibleIndex % ITEMS_PER_SCREEN)
        : newIndex;
    });
  };

  return (
    <div>
      <div className="flex justify-between items-center py-2 px-8">
        <h3 className="text-2xl font-bold">Title</h3>{" "}
        {/* make based on props */}
        <div className="flex gap-1">
          {Array.from({ length: PROGRESS_COUNT }, (_, i) => (
            <div
              key={i}
              className={`w-6 h-2 ${
                i === progressIndex ? "bg-black" : "bg-black/50"
              }`}
            ></div>
          ))}
        </div>
      </div>
      <div className="flex justify-center overflow-hidden relative">
        <Button
          className="absolute left-1 top-1/2 -translate-y-1/2 rounded-none bg-gray-800 bg-opacity-30 text-white p-3 h-[100%] z-10 hover:bg-opacity-70 hover:bg-gray-800"
          onClick={handlePrev}
        >
          <ChevronLeft />
        </Button>

        <div
          className="flex transition-transform ease-in-out duration-250"
          style={{
            transform: `translateX(calc(${sliderIndex} * -100% / ${ITEMS_PER_SCREEN}))`,
          }}
        >
          {images.map((src, index) => (
            <img
              key={index}
              src={src}
              alt={`Slide ${index + 1}`}
              className="flex-shrink-0 w-1/4 max-w-1/4 aspect-video rounded-lg" //Look here when debugging image size pls
            />
          ))}
        </div>

        <Button
          className="absolute right-1 top-1/2 -translate-y-1/2 rounded-none bg-gray-800 bg-opacity-30 text-white p-3 h-[100%] z-10 hover:bg-opacity-70 hover:bg-gray-800"
          onClick={handleNext}
        >
          <ChevronRight />
        </Button>
      </div>
    </div>
  );
};

export default SliderComponent;
