import React from "react";
import Button from "./common/Button";
import logo from "../assets/logo.png";
import { Bell, Upload, User } from "lucide-react";

export default function PageHeader() {
  return (
    <header className="bg-green-100 flex justify-between gap-10 lg:gap-20 pt-2 mb-6 px-4 py-4 col-span-2">
      <div className="flex flex-shrink-0 h-8">
        <div className="flex justify-center items-center">MAKEDLE</div>
        <img src={logo} alt="" />
      </div>
      <h1>HEADER</h1>
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
    </header>
  );
}
