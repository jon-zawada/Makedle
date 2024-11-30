import React from "react";
import { Word, WordData } from "./GamePage";

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
    //TODO improve this function for partial correct answers
    if (correct) {
      const { word_data } = word;
      const correct_word_data = correct.word_data;
      if (word_data[index].value === correct_word_data[index].value) {
        return true;
      }
    }
    return false;
  };

  const renderCell = (cellValue: string) => {
    const urlRegex = /(https?:\/\/[^\s]+)/;

    if (urlRegex.test(cellValue)) {
      return (
        <img src={cellValue} alt="Cell content" className="max-w-full h-auto" />
      );
    }
    return cellValue;
  };

  return (
    <table className="min-w-full table-auto border-collapse w-[750px]">
      <thead className="bg-gray-100">
        <tr>
          {headers.map((header: string) => (
            <th key={header} className="px-4 py-2 border-b text-left">
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
                  backgroundColor: compareToCorrect(guess, index)
                    ? primaryColor
                    : tertiaryColor,
                }}
                className="px-4 py-2 border-b"
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
