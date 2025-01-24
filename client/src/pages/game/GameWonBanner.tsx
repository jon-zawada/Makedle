import React from "react";
import _isEmpty from "lodash/isEmpty";
import { Word } from "./GamePage";
import Button from "../../components/common/Button";
import TimeCountDown from "./TimeCountdown";

interface IGameWonBannerProps {
  wordOfDay: Word | null;
  guessCount: number;
  reset: () => void;
}

export default function GameWonBanner({
  wordOfDay,
  guessCount,
  reset,
}: IGameWonBannerProps) {
  const wordOfDayName =
    wordOfDay &&
    wordOfDay.word_data.find((header) => header.header_name === "Name")?.value;
  return (
    <div className="border p-4 rounded-md w-[450px] h-[650px] bg-green-100 flex flex-col gap-4 items-center justify-center">
      <h3 className="text-3xl">We Have a Winner!</h3>
      {!_isEmpty(wordOfDayName) && (
        <div>
          You guessed: <span className="text-green-500">{wordOfDayName}</span>
        </div>
      )}
      {!_isEmpty(wordOfDayName) && (
        <div>
          Number of guesses:{" "}
          <span className="text-green-500">{guessCount}</span>
        </div>
      )}
      <TimeCountDown />
      <Button onClick={reset}>Play again</Button>
    </div>
  );
}
