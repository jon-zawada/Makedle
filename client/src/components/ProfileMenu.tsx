import React, { useState } from "react";
import { IconButton, Menu, MenuItem } from "@mui/material";
import { User } from "lucide-react";
import { IDropdownMenuItems } from "../types/types";
import { useAuth } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";

export default function ProfileMenu() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { handleLogout } = useAuth();
  const navigate = useNavigate();

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const dropdownMenuItems: IDropdownMenuItems[] = [
    {
      id: 1,
      name: "Settings",
      onClick: () => console.log("Settings clicked"),
    },
    {
      id: 2,
      name: "Logout",
      onClick: () => {
        handleLogout();
        navigate("/");
      },
    },
  ];

  return (
    <div>
      <IconButton
        size="large"
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleMenu}
        color="inherit"
      >
        <User />
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {dropdownMenuItems.map((item) => (
          <MenuItem
            key={item.id}
            onClick={(e) => {
              item.onClick(e);
              handleClose();
            }}
          >
            {item.name}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}
