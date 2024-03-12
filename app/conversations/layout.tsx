import Sidebar from "@/components/sidebar/Sidebar";
import getConversations from "@/actions/getConversations";

import ConversationList from "./_components/ConversationList";
import getUsers from "@/actions/getUsers";

type Props = {
  children: React.ReactNode;
};

async function ConversationsLayout({ children }: Props) {
  const users = await getUsers();
  const conversations = await getConversations();
  return (
    <Sidebar>
      <ConversationList initialItems={conversations} users={users} />
      <div className="h-full">{children}</div>
    </Sidebar>
  );
}

export default ConversationsLayout;
