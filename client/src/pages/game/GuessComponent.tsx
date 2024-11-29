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
  // HARD CODED FOR DISPLAY RIGHT NOW

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
            <th key={header} className="px-4 py-2 border-b text-left">  {/* fix the key here */}
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
              {/* <td style={{backgroundColor: primaryColor}} className="px-4 py-2 border-b">{guess}</td>
              <td className="px-4 py-2 border-b">{"some gender"}</td>
              <td style={{backgroundColor: secondaryColor}} className="px-4 py-2 border-b">{"some major"}</td>
              <td className="px-4 py-2 border-b">{"some year"}</td>
              <td style={{backgroundColor: tertiaryColor}} className="px-4 py-2 border-b">{"some state"}</td> */}
            </tr>
          ))
          .reverse()}
      </tbody>
    </table>
  );
}

// const html = (
//   <td
//   key={index}
//   className={`px-4 py-2 border-b opacity-0 animate-fadeIn`}
//   style={{
//     animationDelay: `${(index + 1) * 100}ms`, // Dynamic delay based on column index
//   }}
// ></td>)

{
  /* <td style={{animationDelay: `${(index + 1) * 100}ms`, backgroundColor: primaryColor}} className="px-4 py-2 border-b opacity-0 animate-fadeIn">{guess}</td>
              <td style={{animationDelay: `${(index + 2) * 100}ms`}}className="px-4 py-2 border-b opacity-0 animate-fadeIn">{"some gender"}</td>
              <td style={{animationDelay: `${(index + 3) * 100}ms`, backgroundColor: secondaryColor}} className="px-4 py-2 border-b opacity-0 animate-fadeIn">{"some major"}</td>
              <td style={{animationDelay: `${(index + 4) * 100}ms`, backgroundColor: secondaryColor}} className="px-4 py-2 border-b opacity-0 animate-fadeIn">{"some year"}</td>
              <td style={{animationDelay: `${(index + 5) * 100}ms`, backgroundColor: tertiaryColor}} className="px-4 py-2 border-b opacity-0 animate-fadeIn">{"some state"}</td> */
}
