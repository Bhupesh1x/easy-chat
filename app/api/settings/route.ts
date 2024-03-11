import { NextResponse } from "next/server";

import db from "@/libs/db";
import getCurrentUser from "@/actions/getCurrentUser";

export async function POST(req: Request) {
  try {
    const { name, image } = await req.json();

    const currentUser = await getCurrentUser();

    if (!currentUser?.id) {
      return new NextResponse("User unauthorized", { status: 500 });
    }

    const updatedUser = await db.user.update({
      where: {
        id: currentUser?.id,
      },
      data: {
        name,
        image,
      },
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    return new NextResponse("Internal server error", { status: 500 });
  }
}
