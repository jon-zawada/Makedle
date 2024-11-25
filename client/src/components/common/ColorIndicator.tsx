import React from "react";

interface IColorIndicatorProps {
  primaryColor: string;
  secondaryColor: string;
  tertiaryColor: string;
  editable?: boolean;
  changeHandler?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function ColorIndicator({
  primaryColor,
  secondaryColor,
  tertiaryColor,
  editable = false,
  changeHandler,
}: IColorIndicatorProps) {
  return (
    <div className="flex flex-col gap-4 border p-4 rounded-md w-[255px]">
      <div className="text-center">
        {editable ? "Choose Color Indicators" : "Color Indicators"}
      </div>
      <div className="flex items-center justify-center gap-4">
        <div className="flex flex-col items-center w-16 flex-none">
          <div
            style={{ backgroundColor: primaryColor }}
            className="w-8 h-8 relative"
          >
            {editable && (
              <input
                type="color"
                id="primaryColor"
                name="primaryColor"
                value={primaryColor}
                onChange={changeHandler}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
            )}
          </div>
          <div className="text-sm">Correct</div>
        </div>
        <div className="flex flex-col items-center w-16 flex-none">
          <div
            style={{ backgroundColor: secondaryColor }}
            className="w-8 h-8 relative"
          >
            {editable && (
              <input
                type="color"
                id="secondaryColor"
                name="secondaryColor"
                value={secondaryColor}
                onChange={changeHandler}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
            )}
          </div>
          <div className="text-sm">Partial</div>
        </div>
        <div className="flex flex-col items-center w-16 flex-none">
          <div
            style={{ backgroundColor: tertiaryColor }}
            className="w-8 h-8 relative"
          >
            {editable && (
              <input
                type="color"
                id="tertiaryColor"
                name="tertiaryColor"
                value={tertiaryColor}
                onChange={changeHandler}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
            )}
          </div>
          <div className="text-sm">Incorrect</div>
        </div>
      </div>
    </div>
  );
}
