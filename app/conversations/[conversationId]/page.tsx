type IParams = {
  conversationId: string;
};

function ConversationIdPage({ params }: { params: IParams }) {
  return (
    <div>
      <h1>ConversationIdPage : {params.conversationId}</h1>
    </div>
  );
}

export default ConversationIdPage;
