import React, { useState } from "react";
import useHttpService from "../../api/useHttpService";
import Button from "../../components/common/Button";
import _isEmpty from "lodash/isEmpty";
import toast from "react-hot-toast";

interface ISignUpPageProps {
  goToLogin: () => void;
}

const initNewUser = {
  email: "",
  username: "",
  password: "",
};

export default function SignUpPage({ goToLogin }: ISignUpPageProps) {
  const [newUser, setNewUser] = useState(initNewUser);
  const httpService = useHttpService();

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    httpService
      .post("/users", newUser)
      .then(() => {
        toast.success("User successfully created");
        goToLogin();
      })
      .catch(() => toast.error("Something went wrong making your user"));
  };

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  const isDisabled =
    _isEmpty(newUser.email) ||
    _isEmpty(newUser.username) ||
    _isEmpty(newUser.password);

  return (
    <div className="py-5  h-full flex flex-col items-center justify-center gap-4">
      <h2 className="text-3xl font-semibold text-gray-800">Join for free</h2>
      <form onSubmit={submitHandler} className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            className="px-4 py-2 border rounded"
            onChange={changeHandler}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="username">Username</label>
          <input
            id="username"
            name="username"
            type="text"
            className="px-4 py-2 border rounded"
            onChange={changeHandler}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            className="px-4 py-2 border rounded"
            onChange={changeHandler}
          />
        </div>
        <Button isDisabled={isDisabled} type="submit">
          Submit
        </Button>
      </form>
      <div
        className="underline text-gray-400 hover:text-green-300 cursor-pointer"
        onClick={goToLogin}
      >
        Sign in
      </div>
    </div>
  );
}
