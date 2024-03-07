"use client";

import { useRef, useState } from "react";

import MessageBox from "./MessageBox";

import { FullMessageType } from "@/app/types";
import useConversation from "@/hooks/use-conversations";

type Props = {
  initialMessages: FullMessageType[];
};

function Body({ initialMessages }: Props) {
  const [messages, setMessages] = useState(initialMessages);

  const bottomRef = useRef<HTMLDivElement>(null);
  const { conversationId } = useConversation();

  return (
    <div className="flex-1 overflow-y-auto">
      {messages.map((message, i) => (
        <MessageBox
          key={message.id}
          message={message}
          isLast={i === messages.length - 1}
        />
      ))}
      <div ref={bottomRef} className="pt-4" />
    </div>
  );
}

export default Body;
