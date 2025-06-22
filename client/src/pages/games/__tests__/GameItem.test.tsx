import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { useNavigate } from "react-router-dom";
import GameItem from "../GameItem";
import { Game } from "../../../types/types";
import "@testing-library/jest-dom";

jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn(),
}));

describe("GameItem Component", () => {
  const mockNavigate = jest.fn();
  const mockGame: Game = {
    id: 1,
    user_id: 1,
    name: "Test Game",
    created_at: new Date(),
    updated_at: new Date(),
    primary_color: "#6AAA63",
    secondary_color: "#C9B458",
    tertiary_color: "#EB2424",
    image: "https://example.com/image.jpg",
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
  });

  it("renders the game image", () => {
    render(<GameItem game={mockGame} />);

    expect(screen.getByRole("img")).toHaveAttribute("src", mockGame.image);
  });

  it("falls back to placeholder image if no image is provided", () => {
    const gameWithoutImage: Game = {
      id: 2,
      user_id: 1,
      name: "Game Without Image",
      created_at: new Date(),
      updated_at: new Date(),
      primary_color: "#6AAA63",
      secondary_color: "#C9B458",
      tertiary_color: "#EB2424",
      image: "",
    };

    render(<GameItem game={gameWithoutImage} />);

    const image = screen.getByRole("img");
    expect(image).toHaveAttribute("alt", "Game Without Image");
    expect(image).toHaveAttribute("src", "");
  });

  it("navigates to the correct game page on click", () => {
    const {debug} = render(<GameItem game={mockGame} />);

    debug();

    const gameItem = screen.getByRole('img');
    fireEvent.click(gameItem);

    expect(mockNavigate).toHaveBeenCalledWith(`/games/${mockGame.id}`, {
      state: { gameData: mockGame },
    });
  });
});
