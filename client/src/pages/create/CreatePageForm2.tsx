import React, { useMemo } from "react";
import { ChevronDown, Book, Lock } from "lucide-react";
import RadioButton from "../../components/common/RadioButton";
import { categoryOptions } from "./constants";

interface ICreatePageForm2Props {
  category: string;
  isPrivate: boolean;
  changeHandler: (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>,
  ) => void;
}

export default function CreatePageForm2({
  category,
  isPrivate,
  changeHandler,
}: ICreatePageForm2Props) {
  const sortedOptions = useMemo(
    () => categoryOptions.sort((a, b) => a.content.localeCompare(b.content)),
    [categoryOptions],
  );

  return (
    <form className="flex flex-col gap-4 p-2">
      <div className="relative flex flex-col">
        <label className="font-semibold" htmlFor="category">
          Category
        </label>
        <select
          name="category"
          id="category"
          className="px-4 py-2 border rounded appearance-none pr-8 hover:cursor-pointer"
          value={category}
          onChange={changeHandler}
        >
          <option value="" disabled>
            ---
          </option>
          {sortedOptions.map((option, index) => (
            <option key={index} value={option.value}>
              {option.content}
            </option>
          ))}
        </select>
        <span className="absolute top-[70%] right-4 transform -translate-y-1/2 pointer-events-none">
          <ChevronDown />
        </span>
      </div>
      <div className="flex flex-col items-start">
        <RadioButton
          checked={isPrivate === false}
          label="Public"
          value="false"
          name="isPrivate"
          description="Anyone on the internet can see this game"
          Icon={Book}
          changeHandler={changeHandler}
        />
        <RadioButton
          checked={isPrivate === true}
          label="Private"
          value="true"
          name="isPrivate"
          description="You choose who can see and play this game"
          Icon={Lock}
          changeHandler={changeHandler}
        />
      </div>
    </form>
  );
}
