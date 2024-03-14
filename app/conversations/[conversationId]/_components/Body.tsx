"use client";

import axios from "axios";
import { find } from "lodash";
import { useEffect, useRef, useState } from "react";

import MessageBox from "./MessageBox";

import { pusherClient } from "@/libs/pusher";
import { FullMessageType } from "@/app/types";
import useConversation from "@/hooks/use-conversations";

type Props = {
  initialMessages: FullMessageType[];
};

function Body({ initialMessages }: Props) {
  const [messages, setMessages] = useState(initialMessages);

  const bottomRef = useRef<HTMLDivElement>(null);
  const { conversationId } = useConversation();

  useEffect(() => {
    try {
      axios.post(`/api/conversations/${conversationId}/seen`);
    } catch (error) {
      console.log(error);
    }
  }, [conversationId]);

  useEffect(() => {
    pusherClient.subscribe(conversationId);
    bottomRef?.current?.scrollIntoView();

    const messageHandler = (message: FullMessageType) => {
      axios.post(`/api/conversations/${conversationId}/seen`);

      setMessages((current) => {
        if (find(current, { id: message.id })) {
          return current;
        }

        return [...current, message];
      });

      bottomRef?.current?.scrollIntoView();
    };

    const updateMessageHandler = (newMessage: FullMessageType) => {
      setMessages((current) =>
        current.map((currMessage) => {
          if (currMessage.id === newMessage.id) {
            return newMessage;
          }

          return currMessage;
        })
      );
    };

    pusherClient.bind("messages:new", messageHandler);
    pusherClient.bind("message:update", updateMessageHandler);

    return () => {
      pusherClient.unsubscribe(conversationId);
      pusherClient.unbind("messages:new", messageHandler);
      pusherClient.bind("message:update", updateMessageHandler);
    };
  }, [conversationId]);

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
