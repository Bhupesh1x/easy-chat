"use client";

import EmptyState from "@/components/EmptyState";

import useConversation from "@/hooks/use-conversations";

function Conversations() {
  const { isOpen } = useConversation();
  return (
    <div className={`lg:pl-80 h-full lg:block ${isOpen ? "block" : "hidden"}`}>
      <EmptyState />
    </div>
  );
}

export default Conversations;
