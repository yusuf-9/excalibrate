// servers
import { Server as SocketServer } from "socket.io";

// types
import { NextApiRequest } from "next";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default function Handler(req: NextApiRequest, res: any) {
  if (res.socket.server) {
    // socket server is up and running
    res.end();
  }

  // socket server is not running, create one
  const io = new SocketServer(res.socket.server, {
    path: "/api/socket/io",
    addTrailingSlash: false,
  });

  io.on("connection", (socket) => {
    console.log("a user connected", socket?.id);
  });

  io.on("disconnect", (socket) => {
    console.log("a user disconnected", socket?.id);
  });

  res.socket.server.io = io;
  res.end();
}
