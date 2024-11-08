import React from "react";
import Button from "./common/Button";
import logo from "../assets/logo.png";
import { Bell, Upload, User } from "lucide-react";

export default function PageHeader() {
  return (
    <div className="flex justify-between gap-10 lg:gap-20 pt-2 mb-6 mx-4">
      <div className="flex flex-shrink-0 h-8">
        <div className="flex justify-center items-center">MAKEDLE</div>
        <img src={logo} alt="" />
      </div>
      <div>Search</div>
      <div className="flex flex-shrink-0 md:gap-2">
        <Button size="icon" variant="ghost">
          <Upload />
        </Button>
        <Button size="icon" variant="ghost">
          <Bell />
        </Button>
        <Button size="icon" variant="ghost">
          <User />
        </Button>
      </div>
    </div>
  );
}
