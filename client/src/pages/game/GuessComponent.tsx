import React from "react";
import { Word, WordData } from "./GamePage";

interface IGuessComponentProps {
  guesses: Word[];
  headers: string[];
  primaryColor: string;
  secondaryColor: string;
  tertiaryColor: string;
}

export default function GuessComponent({
  guesses,
  headers,
  primaryColor,
  secondaryColor,
  tertiaryColor,
}: IGuessComponentProps) {
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
              {" "}
              {/* fix the key here */}
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {guesses
          .map((guess: Word, index: number) => (
            <tr key={index} className="hover:bg-gray-50">
              {guess.word_data.map((cell: WordData, index: number) => (
                <td
                  key={index}
                  style={{ backgroundColor: secondaryColor }}
                  className="px-4 py-2 border-b"
                >
                  {renderCell(cell.value)}
                </td>
              ))}
            </tr>
          ))
          .reverse()}
      </tbody>
    </table>
  );
}
