"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Conversation, User } from "@prisma/client";
import { HiChevronLeft, HiEllipsisHorizontal } from "react-icons/hi2";

import Avatar from "@/components/Avatar";
import AvatarGroup from "@/components/AvatarGroup";

import ProfileDrawer from "./ProfileDrawer";

import useOtherUser from "@/hooks/use-other-user";
import useActiveList from "@/hooks/use-active-list";

type Props = {
  conversation: Conversation & {
    users: User[];
  };
};

function Header({ conversation }: Props) {
  const otherUser = useOtherUser(conversation);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const { members } = useActiveList();
  const isActive = members.indexOf(otherUser?.email!) !== -1;

  const statusText = useMemo(() => {
    if (conversation?.isGroup) {
      return `${conversation?.users?.length} members`;
    }

    return isActive ? "Active" : "Offline";
  }, [conversation?.isGroup, conversation?.users?.length, isActive]);

  return (
    <>
      <ProfileDrawer
        data={conversation}
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      />
      <nav className="bg-white py-3 px-4 lg:px-6 border-b-[1px] shadow-sm flex items-center justify-between w-full">
        <div className="flex gap-3 items-center">
          <Link
            href="/conversations"
            className="block lg:hidden text-sky-500 hover:text-sky-600 transition cursor-pointer"
          >
            <HiChevronLeft size={28} />
          </Link>
          {conversation?.isGroup ? (
            <AvatarGroup users={conversation.users} />
          ) : (
            <Avatar imageSrc={otherUser.image} email={otherUser.email} />
          )}
          <div className="flex flex-col">
            <p>{conversation.name || otherUser.name}</p>
            <p className="text-sm font-light text-neutral-500">{statusText}</p>
          </div>
        </div>
        <HiEllipsisHorizontal
          size={28}
          onClick={() => setDrawerOpen(true)}
          className="text-sky-500 hover:text-sky-600 transition cursor-pointer"
        />
      </nav>
    </>
  );
}

export default Header;
