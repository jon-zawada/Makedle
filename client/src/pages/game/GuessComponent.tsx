import React from "react";
import { Word, WordData } from "./GamePage";
import _isEmpty from "lodash/isEmpty";
import { ArrowUp, ArrowDown } from "lucide-react";

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
    let color;
    let numberHint;
    if (correct) {
      const { word_data } = word;
      const correct_word_data = correct.word_data;
      const arr1 = word_data[index].value.split(",").map((item) => item.trim());
      const arr2 = correct_word_data[index].value
        .split(",")
        .map((item) => item.trim());

      const areNumbers = (array: string[]) =>
        array.every((item) => !isNaN(Number(item)));

      const isNumericComparison = areNumbers(arr1) && areNumbers(arr2);

      if (isNumericComparison) {
        const num1 = arr1.map(Number);
        const num2 = arr2.map(Number);

        if (
          num1.length === num2.length &&
          num1.every((n, i) => n === num2[i])
        ) {
          color = primaryColor;
        } else if (num1.some((n, i) => n > num2[i])) {
          numberHint = "lower";
        } else if (num1.some((n, i) => n < num2[i])) {
          numberHint = "higher";
        }
      }

      const matches = arr1.filter((word) => arr2.includes(word));

      if (matches.length === 0) {
        color = tertiaryColor;
      } else if (
        matches.length === arr1.length &&
        matches.length === arr2.length
      ) {
        color = primaryColor;
      } else {
        color = secondaryColor;
      }
    }
    return { color, numberHint };
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
            {guess.word_data.map((cell: WordData, index: number) => {
              const { color, numberHint } = compareToCorrect(guess, index);
              return (
                <td
                  key={index}
                  style={{
                    backgroundColor: color,
                  }}
                  className="rounded-xl w-12 h-20 border text-center p-2 relative"
                >
                  {numberHint === "higher" && (
                    <ArrowUp
                      size={100}
                      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-gray-500 opacity-15"
                    />
                  )}
                  {numberHint === "lower" && (
                    <ArrowDown
                      size={100}
                      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-gray-500 opacity-15"
                    />
                  )}
                  <span className="relative">{renderCell(cell.value)}</span>
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
