import { getServerSession } from "next-auth";
import { NextApiRequest, NextApiResponse } from "next";

import { authOptions } from "@/libs/auth";
import { pusherServer } from "@/libs/pusher";

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const session = await getServerSession(request, response, authOptions);

  if (!session?.user?.email) {
    return response.status(401);
  }

  const socketId = request.body.socket_id;
  const channelName = request.body.channel_name;
  const data = {
    user_id: session?.user?.email,
  };

  const authResponse = pusherServer.authorizeChannel(
    socketId,
    channelName,
    data
  );

  return response.send(authResponse);
}
