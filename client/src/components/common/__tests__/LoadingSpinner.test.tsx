import React from "react";
import { render, screen } from "@testing-library/react";
import LoadingSpinner from "../LoadingSpinner";
import "@testing-library/jest-dom";

describe("LoadingSpinner component", () => {
  it("renders without crashing", () => {
    render(<LoadingSpinner />);
    expect(screen.getByText(/loading.../i)).toBeInTheDocument();
  });

  it("has the correct styles for the spinner", () => {
    const { container } = render(<LoadingSpinner />);
    const spinner = container.querySelector("div.w-16.h-16");
    expect(spinner).toHaveClass("border-4");
    expect(spinner).toHaveClass("border-t-green-500");
    expect(spinner).toHaveClass("border-gray-200");
    expect(spinner).toHaveClass("animate-spin");
  });
});
