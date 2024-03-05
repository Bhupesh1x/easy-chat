"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MdOutlineGroupAdd } from "react-icons/md";

import { FullConversationType } from "@/app/types";

import useConversation from "@/hooks/use-conversations";

import ConversationBox from "./ConversationBox";

type Props = {
  initialItems: FullConversationType[];
};

function ConversationList({ initialItems }: Props) {
  const [items, setItems] = useState(initialItems);

  const router = useRouter();

  const { isOpen, conversationId } = useConversation();

  return (
    <aside
      className={`fixed inset-y-0 pb-20 lg:pb-0 lg:block lg:w-80 lg:left-20 overflow-y-auto border-r border-gray-200 ${
        isOpen ? "hidden" : "block w-full left-0"
      }`}
    >
      <div className="px-5">
        <div className="flex items-center justify-between pt-4 mb-4">
          <p className="text-2xl font-bold text-neutral-800">Messages</p>
          <div className="p-2 rounded-full cursor-pointer hover:opacity-75 bg-gray-100 text-gray-600 transition">
            <MdOutlineGroupAdd size={20} />
          </div>
        </div>
        {items.map((item) => (
          <ConversationBox
            key={item.id}
            data={item}
            selected={conversationId === item.id}
          />
        ))}
      </div>
    </aside>
  );
}

export default ConversationList;