"use client";

import { useMemo } from "react";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

import useOtherUser from "@/hooks/use-other-user";
import { FullConversationType } from "@/app/types";

import Avatar from "@/components/Avatar";
import AvatarGroup from "@/components/AvatarGroup";

type Props = {
  data: FullConversationType;
  selected: boolean;
};

function ConversationBox({ data, selected }: Props) {
  const router = useRouter();
  const session = useSession();
  const otherUser = useOtherUser(data);

  const handleClick = () => {
    router.push(`/conversations/${data.id}`);
  };

  const lastMessage = useMemo(() => {
    const messages = data.messages || [];

    return messages[messages.length - 1];
  }, [data.messages]);

  const userEmail = useMemo(
    () => session.data?.user?.email,
    [session.data?.user?.email]
  );

  const hasSeen = useMemo(() => {
    if (!lastMessage) {
      return false;
    }

    const seenArray = lastMessage.seen;

    if (!userEmail) {
      return false;
    }

    return seenArray.filter((user) => user.email === userEmail)?.length !== 0;
  }, [userEmail, lastMessage]);

  const lastMessageText = useMemo(() => {
    if (lastMessage?.image) {
      return "Sent an image";
    }

    if (lastMessage?.body) {
      return lastMessage?.body;
    }

    return "Started an conversation";
  }, [lastMessage?.body, lastMessage?.image]);

  return (
    <div
      onClick={handleClick}
      className={`w-full relative flex items-center space-x-5 rounded-lg transition cursor-pointer hover:bg-neutral-100 p-3 ${
        selected ? "bg-gray-100" : "bg-white"
      }`}
    >
      <div>
        {data?.isGroup ? (
          <AvatarGroup users={data.users} />
        ) : (
          <Avatar imageSrc={otherUser.image} />
        )}
      </div>
      <div className="w-full">
        <div className="flex justify-between items-center w-full">
          <p className="text-md font-medium text-gray-900">
            {data.name || otherUser.name}
          </p>
          {lastMessage?.createdAt && (
            <p className="text-xs text-gray-400 font-light">
              {format(new Date(lastMessage?.createdAt), "p")}
            </p>
          )}
        </div>
        <p
          className={`text-sm truncate ${
            hasSeen ? "text-gray-500" : "text-black font-medium"
          }`}
        >
          {lastMessageText}
        </p>
      </div>
    </div>
  );
}

export default ConversationBox;
