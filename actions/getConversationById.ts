import db from "@/libs/db";

import getCurrentUser from "./getCurrentUser";

async function getConversationById(conversationId: string) {
  const currentUser = await getCurrentUser();

  if (!currentUser?.email) {
    return null;
  }

  try {
    const conversation = await db.conversation.findUnique({
      where: {
        id: conversationId,
      },
      include: {
        users: true,
      },
    });

    return conversation;
  } catch (error) {
    return null;
  }
}

export default getConversationById;
