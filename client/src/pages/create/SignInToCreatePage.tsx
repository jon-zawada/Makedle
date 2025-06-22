import React, { useState } from "react";
import PageLayout from "../../components/common/PageLayout";
import { CircleCheckBig } from "lucide-react";
import Button from "../../components/common/Button";
import LoginSignUpModal from "../login/LoginSignUpModal";
import { useAuth } from "../../context/AuthProvider";

export default function SignInToCreatePage() {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showLogin, setShowLogin] = useState<boolean>(true);
  const { loadingAppUser } = useAuth();

  const openModal = (isLogin: boolean) => {
    setShowLogin(isLogin);
    setShowModal(true);
  };

  const bulletPoints = [
    "Create a makedle game on any possible topic",
    "Share your game with the world or keep it private with your friends",
    "Track your game's statistics",
  ];

  return (
    <PageLayout
      title="Create Your Own Wordle-like Game"
      description="Have a game idea? Join Makedle"
      loading={loadingAppUser}
    >
      <div className="flex flex-col gap-8 items-center">
        <div className="flex flex-col gap-4">
          {bulletPoints.map((bullet, index) => (
            <div className="flex gap-2" key={index}>
              <CircleCheckBig />
              <div className="text-xl">{bullet}</div>
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-4">
          <Button
            onClick={() => openModal(false)} //update this
            className="self-center w-36"
          >
            Sign Up
          </Button>
          <div className="self-center">
            Already on Makedle?{" "}
            <span
              className="underline font-bold hover:text-green-300 cursor-pointer"
              onClick={() => openModal(true)} //update this
            >
              Log in
            </span>
          </div>
        </div>
      </div>
      <LoginSignUpModal
        initLogin={showLogin}
        isOpen={showModal}
        handleClose={() => setShowModal(false)}
      />
    </PageLayout>
  );
}
