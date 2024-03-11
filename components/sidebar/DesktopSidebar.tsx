"use client";

import { useState } from "react";
import { User } from "@prisma/client";

import useRoutes from "@/hooks/use-routes";

import Avatar from "../Avatar";
import DesktopItem from "./DesktopItem";
import SettingsModal from "./SettingsModal";

type Props = {
  currentUser: User;
};

function DesktopSidebar({ currentUser }: Props) {
  const routes = useRoutes();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-40 lg:w-20 lg:left-0 xl:px-6 lg:overflow-y-auto lg:bg-white lg:border-r-[1px] lg:pb-4 lg:flex lg:flex-col justify-between">
        <nav className="mt-4 flex flex-col justify-between">
          <ul role="list" className="flex flex-col items-center space-y-1">
            {routes.map((route) => (
              <DesktopItem
                icon={route.icon}
                key={route.label}
                href={route.href}
                label={route.label}
                active={route.active}
                onClick={route.onClick}
              />
            ))}
          </ul>
        </nav>
        <nav className="mt-4 flex flex-col justify-between items-center">
          <div
            onClick={() => setIsOpen(true)}
            className="cursor-pointer hover:opacity-75 transition"
          >
            <Avatar imageSrc={currentUser?.image} />
          </div>
        </nav>
      </div>
      <SettingsModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        currentUser={currentUser}
      />
    </>
  );
}

export default DesktopSidebar;
