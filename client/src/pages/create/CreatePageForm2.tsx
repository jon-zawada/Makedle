import React, { useMemo } from "react";
import { ChevronDown } from "lucide-react";
import { categoryOptions } from "./constants";

interface ICreatePageForm2Props {
  category: string;
  changeHandler: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

export default function CreatePageForm2({
  category,
  changeHandler,
}: ICreatePageForm2Props) {
  const sortedOptions = useMemo(
    () => categoryOptions.sort((a, b) => a.content.localeCompare(b.content)),
    [categoryOptions]
  );

  return (
    <form className="flex flex-col gap-4 p-2">
      <div className="relative flex flex-col">
        <label htmlFor="category">Category</label>
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
    </form>
  );
}
