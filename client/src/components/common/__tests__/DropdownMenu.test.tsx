import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import DropdownMenu, { IDropdownMenuItems } from "../DropdownMenu";
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";
import AuthProvider from "../../../context/AuthProvider";

describe("DropdownMenu Component", () => {
  const mockMenuRef = React.createRef<HTMLDivElement>();
  const mockItems: IDropdownMenuItems[] = [
    { name: "Item 1", onClick: jest.fn() },
    { name: "Item 2", onClick: jest.fn() },
    { name: "Item 3", onClick: jest.fn() },
  ];

  test("renders menu when isOpen is true and items are not empty", () => {
    render(
      <BrowserRouter>
        <AuthProvider>
          <DropdownMenu isOpen={true} menuRef={mockMenuRef} items={mockItems} />
        </AuthProvider>
      </BrowserRouter>
    );

    expect(screen.getByRole("list")).toBeInTheDocument();
    mockItems.forEach((item) => {
      expect(screen.getByText(item.name)).toBeInTheDocument();
    });
  });

  test("does not render menu when isOpen is false", () => {
    render(
      <BrowserRouter>
        <AuthProvider>
          <DropdownMenu
            isOpen={false}
            menuRef={mockMenuRef}
            items={mockItems}
          />
        </AuthProvider>
      </BrowserRouter>
    );
    expect(screen.queryByRole("list")).not.toBeInTheDocument();
  });

  test("does not render menu when items are empty", () => {
    render(
      <BrowserRouter>
        <AuthProvider>
          <DropdownMenu isOpen={true} menuRef={mockMenuRef} items={[]} />
        </AuthProvider>
      </BrowserRouter>
    );
    expect(screen.queryByRole("list")).not.toBeInTheDocument();
  });

  test("renders with fitParent", () => {
    const { container } = render(
      <BrowserRouter>
        <AuthProvider>
          <DropdownMenu
            isOpen={true}
            menuRef={mockMenuRef}
            items={mockItems}
            fitParent={true}
          />
        </AuthProvider>
      </BrowserRouter>
    );
    const menuDiv = container.querySelector("div");
    expect(menuDiv).toHaveClass("w-full");
  });

  test("calls onClick handler when an item is clicked", () => {
    render(
      <BrowserRouter>
        <AuthProvider>
          <DropdownMenu isOpen={true} menuRef={mockMenuRef} items={mockItems} />
        </AuthProvider>
      </BrowserRouter>
    );
    const firstItem = screen.getByText(mockItems[0].name);
    fireEvent.click(firstItem);
    expect(mockItems[0].onClick).toHaveBeenCalledTimes(1);
  });
});
