import React, { useState } from "react";
import Button from "../components/common/Button";
import httpService from "../api/httpService";

type LoginFormUser = {
  email: string;
  password: string;
};

export default function LoginPage() {
  const [user, setUser] = useState<LoginFormUser>({ email: "", password: "" });

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    //set is loading
    httpService
      .post("/login", user)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        // set is loading
      });
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <h2>Login</h2>
      <form onSubmit={submitHandler} className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            onChange={changeHandler}
            value={user.email}
            className="px-4 py-2 border rounded"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            onChange={changeHandler}
            value={user.password}
            className="px-4 py-2 border rounded"
          />
        </div>
        <Button type="submit">Login</Button>
      </form>
    </div>
  );
}
