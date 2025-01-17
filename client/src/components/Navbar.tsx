import React from "react";
import { Link } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import { buttonStyles } from "./common/Button";
import { useLocation, matchPath } from "react-router-dom";
import { navbarData } from "./navbarData";

interface NavbarItemProps {
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  title: string;
  isActive?: boolean;
  route: string;
}

export default function Navbar() {
  const location = useLocation();
  const path = location.pathname;

  return (
    <nav className="flex gap-2 p-4">
      {navbarData.map((item) => (
        <NavbarItem
          key={item.id}
          route={item.route}
          title={item.title}
          Icon={item.icon}
          isActive={!!matchPath(item.route, path)} // TODO this isnt working for nested routes ie /game/:id
        />
      ))}
    </nav>
  );
}

function NavbarItem({
  Icon,
  title,
  isActive = false,
  route,
}: NavbarItemProps) {
  const navbarStyles = twMerge(
    buttonStyles({ variant: "ghost" }),
    `w-full flex items-center rounded-lg gap-4 p-3 ${
      isActive ? "font-bold bg-neutral-100 hover:bg-secondary" : undefined
    }`
  );
  return (
    <Link to={route} className={navbarStyles}>
      <Icon className="w-6 h-6" />
      <div>{title}</div>
    </Link>
  );
}
