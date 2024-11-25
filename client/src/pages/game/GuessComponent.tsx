import React from "react";

interface IGuessComponentProps {
  guesses: string[];
  primaryColor: string;
  secondaryColor: string;
  tertiaryColor: string;
}

export default function GuessComponent({ guesses, primaryColor, secondaryColor, tertiaryColor }: IGuessComponentProps) {
  // HARD CODED FOR DISPLAY RIGHT NOW
  return (
    <table className="min-w-full table-auto border-collapse w-[750px]">
      <thead className="bg-gray-100">
        <tr>
          <th className="px-4 py-2 border-b text-left">Name</th>
          <th className="px-4 py-2 border-b text-left">Gender</th>
          <th className="px-4 py-2 border-b text-left">Major</th>
          <th className="px-4 py-2 border-b text-left">Birth Year</th>
          <th className="px-4 py-2 border-b text-left">Home State</th>
        </tr>
      </thead>
      <tbody>
        {guesses
          .map((guess: string, index: number) => (
            <tr key={index} className="hover:bg-gray-50">
              <td style={{backgroundColor: primaryColor}} className="px-4 py-2 border-b">{guess}</td>
              <td className="px-4 py-2 border-b">{"some gender"}</td>
              <td style={{backgroundColor: secondaryColor}} className="px-4 py-2 border-b">{"some major"}</td>
              <td className="px-4 py-2 border-b">{"some year"}</td>
              <td style={{backgroundColor: tertiaryColor}} className="px-4 py-2 border-b">{"some state"}</td>
            </tr>
          ))
          .reverse()}
      </tbody>
    </table>
  );
}
