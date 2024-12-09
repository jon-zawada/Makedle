import React, { useState } from "react";
import Modal from "../../components/common/Modal";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";

interface ILoginRegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LoginRegisterModal({
  isOpen,
  onClose,
}: ILoginRegisterModalProps) {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      {showLogin ? (
        <LoginPage goToRegister={() => setShowLogin(false)} />
      ) : (
        <RegisterPage goToLogin={() => setShowLogin(true)} />
      )}
    </Modal>
  );
}
