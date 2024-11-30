import React from "react";
import { Word, WordData } from "./GamePage";
import _isEmpty from "lodash/isEmpty";

interface IGuessComponentProps {
  guesses: Word[];
  headers: string[];
  correct: Word | null;
  primaryColor: string;
  secondaryColor: string;
  tertiaryColor: string;
}

export default function GuessComponent({
  guesses,
  headers,
  correct,
  primaryColor,
  secondaryColor,
  tertiaryColor,
}: IGuessComponentProps) {
  const compareToCorrect = (word: Word, index: number) => {
    if (correct) {
      const { word_data } = word;
      const correct_word_data = correct.word_data;
      const arr1 = word_data[index].value.split(",").map((item) => item.trim());
      const arr2 = correct_word_data[index].value
        .split(",")
        .map((item) => item.trim());

      const matches = arr1.filter((word) => arr2.includes(word));

      if (matches.length === 0) {
        return tertiaryColor;
      } else if (
        matches.length === arr1.length &&
        matches.length === arr2.length
      ) {
        return primaryColor;
      } else {
        return secondaryColor;
      }
    }
  };

  const renderCell = (cellValue: string) => {
    const urlRegex = /(https?:\/\/[^\s]+)/;
    const normalizeCommas = (str: string) =>
      str.includes(",")
        ? str.replace(/,([^ ])/g, ", $1") // Add a space after commas without one
        : str;

    if (_isEmpty(cellValue)) {
      return "None";
    } else if (urlRegex.test(cellValue)) {
      return (
        <img src={cellValue} alt="Cell content" className="max-w-full h-auto" />
      );
    }
    return normalizeCommas(cellValue);
  };

  return (
    <table className="border-separate table-fixed w-full">
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
          <tr key={index}>
            {guess.word_data.map((cell: WordData, index: number) => (
              <td
                key={index}
                style={{
                  backgroundColor: compareToCorrect(guess, index),
                }}
                className="rounded-xl w-12 h-20  border text-center p-2"
              >
                {renderCell(cell.value)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
