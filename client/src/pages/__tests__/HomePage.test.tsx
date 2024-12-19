import React from "react";
import { render, screen } from "@testing-library/react";
import HomePage from "../HomePage";
import AuthProvider from "../../context/AuthProvider";
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";

describe("HomePage", () => {
  test("renders the home page", () => {
    render(
      <BrowserRouter>
        <AuthProvider>
          <HomePage />
        </AuthProvider>
      </BrowserRouter>
    );
    expect(screen.getByText("Welcome to Makedle")).toBeInTheDocument();
    
    const createLink = screen.getByText("Create", { selector: "span" });
    expect(createLink).toBeInTheDocument();
    expect(createLink.closest("a")).toHaveAttribute("href", "/create");

    const playLink = screen.getByText("Play", { selector: "span" });
    expect(playLink).toBeInTheDocument();
    expect(playLink.closest("a")).toHaveAttribute("href", "/games");
  });
});
