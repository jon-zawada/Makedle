import React, { useState } from "react";
import PageLayout from "../../components/common/PageLayout";
import { CircleCheckBig } from "lucide-react";
import Button from "../../components/common/Button";
import LoginSignUpModal, { LoginModalView } from "../login/LoginSignUpModal";

export default function SignInToCreatePage() {
  const [modalView, setModalView] = useState<
    LoginModalView.LOGIN | LoginModalView.SIGNUP
  >(LoginModalView.LOGIN);
  const [showModal, setShowModal] = useState<boolean>(false);

  const openModal = (view: LoginModalView.LOGIN | LoginModalView.SIGNUP) => {
    setModalView(view);
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
    >
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          {bulletPoints.map((bullet) => (
            <div className="flex gap-2" key={bullet}>
              <CircleCheckBig />
              <div className="text-xl">{bullet}</div>
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-4">
          <Button
            onClick={() => openModal(LoginModalView.SIGNUP)}
            className="self-center w-[150px]"
          >
            Sign Up
          </Button>
          <div className="self-center">
            Already on Makedle?{" "}
            <span
              className=" underline font-bold hover:text-green-300 cursor-pointer"
              onClick={() => openModal(LoginModalView.LOGIN)}
            >
              Log in
            </span>
          </div>
        </div>
      </div>
      <LoginSignUpModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        initialView={modalView}
      />
    </PageLayout>
  );
}
