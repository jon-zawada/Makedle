import React from "react";
import { Link } from "react-router-dom";


export default function Sidebar() {
  return (
    <aside className="bg-gray-300 p-4">
      <h1>SIDEBAR</h1>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/games">Games</Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
