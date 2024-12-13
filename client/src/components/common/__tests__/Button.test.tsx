import React from "react";
import { render, screen } from "@testing-library/react";
import Button from "../Button";
import "@testing-library/jest-dom";

describe("Button component", () => {
  test("renders the default button", () => {
    render(<Button>Click me</Button>);
    const buttonElement = screen.getByRole("button", { name: "Click me" });
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveClass(
      "bg-secondary",
      "rounded",
      "p-2",
      "hover:bg-secondary-hover",
      "transition-colors"
    );
  });

  test("renders ghost variant button", () => {
    render(<Button variant="ghost">Click me</Button>);
    const buttonElement = screen.getByRole("button", { name: "Click me" });
    expect(buttonElement).toHaveClass("hover:bg-gray-100", "rounded", "p-2");
    expect(buttonElement).not.toHaveClass("bg-secondary");
  });

  test("renders icon size button", () => {
    render(<Button size="icon">Icon</Button>);
    const buttonElement = screen.getByRole("button", { name: "Icon" });
    expect(buttonElement).toHaveClass(
      "rounded-full",
      "w-10",
      "h-10",
      "flex",
      "items-center",
      "bg-secondary",
      "hover:bg-secondary-hover"
    );
  });

  test("applies custom class name", () => {
    render(<Button className="custom-class">Custom</Button>);
    const buttonElement = screen.getByRole("button", { name: "Custom" });
    expect(buttonElement).toHaveClass(
      "custom-class",
      "bg-secondary",
      "hover:bg-secondary-hover",
      "rounded",
      "p-2"
    );
  });
});
