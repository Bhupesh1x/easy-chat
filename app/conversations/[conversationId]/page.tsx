import getMessages from "@/actions/getMessages";
import getConversationById from "@/actions/getConversationById";

import Header from "./_components/Header";

import EmptyState from "@/components/EmptyState";

type IParams = {
  conversationId: string;
};

async function ConversationIdPage({ params }: { params: IParams }) {
  const { conversationId } = params;
  const conversation = await getConversationById(conversationId);
  const messages = await getMessages(conversationId);

  if (!conversation) {
    return (
      <div className="lg:pl-80 h-full">
        <div className="h-full flex flex-col">
          <EmptyState />
        </div>
      </div>
    );
  }

  return (
    <div className="lg:pl-80 h-full">
      <div className="h-full flex flex-col">
        <Header conversation={conversation} />
      </div>
    </div>
  );
}

export default ConversationIdPage;
