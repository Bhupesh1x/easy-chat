import Sidebar from "@/components/sidebar/Sidebar";
import getConversations from "@/actions/getConversations";

import ConversationList from "./_components/ConversationList";

type Props = {
  children: React.ReactNode;
};

async function ConversationsLayout({ children }: Props) {
  const conversations = await getConversations();
  return (
    <Sidebar>
      <ConversationList initialItems={conversations} />
      <div className="h-full">{children}</div>
    </Sidebar>
  );
}

export default ConversationsLayout;
