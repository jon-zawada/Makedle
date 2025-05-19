import React, { useState } from 'react';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  ListItemText,
  OutlinedInput,
} from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';


// const options = ['Apple', 'Banana', 'Cherry', 'Date'];
interface MultiSelectDropdownProps {
  options: [];
}

const MultiSelectDropdown = ({options}: MultiSelectDropdownProps) => {
  const [selected, setSelected] = useState<string[]>([]);

  const handleChange = (event: SelectChangeEvent<string[]>) => {
    const value = event.target.value;
    setSelected(typeof value === 'string' ? value.split(',') : value);
  };

  return (
    <FormControl
      sx={{ m: 1, width: 150, background: "white" }}
      size="small"
      variant="outlined"
    >
      <InputLabel id="multi-select-label">Fruits</InputLabel>
      <Select
        labelId="multi-select-label"
        multiple
        value={selected}
        onChange={handleChange}
        input={<OutlinedInput label="Fruits" />}
        renderValue={(selected) => selected.join(', ')}
      >
        {options.map((name) => (
          <MenuItem key={name} value={name}>
            <Checkbox checked={selected.indexOf(name) > -1} />
            <ListItemText primary={name} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default MultiSelectDropdown;
