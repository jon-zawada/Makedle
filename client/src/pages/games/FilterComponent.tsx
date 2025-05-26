import React from "react";
import { categoryOptions, sortOptions } from "../create/constants";
import SearchInput from "../../components/common/SearchInput";
import MultiSelectDropdown from "../../components/common/MultiSelect";
import SortDropdown from "./SortDropdown";

export type Filters = {
  categories: string[],
  keyword: string,
  sortBy: string | undefined;
}
interface IFilterComponentProps {
  setFilters: React.Dispatch<React.SetStateAction<Filters>>
}

export default function FilterComponent({ setFilters }: IFilterComponentProps) {
  return (
    <div className="mb-8 flex justify-center items-center gap-4">
      <SearchInput setFilters={setFilters} />
      <MultiSelectDropdown options={categoryOptions} setFilters={setFilters} />
      <SortDropdown options={sortOptions} setFilters={setFilters} />
    </div>
  );
}
