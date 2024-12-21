import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ProfileMenu from "../ProfileMenu";
import { useAuth } from "../../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import "@testing-library/jest-dom";

jest.mock("../../context/AuthProvider", () => ({
  useAuth: jest.fn(),
}));

jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn(),
}));

describe("ProfileMenu Component", () => {
  const handleLogoutMock = jest.fn();
  const navigateMock = jest.fn();

  beforeEach(() => {
    (useAuth as jest.Mock).mockReturnValue({
      handleLogout: handleLogoutMock,
    });
    (useNavigate as jest.Mock).mockReturnValue(navigateMock);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders the ProfileMenu component", () => {
    render(<ProfileMenu />);
    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
    const svgIcon = button.querySelector("svg.lucide-user");
    expect(svgIcon).toBeInTheDocument();
  });

  test("toggles the dropdown menu when button is clicked", () => {
    render(<ProfileMenu />);
    const button = screen.getByRole("button");
    fireEvent.click(button);
    expect(screen.getByText("Settings")).toBeInTheDocument();
    fireEvent.click(button);
    expect(screen.queryByText("Settings")).not.toBeInTheDocument();
  });

  test("closes the dropdown menu when clicking outside", () => {
    render(<ProfileMenu />);
    const button = screen.getByRole("button");
    fireEvent.click(button);
    expect(screen.getByText("Settings")).toBeInTheDocument();
    fireEvent.mouseDown(document.body);
    expect(screen.queryByText("Settings")).not.toBeInTheDocument();
  });

  test("triggers handleLogout and navigates on Logout click", () => {
    render(<ProfileMenu />);
    const button = screen.getByRole("button");
    fireEvent.click(button);
    const logoutItem = screen.getByText("Logout");
    fireEvent.click(logoutItem);
    expect(handleLogoutMock).toHaveBeenCalled();
    expect(navigateMock).toHaveBeenCalledWith("/");
  });

  test("handles Settings menu item click", () => {
    const consoleLogMock = jest
      .spyOn(console, "log")
      .mockImplementation(() => {});
    render(<ProfileMenu />);
    const button = screen.getByRole("button");
    fireEvent.click(button);
    const settingsItem = screen.getByText("Settings");
    fireEvent.click(settingsItem);
    expect(consoleLogMock).toHaveBeenCalledWith("Settings clicked");
    consoleLogMock.mockRestore();
  });
});
