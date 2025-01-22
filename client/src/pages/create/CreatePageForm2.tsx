import React, { useState, useMemo } from "react";
import { ChevronDown, Book, Lock } from "lucide-react";
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

  const [privacy, setPrivacy] = useState("public");

  const handlePrivacyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPrivacy(event.target.value);
  };

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
        <label className="flex items-center cursor-pointer">
          <input
            type="radio"
            name="privacy"
            value="public"
            checked={privacy === "public"}
            onChange={handlePrivacyChange}
            className="hidden"
          />
          <div
            className={`flex items-center justify-center w-5 h-5 border-2 rounded-full transition-all delay-400 mr-2 ${
              privacy === "public" ? "border-green-500" : "border-gray-400"
            }`}
          >
            {privacy === "public" && (
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            )}
          </div>
          <div className="flex items-center gap-1">
            <Book color="#9CA3AF" size={32} />
            <div>
              <div>Public</div>
              <div className="text-sm text-gray-400">
                Anyone on the internet can see this game
              </div>
            </div>
          </div>
        </label>
        <label className="flex items-center cursor-pointer">
          <input
            type="radio"
            name="privacy"
            value="private"
            checked={privacy === "private"}
            onChange={handlePrivacyChange}
            className="hidden"
          />
          <div
            className={`flex items-center justify-center w-5 h-5 border-2 rounded-full transition-all delay-400 mr-2 ${
              privacy === "private" ? "border-green-500" : "border-gray-400"
            }`}
          >
            {privacy === "private" && (
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            )}
          </div>
          <div className="flex items-center gap-1">
            <Lock color="#9CA3AF" size={32} />
            <div>
              <div>Private</div>
              <div className="text-sm text-gray-400">
                You choose who can see and play this game
              </div>
            </div>
          </div>
        </label>
      </div>
    </form>
  );
}
