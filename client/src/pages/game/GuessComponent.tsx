import React from "react";
import { Word } from "./GamePage";
import AnimatedRow from "./AnimatedRow";

interface IGuessComponentProps {
  guesses: Word[];
  headers: string[];
  wordOfDay: Word | null;
  primaryColor: string;
  secondaryColor: string;
  tertiaryColor: string;
}

export default function GuessComponent({
  guesses,
  headers,
  wordOfDay,
  primaryColor,
  secondaryColor,
  tertiaryColor,
}: IGuessComponentProps) {
  return (
    <table className="table-fixed border-separate border-spacing-x-2 border-spacing-y-2">
      <thead>
        <tr>
          {headers.map((header: string) => (
            <th
              key={header}
              className="underline w-12 text-sm text-center px-2"
            >
              {/* fix the key here */}
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {guesses.map((guess: Word, index: number) => (
          <AnimatedRow
            key={index}
            guess={guess}
            wordOfDay={wordOfDay}
            primaryColor={primaryColor}
            secondaryColor={secondaryColor}
            tertiaryColor={tertiaryColor}
          />
        ))}
      </tbody>
    </table>
  );
}
