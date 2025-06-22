import { Box } from "@mui/material";
import React from "react";
import { Game } from "../../types/types";
import { useNavigate } from "react-router-dom";

interface IGameItemProps {
  game: Game;
  view?: string;
}

export default function GameItem2({ game }: IGameItemProps) {
  const { id, name, image } = game;
  const navigate = useNavigate();

  const handleNavigateClick = () => {
    navigate(`/games/${id}`, { state: { gameData: game } });
  };
  return (
    <div onClick={handleNavigateClick}>
      <Box
        sx={{
          cursor: "pointer",
          width: "100%",
          borderRadius: 2,
          aspectRatio: "1",
          border: "1px solid lightgray",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          bgcolor: "white",
        }}
      >
        <img
          src={image}
          alt={name}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </Box>
    </div>
  );
}
