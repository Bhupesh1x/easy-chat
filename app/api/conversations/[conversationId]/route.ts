import getCurrentUser from "@/actions/getCurrentUser";
import db from "@/libs/db";
import { NextResponse } from "next/server";

type IParams = {
  conversationId?: string;
};

export async function DELETE(req: Request, { params }: { params: IParams }) {
  try {
    const { conversationId } = params;
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return new NextResponse("User unauthorized", { status: 401 });
    }

    const existingConversation = await db.conversation.findUnique({
      where: {
        id: conversationId,
      },
      include: {
        users: true,
      },
    });

    if (!existingConversation) {
      return new NextResponse("Invalid ID!", { status: 400 });
    }

    const deletedConversation = await db.conversation.deleteMany({
      where: {
        id: conversationId,
        userIds: {
          hasSome: [currentUser?.id],
        },
      },
    });

    return NextResponse.json(deletedConversation);
  } catch (error) {
    return new NextResponse("Internal server error", { status: 500 });
  }
}
