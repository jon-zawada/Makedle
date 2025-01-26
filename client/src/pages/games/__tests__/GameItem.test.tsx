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

  it("renders the game name and image", () => {
    render(<GameItem game={mockGame} />);

    expect(screen.getByText(mockGame.name)).toBeInTheDocument();
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
    expect(image).toHaveAttribute("alt", "Game Without Image image");
    expect(image).toHaveAttribute("src", "");
  });

  it("navigates to the correct game page on click", () => {
    render(<GameItem game={mockGame} />);

    const gameItem = screen.getByText(mockGame.name);
    fireEvent.click(gameItem);

    expect(mockNavigate).toHaveBeenCalledWith(`/games/${mockGame.id}`, {
      state: { gameData: mockGame },
    });
  });

  it("applies the correct hover styles and animations", () => {
    render(<GameItem game={mockGame} />);

    const gameItem = screen.getByText(mockGame.name);
    fireEvent.mouseOver(gameItem);
    const gameName = screen.getByText(mockGame.name);
    expect(gameName).toHaveClass("hover:underline");
    expect(gameName).toHaveClass("hover:text-green-500");
  });
});
