import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import SignUpPage from "../login/SignUpPage";
import useHttpService from "../../api/useHttpService";
import toast from "react-hot-toast";
import "@testing-library/jest-dom";

jest.mock("../../api/useHttpService");
jest.mock("react-hot-toast");

const mockPost = jest.fn();
const mockToastSuccess = jest.fn();
const mockToastError = jest.fn();
const mockGoToLogin = jest.fn();

(useHttpService as jest.Mock).mockReturnValue({ post: mockPost });
toast.success = mockToastSuccess;
toast.error = mockToastError;

describe("SignUpPage Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the form fields correctly", () => {
    render(<SignUpPage goToLogin={mockGoToLogin} />);

    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /submit/i })).toBeDisabled();
  });

  it("enables the submit button when all fields are filled", () => {
    render(<SignUpPage goToLogin={mockGoToLogin} />);

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/username/i), {
      target: { value: "testuser" },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "password123" },
    });

    expect(screen.getByRole("button", { name: /submit/i })).not.toBeDisabled();
  });

  it("calls the API and displays success toast on successful submission", async () => {
    mockPost.mockResolvedValueOnce({});
    render(<SignUpPage goToLogin={mockGoToLogin} />);

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/username/i), {
      target: { value: "testuser" },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "password123" },
    });

    fireEvent.click(screen.getByRole("button", { name: /submit/i }));

    await waitFor(() => {
      expect(mockPost).toHaveBeenCalledWith("/users", {
        email: "test@example.com",
        username: "testuser",
        password: "password123",
      });
      expect(mockToastSuccess).toHaveBeenCalledWith(
        "User successfully created"
      );
      expect(mockGoToLogin).toHaveBeenCalled();
    });
  });

  it("displays error toast on API failure", async () => {
    mockPost.mockRejectedValueOnce(new Error("API Error"));
    render(<SignUpPage goToLogin={mockGoToLogin} />);

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/username/i), {
      target: { value: "testuser" },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "password123" },
    });

    fireEvent.click(screen.getByRole("button", { name: /submit/i }));

    await waitFor(() => {
      expect(mockPost).toHaveBeenCalledWith("/users", {
        email: "test@example.com",
        username: "testuser",
        password: "password123",
      });
      expect(mockToastError).toHaveBeenCalledWith(
        "Something went wrong making your user"
      );
    });
  });

  it("calls goToLogin when 'Already on Makedle?' is clicked", () => {
    render(<SignUpPage goToLogin={mockGoToLogin} />);

    fireEvent.click(screen.getByText(/already on makedle\?/i));
    expect(mockGoToLogin).toHaveBeenCalled();
  });
});
