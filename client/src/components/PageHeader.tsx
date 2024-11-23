import React, { useEffect, useState } from "react";
import Button from "./common/Button";
import logo from "../assets/logo.png";
import { Bell, Upload, User } from "lucide-react";
import { useAuth } from "../context/AuthProvider";
import Modal from "./common/Modal";
import LoginPage from "../pages/LoginPage";
import ProfileMenu from "./ProfileMenu";

export default function PageHeader() {
  const { appUser } = useAuth();
  const [showLoginModal, setShowLoginModal] = useState(false);

  useEffect(() => {
    if (appUser && showLoginModal) {
      setShowLoginModal(false);
    }
  }, [appUser]);

  const renderUserInfo = () => {
    return appUser ? (
      <div className="flex flex-shrink-0 md:gap-2">
        <Button size="icon" variant="ghost">
          <Upload />
        </Button>
        <Button size="icon" variant="ghost">
          <Bell />
        </Button>
        <ProfileMenu />
      </div>
    ) : (
      <div>
        <>
          <Button
            onClick={() => setShowLoginModal(true)}
            className="rounded-full flex flex-shrink-0 md:gap-2 bg-green-100 px-3 border border-black"
          >
            <User />
            <div>Sign In</div>
          </Button>
          <Modal
            isOpen={showLoginModal}
            onClose={() => setShowLoginModal(false)}
          >
            <LoginPage />
          </Modal>
        </>
      </div>
    );
  };

  return (
    <header className="bg-green-100 flex items-center justify-between gap-10 lg:gap-20 px-4 py-4 col-span-2">
      <div className="flex items-center justify-center h-8 gap-1">
        <img src={logo} alt="" className="h-full" />
        <div className="text-2xl leading-none">MAKEDLE</div>
      </div>
      {renderUserInfo()}
    </header>
  );
}
