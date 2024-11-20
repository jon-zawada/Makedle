import React from "react";
import { Link } from "react-router-dom";
import Button from "./common/Button";
import { useAuth } from "../context/AuthProvider";

export default function Sidebar() {
  const { appUser, handleLogout } = useAuth();
  return (
    <aside className="bg-gray-300 p-4">
      <h1>SIDEBAR</h1>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
          {appUser && (
            <li>
              <Button onClick={handleLogout}>Logout</Button>
            </li>
          )}
        </ul>
      </nav>
    </aside>
  );
}
