"use client";

import useRoutes from "@/hooks/use-routes";
import useConversation from "@/hooks/use-conversations";

import MobileItem from "./MobileItem";

function MobileFooter() {
  const routes = useRoutes();
  const { isOpen } = useConversation();

  if (isOpen) {
    return null;
  }

  return (
    <div className="fixed bottom-0 z-40 border-t-[1px] bg-white w-full flex items-center justify-between lg:hidden">
      {routes.map((route) => (
        <MobileItem
          icon={route.icon}
          key={route.label}
          href={route.href}
          label={route.label}
          active={route.active}
          onClick={route.onClick}
        />
      ))}
    </div>
  );
}

export default MobileFooter;
