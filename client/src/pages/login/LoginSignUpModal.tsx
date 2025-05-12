import React, { useState, useEffect } from "react";
import Modal from "@mui/material/Modal";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";

interface LoginSignUpModalProps {
  isOpen: boolean;
  handleClose: () => void;
  initLogin?: boolean; // Optional, defaults to true
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

  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      {showLogin ? (
        <LoginForm showSignUp={() => setShowLogin(false)} />
      ) : (
        <SignUpForm showLogin={() => setShowLogin(true)} />
      )}
    </Modal>
  );
}
