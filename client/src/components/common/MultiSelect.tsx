import React, { useState } from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  ListItemText,
  OutlinedInput,
} from "@mui/material";
import { SelectChangeEvent } from "@mui/material/Select";
import { categoryOptions, SelectOptions } from "../../pages/create/constants";
import { Filters } from "../../pages/games/FilterComponent";

interface MultiSelectDropdownProps {
  options: SelectOptions[];
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
}

const MultiSelectDropdown = ({
  options,
  setFilters,
}: MultiSelectDropdownProps) => {
  const [displayName, setDisplayName] = useState<string[]>([]);

  const allDisplayNames = options.map((option) => option.content);

  const handleChange = (event: SelectChangeEvent<string[]>) => {
    const { value } = event.target;
    const arrayValue = typeof value === "string" ? value.split(",") : value;

    if (arrayValue.includes("Select All")) {
      const isAllSelected = displayName.length === allDisplayNames.length;
      const newDisplayNames = isAllSelected ? [] : allDisplayNames;
      setDisplayName(newDisplayNames);

      const newCategories = (isAllSelected ? [] : allDisplayNames)
        .map(
          (contentValue) =>
            categoryOptions.find((option) => option.content === contentValue)
              ?.value,
        )
        .filter((val): val is string => typeof val === "string");

      setFilters((prev: Filters) => ({ ...prev, categories: newCategories }));
    } else {
      setDisplayName(arrayValue);

      const newCategories = arrayValue
        .map(
          (contentValue: string) =>
            categoryOptions.find((option) => option.content === contentValue)
              ?.value,
        )
        .filter((val): val is string => typeof val === "string");

      setFilters((prev: Filters) => ({ ...prev, categories: newCategories }));
    }
  };

  return (
    <FormControl
      sx={{ m: 1, width: 150, background: "white" }}
      size="small"
      variant="outlined"
    >
      <InputLabel id="multi-select-label">Categories</InputLabel>
      <Select
        labelId="multi-select-label"
        multiple
        value={displayName}
        onChange={handleChange}
        input={<OutlinedInput label="Categories" />}
        renderValue={(selected) => selected.join(", ")}
        MenuProps={{
          PaperProps: {
            style: {
              maxHeight: 300,
            },
          },
          MenuListProps: {
            autoFocusItem: false,
          },
        }}
      >
        <MenuItem value="Select All">
          <Checkbox
            checked={displayName.length === allDisplayNames.length}
            indeterminate={
              displayName.length > 0 &&
              displayName.length < allDisplayNames.length
            }
          />
          <ListItemText primary="Select All" />
        </MenuItem>
        <hr />
        {options.map((option) => (
          <MenuItem key={option.content} value={option.content}>
            <Checkbox checked={displayName.indexOf(option.content) > -1} />
            <ListItemText primary={option.content} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default MultiSelectDropdown;
