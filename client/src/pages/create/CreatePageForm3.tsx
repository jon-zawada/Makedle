import React from "react";
import WordleGrid from "../../components/common/WordleGrid";
import ColorIndicator from "../../components/common/ColorIndicator";

interface ICreatePageForm3Props {
  primaryColor: string;
  secondaryColor: string;
  tertiaryColor: string;
  changeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function CreatePageForm3({
  primaryColor,
  secondaryColor,
  tertiaryColor,
  changeHandler,
}: ICreatePageForm3Props) {
  return (
    <div className="flex flex-col gap-4 p-2">
      <WordleGrid
        primaryColor={primaryColor}
        secondaryColor={secondaryColor}
        tertiaryColor={tertiaryColor}
      />
      <ColorIndicator
        editable
        changeHandler={changeHandler}
        primaryColor={primaryColor}
        secondaryColor={secondaryColor}
        tertiaryColor={tertiaryColor}
      />
    </div>
  );
}
