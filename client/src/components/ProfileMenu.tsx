import React, { useState, useRef } from "react";
import { IconButton } from "@mui/material";
import { User } from "lucide-react";
import DropdownMenu, { IDropdownMenuItems } from "./common/DropdownMenu";
import { useAuth } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";

export default function ProfileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { handleLogout } = useAuth();
  const navigate = useNavigate();

  const handleToggle = () => setIsOpen((prev) => !prev);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      menuRef.current &&
      !menuRef.current.contains(event.target as Node) &&
      !(event.target as HTMLElement).closest("button")
    ) {
      setIsOpen(false);
    }
  };

  const dropdownMenuItems: IDropdownMenuItems[] = [
    {
      name: "Settings",
      onClick: () => console.log("Settings clicked"),
    },
    {
      name: "Logout",
      onClick: () => {
        handleLogout();
        navigate("/");
      },
    },
  ];

  React.useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative">
      <IconButton color="inherit" onClick={handleToggle}>
        <User />
      </IconButton>
      <DropdownMenu
        isOpen={isOpen}
        menuRef={menuRef}
        items={dropdownMenuItems}
        isProfile
        direction="right"
      />
    </div>
  );
}
