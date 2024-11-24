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
  const white = "#FFFFFF";
  const colors = [
    { color: white, rounded: "rounded-tl-md" },
    { color: white, rounded: "" },
    { color: tertiaryColor, rounded: "rounded-tr-md" },
    { color: white, rounded: "" },
    { color: secondaryColor, rounded: "" },
    { color: primaryColor, rounded: "" },
    { color: primaryColor, rounded: "rounded-bl-md" },
    { color: primaryColor, rounded: "" },
    { color: primaryColor, rounded: "rounded-br-md" },
  ];

  return (
    <div className="flex justify-center">
      <div className="grid grid-cols-3 grid-rows-3 gap-0">
        {colors.map((item, index) => (
          <div
            key={index}
            className={`w-16 h-16 border-2 border-black flex items-center justify-center ${item.rounded}`}
            style={{ backgroundColor: item.color }}
          />
        ))}
      </div>
    </div>
  );
}
