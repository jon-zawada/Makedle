import React from "react";
import Button from "./common/Button";
import logo from "../assets/logo.png";
import { Bell, Upload, User } from "lucide-react";

export default function PageHeader() {
  return (
    <header className="bg-green-100 flex items-center justify-between gap-10 lg:gap-20 px-4 py-4 col-span-2">
      <div className="flex items-center justify-center h-8 gap-1">
        <img src={logo} alt="" className="h-full" />
        <div className="text-2xl leading-none">MAKEDLE</div>
      </div>
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
