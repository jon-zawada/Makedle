import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import LoginSignUpModal, { LoginModalView } from "../login/LoginSignUpModal";
import "@testing-library/jest-dom";

jest.mock("../../components/common/Modal", () => {
  return jest.fn(({ children, isOpen, onClose }) =>
    isOpen ? (
      <div data-testid="modal">
        <button onClick={onClose} data-testid="close-button">
          Close
        </button>
        {children}
      </div>
    ) : null
  );
});

jest.mock("../login/LoginPage", () => {
  return jest.fn(({ goToSignUp }) => (
    <div data-testid="login-page">
      <button onClick={goToSignUp}>Go to Sign Up</button>
    </div>
  ));
});

jest.mock("../login/SignUpPage", () => {
  return jest.fn(({ goToLogin }) => (
    <div data-testid="signup-page">
      <button onClick={goToLogin}>Go to Login</button>
    </div>
  ));
});

describe("LoginSignUpModal Component", () => {
  const mockOnClose = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the modal with the LoginPage when initialView is LOGIN", () => {
    render(
      <LoginSignUpModal
        isOpen={true}
        onClose={mockOnClose}
        initialView={LoginModalView.LOGIN}
      />
    );

    expect(screen.getByTestId("modal")).toBeInTheDocument();
    expect(screen.getByTestId("login-page")).toBeInTheDocument();
    expect(screen.queryByTestId("signup-page")).not.toBeInTheDocument();
  });

  it("renders the modal with the SignUpPage when initialView is SIGNUP", () => {
    render(
      <LoginSignUpModal
        isOpen={true}
        onClose={mockOnClose}
        initialView={LoginModalView.SIGNUP}
      />
    );

    expect(screen.getByTestId("modal")).toBeInTheDocument();
    expect(screen.getByTestId("signup-page")).toBeInTheDocument();
    expect(screen.queryByTestId("login-page")).not.toBeInTheDocument();
  });

  it("toggles between LoginPage and SignUpPage when buttons are clicked", () => {
    render(
      <LoginSignUpModal
        isOpen={true}
        onClose={mockOnClose}
        initialView={LoginModalView.LOGIN}
      />
    );
    expect(screen.getByTestId("login-page")).toBeInTheDocument();
    fireEvent.click(screen.getByText("Go to Sign Up"));
    expect(screen.getByTestId("signup-page")).toBeInTheDocument();
    expect(screen.queryByTestId("login-page")).not.toBeInTheDocument();
    fireEvent.click(screen.getByText("Go to Login"));
    expect(screen.getByTestId("login-page")).toBeInTheDocument();
    expect(screen.queryByTestId("signup-page")).not.toBeInTheDocument();
  });

  it("calls onClose when the close button is clicked", () => {
    render(
      <LoginSignUpModal
        isOpen={true}
        onClose={mockOnClose}
        initialView={LoginModalView.LOGIN}
      />
    );

    fireEvent.click(screen.getByTestId("close-button"));
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it("does not render the modal when isOpen is false", () => {
    render(
      <LoginSignUpModal
        isOpen={false}
        onClose={mockOnClose}
        initialView={LoginModalView.LOGIN}
      />
    );

    expect(screen.queryByTestId("modal")).not.toBeInTheDocument();
  });
});
