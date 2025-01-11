import React, { useEffect, useState } from "react";
import Button from "./common/Button";
import logo from "../assets/logo.png";
import { Bell, Upload, User } from "lucide-react";
import { useAuth } from "../context/AuthProvider";
import ProfileMenu from "./ProfileMenu";
import Sidebar from "./Sidebar";
import LoginSignUpModal, {
  LoginModalView,
} from "../pages/login/LoginSignUpModal";
import { useNavigate } from "react-router-dom";

export default function PageHeader() {
  const { appUser } = useAuth();
  const navigate = useNavigate();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [logoLoaded, setLogoLoaded] = useState(false);

  useEffect(() => {
    if (appUser && showLoginModal) {
      setShowLoginModal(false);
    }
  }, [appUser]);

  const renderUserInfo = () => {
    return (
      <div
        className="flex items-center justify-center"
        style={{ width: "150px" }}
      >
        {appUser ? (
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
          <Button
            onClick={() => setShowLoginModal(true)}
            className="rounded-full flex flex-shrink-0 md:gap-2 bg-green-100 px-3 border-2 border-black"
          >
            <User />
            <div>Sign In</div>
          </Button>
        )}
        <LoginSignUpModal
          isOpen={showLoginModal}
          onClose={() => setShowLoginModal(false)}
          initialView={LoginModalView.LOGIN}
        />
      </div>
    );
  };

  return (
    <header className="bg-green-100 flex items-center justify-between gap-10 lg:gap-20 px-4 py-4">
      <div
        className="flex items-center justify-center h-8 gap-1 cursor-pointer"
        style={{ minWidth: "120px", minHeight: "32px" }}
        onClick={() => navigate('/')}
      >
        {!logoLoaded && (
          <div
            className="h-full w-auto bg-gray-200 animate-pulse"
            style={{ width: "40px", height: "32px" }}
          ></div>
        )}
        <img
          src={logo}
          alt="Logo"
          className={`h-full w-auto ${logoLoaded ? "block" : "hidden"}`}
          onLoad={() => setLogoLoaded(true)}
        />
        <div className="text-2xl leading-none">MAKEDLE</div>
      </div>
      <Sidebar />
      {renderUserInfo()}
    </header>
  );
}
