import React from "react";

interface IWorldGridProps {
  primaryColor: string;
  secondaryColor: string;
  tertiaryColor: string;
}

export default function WordleGrid({
  primaryColor = "#6AAA63",
  secondaryColor = "#C9B458",
  tertiaryColor = "#FF0000",
}: IWorldGridProps) {
  return (
    <div className="flex justify-center">
      <div className="grid grid-cols-3 grid-rows-3 gap-0">
        <div className="w-16 h-16 border-2 border-black rounded-tl-md flex items-center justify-center" />
        <div className="w-16 h-16 border-2 border-black flex items-center justify-center" />
        <div
          style={{ backgroundColor: tertiaryColor }}
          className="w-16 h-16 border-2 border-black rounded-tr-md flex items-center justify-center"
        />
        <div className="w-16 h-16 border-2 border-black flex items-center justify-center" />
        <div
          style={{ backgroundColor: secondaryColor }}
          className="w-16 h-16 border-2 border-black flex items-center justify-center"
        />
        <div
          style={{ backgroundColor: primaryColor }}
          className="w-16 h-16 border-2 border-black flex items-center justify-center"
        />
        <div
          style={{ backgroundColor: primaryColor }}
          className="w-16 h-16 border-2 border-black rounded-bl-md flex items-center justify-center"
        />
        <div
          style={{ backgroundColor: primaryColor }}
          className="w-16 h-16 border-2 border-black flex items-center justify-center"
        />
        <div
          style={{ backgroundColor: primaryColor }}
          className="w-16 h-16 border-2 border-black rounded-br-md flex items-center justify-center"
        />
      </div>
    </div>
  );
}
