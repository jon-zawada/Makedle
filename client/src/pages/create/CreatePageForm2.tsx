import React, { useMemo, useState } from "react";
import { ChevronDown } from "lucide-react";

// interface ICreatePageForm2Props {

// }

export default function CreatePageForm2() {
  const [selectedValue, setSelectedValue] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedValue(event.target.value);
    console.log("Selected value:", event.target.value);
  };

  const options = [
    { value: "sports", content: "Sports" },
    { value: "geography", content: "Geography" },
    { value: "music", content: "Music" },
    { value: "movies", content: "Movies" },
    { value: "fun", content: "Just for Fun" },
    { value: "miscellanous", content: "Miscellanous" },
    { value: "history", content: "History" },
    { value: "literature", content: "Literature" },
    { value: "language", content: "Language" },
    { value: "science", content: "Science" },
    { value: "gaming", content: "Gaming" },
    { value: "entertainment", content: "Entertainment" },
    { value: "religion", content: "Religion" },
    { value: "holiday", content: "Holiday" },
  ];

  const sortedOptions = useMemo(
    () => options.sort((a, b) => a.content.localeCompare(b.content)),
    [options]
  );

  return (
    <form className="flex flex-col gap-4 p-2">
      <div className="relative flex flex-col">
        <label htmlFor="category">Category</label>
        <select
          name="category"
          id="category"
          className="px-4 py-2 border rounded appearance-none pr-8 hover:cursor-pointer"
          value={selectedValue}
          onChange={handleChange}
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
