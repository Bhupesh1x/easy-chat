import { NextResponse } from "next/server";

import db from "@/libs/db";
import getCurrentUser from "@/actions/getCurrentUser";

export async function POST(req: Request) {
  try {
    const curretUser = await getCurrentUser();
    const { message, image, conversationId } = await req.json();

    if (!curretUser?.id || !curretUser?.email) {
      return new NextResponse("User unauthorized", { status: 401 });
    }

    const newMessage = await db.message.create({
      data: {
        body: message,
        image: image,
        conversation: {
          connect: {
            id: conversationId,
          },
        },
        sender: {
          connect: {
            id: curretUser.id,
          },
        },
        seen: {
          connect: {
            id: curretUser?.id,
          },
        },
      },
      include: {
        seen: true,
        sender: true,
      },
    });

    const updatedConversation = await db.conversation.update({
      where: {
        id: conversationId,
      },
      data: {
        lastMessageAt: new Date(),
        messages: {
          connect: {
            id: newMessage.id,
          },
        },
      },
      include: {
        users: true,
        messages: {
          include: {
            seen: true,
          },
        },
      },
    });

    return NextResponse.json(newMessage);
  } catch (error) {
    return new NextResponse("Internal server error", { status: 500 });
  }
}
