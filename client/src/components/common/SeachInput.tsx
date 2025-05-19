import React, { useState } from "react";
import { Box, TextField, Button } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const SearchInput = ({ onSearch }: { onSearch: (input: string) => void }) => {
  const [input, setInput] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(input);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        alignItems: "center",
      }}
    >
      <TextField
        placeholder="Search..."
        size="small"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        sx={{
          "& .MuiOutlinedInput-root": {
            borderTopRightRadius: 0,
            borderBottomRightRadius: 0,
          },
          backgroundColor: "white",
        }}
      />
      <Button
        type="submit"
        size="small"
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

export default SearchInput;
