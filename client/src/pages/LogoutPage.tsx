import React from "react";
import Button from "../components/common/Button";
import { useAuth } from "../context/AuthProvider";


export default function LogoutPage() {
  const { handleLogout } = useAuth();


  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <h2>Logout</h2>
        <Button type="submit" onClick={handleLogout}>Logout</Button>
    </div>
  );
}
