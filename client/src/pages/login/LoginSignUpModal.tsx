import React, { useState, useEffect, useCallback } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";

interface LoginSignUpModalProps {
  isOpen: boolean;
  handleClose: () => void;
  initLogin?: boolean;
}

export default function LoginSignUpModal({
  isOpen,
  handleClose,
  initLogin = true,
}: LoginSignUpModalProps) {
  const [showLogin, setShowLogin] = useState(initLogin);

  useEffect(() => {
    if (isOpen) {
      setShowLogin(initLogin);
    }
  }, [isOpen, initLogin]);

  const handleShowLogin = useCallback(() => setShowLogin(true), []);
  const handleShowSignUp = useCallback(() => setShowLogin(false), []);

  return (
    <Modal open={isOpen} onClose={handleClose}>
      <Box>
        {showLogin ? (
          <LoginForm showSignUp={handleShowSignUp} />
        ) : (
          <SignUpForm showLogin={handleShowLogin} />
        )}
      </Box>
    </Modal>
  );
}
