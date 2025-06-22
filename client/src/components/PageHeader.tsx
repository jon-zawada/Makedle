import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { navbarData } from "./navbarData";
import { LucideIcon } from "lucide-react";
import { Bell, CircleHelp, User } from "lucide-react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
} from "@mui/material";
import logo from "../assets/logo.png";
import { useAuth } from "../context/AuthProvider";
import ProfileMenu from "./ProfileMenu";
import LoginSignUpModal from "../pages/login/LoginSignUpModal"

interface NavbarItemProps {
  Icon: LucideIcon;
  title: string;
  isActive?: boolean;
  route: string;
}

function PageHeader() {
  const { appUser } = useAuth();
  const navigate = useNavigate();
  const [showLoginModal, setShowLoginModal] = useState(false);

  useEffect(() => {
    if (appUser && showLoginModal) {
      setShowLoginModal(false);
    }
  }, [appUser]);

  const renderUserInfo = () => {
    return (
      <Box
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        {appUser ? (
          <Box sx={{ display: "flex", flexShrink: "0", gap: 1 }}>
            <IconButton color="inherit" sx={{width: "48px", height: "48px"}}>
              <CircleHelp />
            </IconButton>
            <IconButton color="inherit" sx={{width: "48px", height: "48px"}}>
              <Bell />
            </IconButton>
            <ProfileMenu />
          </Box>
        ) : (
          <Button color="inherit" onClick={() => setShowLoginModal(true)}>
            <User />
            <div>Sign In</div>
          </Button>
        )}
        <LoginSignUpModal
          isOpen={showLoginModal}
          handleClose={() => setShowLoginModal(false)}
        />
      </Box>
    );
  };

  return (
    <AppBar position="static" color="primary" elevation={1}>
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box
          sx={{ display: "flex", alignItems: "center", cursor: "pointer" }}
          onClick={() => navigate("/")}
        >
          <Box
            component="img"
            src={logo}
            sx={{ width: "40px", height: "32px" }}
          />
          <Typography variant="h5" noWrap>
            MAKEDLE
          </Typography>
        </Box>
        <Box sx={{ display: "flex", gap: 2, cursor: "pointer" }}>
          {navbarData.map((item) => (
            <NavbarItem
              key={item.id}
              route={item.route}
              title={item.title}
              Icon={item.icon}
            />
          ))}
        </Box>
        {renderUserInfo()}
      </Toolbar>
    </AppBar>
  );
}

function NavbarItem({ Icon, title, route }: NavbarItemProps) {
  return (
    <Link to={route}>
      <Button color="inherit">
        <Box sx={{ display: "flex", gap: 1 }}>
          <Icon className="w-6 h-6" />
          <div>{title}</div>
        </Box>
      </Button>
    </Link>
  );
}

export default PageHeader;
