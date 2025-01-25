import React, { useState, useEffect } from "react";
import _isEmpty from "lodash/isEmpty";
import { Word, WordData } from "./GamePage";
import { ArrowDown, ArrowUp } from "lucide-react";

interface IWorldeAnimationProps {
  guess: Word;
  wordOfDay: Word | null;
  primaryColor: string;
  secondaryColor: string;
  tertiaryColor: string;
}

const AnimatedRow = ({
  guess,
  wordOfDay,
  primaryColor,
  secondaryColor,
  tertiaryColor,
}: IWorldeAnimationProps) => {
  const [flipped, setFlipped] = useState(
    Array(guess.word_data.length).fill(false)
  );

  useEffect(() => {
    flipped.forEach((_, index) => {
      setTimeout(() => {
        handleFlip(index);
      }, index * 500); // Stagger the animation by 500ms
    });
  }, []);

  const handleFlip = (index: number) => {
    setFlipped((prev) => {
      prev[index] = true;
      return [...prev];
    });
  };

  const compareToWordOfDay = (word: Word, index: number) => {
    let color;
    let numberHint;
    if (wordOfDay) {
      const { word_data } = word;
      const wordOfDay_data = wordOfDay.word_data;
      const arr1 = word_data[index].value.split(",").map((item) => item.trim());
      const arr2 = wordOfDay_data[index].value
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

  const renderContent = (word: WordData, numberHint: string | undefined) => {
    return (
      <>
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
        <span className="relative text-white font-semibold">
          {renderCell(word.value)}
        </span>
      </>
    );
  };

  return (
    <tr>
      {guess.word_data.map((word, index) => {
        const { color, numberHint } = compareToWordOfDay(guess, index);
        const startColor = "#D1D5DB";
        const midColor = "#D1D5DB";
        const endColor = color;

        return (
          <td
            key={index}
            style={
              {
                "--start-color": startColor,
                "--mid-color": midColor,
                "--end-color": endColor,
                "--text-opacity": flipped[index] ? "1" : "0",
              } as React.CSSProperties
            }
            className={`w-24 h-24 text-center p-2 relative ${
              flipped[index] ? "animate-flip" : ""
            }`}
          >
            <span
              className="relative text-white font-semibold"
              style={{
                opacity: "var(--text-opacity)",
                transition: "opacity 0.2s ease",
              }}
            >
              {renderContent(word, numberHint)}
            </span>
          </td>
        );
      })}
    </tr>
  );
};

export default AnimatedRow;
