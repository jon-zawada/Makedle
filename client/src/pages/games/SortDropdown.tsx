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
import { SelectOptions } from "../../pages/create/constants";
import { Filters } from "./FilterComponent";

interface MultiSelectDropdownProps {
  options: SelectOptions[];
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
}

const MultiSelectDropdown = ({
  options,
  setFilters,
}: MultiSelectDropdownProps) => {
  const [displayName, setDisplayName] = useState<string>("");

  const handleChange = (event: SelectChangeEvent<string>) => {
    const { value } = event.target;
    setDisplayName(value);
    const newSort = options.find((option) => option.content === value)?.value;
    setFilters((prev: Filters) => ({ ...prev, sortBy: newSort }));
  };

  return (
    <FormControl
      sx={{ m: 1, width: 150, background: "white" }}
      size="small"
      variant="outlined"
    >
      <InputLabel id="sort-select">Sort</InputLabel>
      <Select
        labelId="sort-select"
        value={displayName}
        onChange={handleChange}
        input={<OutlinedInput label="Sort" />}
        renderValue={(selected) => selected}
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
        {options.map((option) => (
          <MenuItem key={option.content} value={option.content}>
            <Checkbox checked={displayName === option.content} />
            <ListItemText primary={option.content} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default MultiSelectDropdown;
