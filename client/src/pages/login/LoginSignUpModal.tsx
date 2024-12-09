import React, { useEffect, useState } from "react";
import Modal from "../../components/common/Modal";
import LoginPage from "./LoginPage";
import SignUpPage from "./SignUpPage";

export enum LoginModalView {
  LOGIN = "login",
  SIGNUP = "signup",
}

interface ILoginSignUpModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialView: LoginModalView.LOGIN | LoginModalView.SIGNUP;
}

export default function LoginSignUpModal({
  isOpen,
  onClose,
  initialView,
}: ILoginSignUpModalProps) {
  const [showLogin, setShowLogin] = useState(
    initialView === LoginModalView.LOGIN
  );

  useEffect(() => {
    setShowLogin(initialView === LoginModalView.LOGIN);
  }, [initialView]);

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
