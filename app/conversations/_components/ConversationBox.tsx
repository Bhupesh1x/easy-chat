"use client";

import { FullConversationType } from "@/app/types";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useMemo } from "react";

type Props = {
  data: FullConversationType;
  selected: boolean;
};

function ConversationBox({ data, selected }: Props) {
  const router = useRouter();

  const session = useSession();

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
    <div>
      <h1>ConversationBox</h1>
    </div>
  );
}

export default ConversationBox;
