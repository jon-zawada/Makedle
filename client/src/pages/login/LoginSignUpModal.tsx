import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";

interface LoginSignUpModal {
  isOpen: boolean;
  handleClose: () => void;
}

export default function LoginSignUpModal({
  isOpen,
  handleClose,
}: LoginSignUpModal) {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <div>
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
    </div>
  );
}
