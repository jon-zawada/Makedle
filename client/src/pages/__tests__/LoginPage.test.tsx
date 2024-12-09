import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import LoginPage from "../login/LoginPage";
import AuthProvider from "../../context/AuthProvider";
import httpService from "../../api/httpService";
import "@testing-library/jest-dom";

jest.mock("../../api/httpService");

jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn(),
}));

describe("LoginPage", () => {
  test("renders the login page", () => {
    render(
      <AuthProvider>
        <LoginPage goToSignUp={() => {}} />
      </AuthProvider>
    );

    expect(
      screen.getByRole("heading", { level: 2, name: "Login" })
    ).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Login" })).toBeInTheDocument();
  });

  test("updates state on input change", () => {
    render(
      <AuthProvider>
        <LoginPage goToSignUp={() => {}} />
      </AuthProvider>
    );

    const emailInput = screen.getByLabelText("Email");
    const passwordInput = screen.getByLabelText("Password");

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });

    expect(emailInput).toHaveValue("test@example.com");
    expect(passwordInput).toHaveValue("password123");
  });

  test("submits the form and calls httpService.post", async () => {
    const postMock = jest.fn().mockResolvedValue({ data: { success: true } });
    (httpService.post as jest.Mock).mockImplementation(postMock);

    render(
      <AuthProvider>
        <LoginPage goToSignUp={() => {}} />
      </AuthProvider>
    );

    const emailInput = screen.getByLabelText("Email");
    const passwordInput = screen.getByLabelText("Password");
    const submitButton = screen.getByRole("button", { name: "Login" });

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });

    fireEvent.click(submitButton);

    expect(postMock).toHaveBeenCalledWith("/login", {
      email: "test@example.com",
      password: "password123",
    });
  });

  test("handles httpService.post rejection", async () => {
    const postMock = jest.fn().mockRejectedValue(new Error("Login failed"));
    (httpService.post as jest.Mock).mockImplementation(postMock);

    render(
      <AuthProvider>
        <LoginPage goToSignUp={() => {}} />
      </AuthProvider>
    );

    const emailInput = screen.getByLabelText("Email");
    const passwordInput = screen.getByLabelText("Password");
    const submitButton = screen.getByRole("button", { name: "Login" });

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });

    fireEvent.click(submitButton);

    expect(postMock).toHaveBeenCalledWith("/login", {
      email: "test@example.com",
      password: "password123",
    });
  });
});
