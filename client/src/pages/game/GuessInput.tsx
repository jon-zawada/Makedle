import React, { useState } from "react";
import { Box, Button, TextField, Autocomplete } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

interface GuessInputProps {
  guess: string;
  options: string[];
  onGuessChange: (input: string) => void;
  onGuessSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  isDisabled: boolean;
}

const GuessInput = ({
  guess,
  options,
  onGuessChange,
  onGuessSubmit,
  isDisabled,
}: GuessInputProps) => {
  const [open, setOpen] = useState(false);

  const handleInputChange = (_: React.SyntheticEvent, newValue: string) => {
    onGuessChange(newValue);
    setOpen(newValue.length > 0 && options.length > 0);
  };

  const handleOptionSelect = (_: React.SyntheticEvent, value: string | null) => {
    if (value) {
      onGuessChange(value);
      setOpen(false);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={(e) => {
        setOpen(false);
        onGuessSubmit(e);
      }}
      sx={{
        minWidth: "250px",
        display: "flex",
        alignItems: "center",
      }}
    >
      <Autocomplete
        freeSolo
        open={open}
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
        options={options}
        inputValue={guess}
        onInputChange={handleInputChange}
        onChange={handleOptionSelect}
        sx={{
          flex: 1,
          "& .MuiOutlinedInput-root": {
            borderTopRightRadius: 0,
            borderBottomRightRadius: 0,
          },
          backgroundColor: "white",
        }}
        renderInput={(params) => <TextField {...params} size="small" />}
      />
      <Button
        type="submit"
        size="small"
        disabled={!guess.length || isDisabled}
        sx={{
          color: "rgba(0, 0, 0, 0.87)",
          backgroundColor: "rgba(0, 0, 0, 0.23)",
          border: "none",
          borderTopLeftRadius: 0,
          borderBottomLeftRadius: 0,
          height: "40px",
          minWidth: "40px",
        }}
      >
        <SearchIcon />
      </Button>
    </Box>
  );
};

export default GuessInput;
