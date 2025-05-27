import React from "react";
import { Box, Button, TextField, Autocomplete } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

interface GuessInputProps {
  guess: string;
  options: string[];
  onGuessChange: (input: string) => void;
  onGuessSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  isDisabled: boolean;
}

const GuessInput = ({ guess, options, onGuessChange, onGuessSubmit, isDisabled }: GuessInputProps) => {
  /* TODO -  see if we should implement setGuess onClick of autocomplete dropdown click */

  return (
    <Box
      component="form"
      onSubmit={onGuessSubmit}
      sx={{
        minWidth: "250px",
        display: "flex",
        alignItems: "center",
      }}
    >
      <Autocomplete
        freeSolo
        open={guess.length > 0 && options.length > 0}
        options={options}
        inputValue={guess}
        onInputChange={(_, newValue) => onGuessChange(newValue)}
        sx={{
          flex: 1,
          "& .MuiOutlinedInput-root": {
            borderTopRightRadius: 0,
            borderBottomRightRadius: 0,
          },
          backgroundColor: "white",
        }}
        renderInput={(params) => (
          <TextField {...params} size="small" />
        )}
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
