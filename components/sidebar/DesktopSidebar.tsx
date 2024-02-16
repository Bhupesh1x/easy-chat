"use client";

import useRoutes from "@/hooks/use-routes";

import DesktopItem from "./DesktopItem";

function DesktopSidebar() {
  const routes = useRoutes();

  return (
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
    </div>
  );
}

export default DesktopSidebar;
