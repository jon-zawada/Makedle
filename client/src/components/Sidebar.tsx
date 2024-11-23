import React from "react";
import { Link } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import { buttonStyles } from "./common/Button";
import { useLocation, matchPath } from "react-router-dom";
import { sideBarData } from "./sideBarData";

interface SidebarItemProps {
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  title: string;
  isActive?: boolean;
  route: string;
}

export default function Sidebar() {
  const location = useLocation();
  const path = location.pathname;

  return (
    <aside className="p-4 bg-green-50 ">
      <nav className="flex flex-col">
        {sideBarData.map((item) => (
          <SidebarItem
            key={item.id}
            route={item.route}
            title={item.title}
            Icon={item.icon}
            isActive={!!matchPath(item.route, path)}
          />
        ))}
      </nav>
    </aside>
  );
}

function SidebarItem({
  Icon,
  title,
  isActive = false,
  route,
}: SidebarItemProps) {
  const sideBarStyles = twMerge(
    buttonStyles({ variant: "ghost" }),
    `w-full flex items-center rounded-lg gap-4 p-3 ${
      isActive ? "font-bold bg-neutral-100 hover:bg-secondary" : undefined
    }`
  );
  return (
    <Link to={route} className={sideBarStyles}>
      <Icon className="w-6 h-6" />
      <div>{title}</div>
    </Link>
  );
}
