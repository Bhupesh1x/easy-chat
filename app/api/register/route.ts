import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

import db from "@/libs/db";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { name, email, password } = body;

    if (!name || !email || !password) {
      return new NextResponse("Missing required fields", { status: 500 });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await db.user.create({
      data: {
        name,
        email,
        hashedPassword,
      },
    });

    return NextResponse.json(user);
  } catch (error) {
    return new NextResponse(`${error}`, { status: 500 });
  }
}
