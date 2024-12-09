import React, { useState } from "react";
import Modal from "../../components/common/Modal";
import LoginPage from "./LoginPage";
import SignUpPage from "./SignUpPage";

interface ILoginSignUpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LoginSignUpModal({
  isOpen,
  onClose,
}: ILoginSignUpModalProps) {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      {showLogin ? (
        <LoginPage goToSignUp={() => setShowLogin(false)} />
      ) : (
        <SignUpPage goToLogin={() => setShowLogin(true)} />
      )}
    </Modal>
  );
}
