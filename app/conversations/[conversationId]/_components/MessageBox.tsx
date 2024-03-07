"use client";

import Image from "next/image";
import { format } from "date-fns";
import { useSession } from "next-auth/react";

import Avatar from "@/components/Avatar";

import { FullMessageType } from "@/app/types";

type Props = {
  isLast?: Boolean;
  message: FullMessageType;
};

function MessageBox({ message, isLast }: Props) {
  const session = useSession();

  const isOwn = session?.data?.user?.email === message?.sender?.email;

  const seenList = (message.seen || [])
    .filter((user) => user.email !== message.sender.email)
    .map((user) => user.name)
    .join(", ");

  return (
    <div className={`flex gap-3 p-4 ${isOwn && "justify-end"}`}>
      <div className={`${isOwn && "order-2"}`}>
        <Avatar imageSrc={message.sender.image} />
      </div>
      <div className={`flex flex-col gap-2 ${isOwn && "items-end"}`}>
        <div className="flex items-center gap-1">
          <p className="text-sm text-gray-500">{message.sender.name}</p>
          <p className="text-xs text-gray-400">
            {format(new Date(message.createdAt), "p")}
          </p>
        </div>
        <div
          className={`text-sm w-fit overflow-hidden ${
            isOwn ? "bg-sky-500 text-white" : "bg-gray-100"
          } ${message.image ? "rounded-md p-0" : "rounded-md py-2 px-4"}`}
        >
          {message?.image ? (
            <Image
              height={288}
              width={288}
              src={message.image}
              className="object-cover cursor-pointer translate hover:scale-105 transition"
              alt="img"
            />
          ) : (
            <p>{message.body}</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default MessageBox;
