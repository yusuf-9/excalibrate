// servers
import { Server as SocketServer } from "socket.io";

// types
import { NextApiRequest } from "next";
import { NextApiResponseWithSocket } from "@/types/socket";

// utils
import { v4 } from "uuid";

export const config = {
  api: {
    bodyParser: false,
  },
};

const socketConnections = new Set();

export default function Handler(req: NextApiRequest, res: NextApiResponseWithSocket) {
  if (res.socket.server) {
    // socket server is up and running
    res.end();
  }

  // socket server is not running, create one
  const io = new SocketServer(res.socket.server, {
    path: "/api/socket/io",
    addTrailingSlash: false,
  });

  io.on("connection", socket => {
    // when initial connection is made
    console.log("a user connected", socket?.id);

    socket.on("join-room", ({name, roomId}) => {
      try {
        const newRoomId = roomId ?? v4();
        const userData = {
          id: socket.id,
          name,
          roomId: newRoomId,
        };
        socket.join(newRoomId);
        socketConnections.add(userData);
        console.log("joining room");
        socket.emit("joined-room", userData);
      } catch (error) {
        console.log({ error });
      }
    });

    socket.on("message", data => {
      socket.emit("message", data);
    });

    socket.on("disconnect", socket => {
      console.log("a user disconnected", socket);
    });
  });

  res.socket.server.io = io;
  res.end();
}
