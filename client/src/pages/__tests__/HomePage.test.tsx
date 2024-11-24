import React from "react";
import { render, screen } from "@testing-library/react";
import HomePage from "../HomePage";
import AuthProvider from "../../context/AuthProvider";
import "@testing-library/jest-dom";

describe("HomePage", () => {
  test("renders the home page", () => {
    render(
      <AuthProvider>
        <HomePage />
      </AuthProvider>
    );
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getAllByRole("button", { name: "Play a game" }));
    expect(screen.getAllByRole("button", { name: "Make a game" }));
  });
});
