import React, { useState } from "react";
import Button from "../components/common/Button";

export default function LoginPage() {
  const [user, setUser] = useState({ name: "", password: "" });

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <h2>Login</h2>
      <form className="flex gap-4 flex-col">
        <div className="flex flex-col gap-2">
          <label>Username</label>
          <input
            id="name"
            type="text"
            name="name"
            onChange={(e) => changeHandler(e)}
            value={user.name}
            className="px-4 py-2 border rounded"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label>Password</label>
          <input
            id="password"
            type="password"
            name="password"
            onChange={(e) => changeHandler(e)}
            value={user.password}
            className="px-4 py-2 border rounded"
          />
        </div>
        <Button type="submit">Login</Button>
      </form>
    </div>
  );
}
