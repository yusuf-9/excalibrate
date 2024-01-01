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

const socketConnections = new Set<{
  id: string;
  name: string;
  roomId: string;
}>();

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

    socket.on("join-room", ({ name, roomId }) => {
      try {
        const newRoomId = roomId ?? v4();
        const userData = {
          id: socket.id,
          name,
          roomId: newRoomId,
        };
        socket.join(newRoomId);
        socketConnections.add(userData);
        socket.emit("user-joined-room", userData); // Notify new user that he has joined the room
        socket.broadcast.to(newRoomId).emit("new-user-joined-room", userData); // Notify existing users that a new user has joined their room
      } catch (error) {
        console.log({ error });
      }
    });

    socket.on("message", ({ message }) => {
      try {
        const socketConnectsArray = Array.from(socketConnections);
        const userConnection = socketConnectsArray.find(({ id }) => id === socket.id);
        if(!userConnection) return;
        
        const { name, roomId } = userConnection;
        io.to(roomId).emit("message-recieved", { message, name });
      } catch (error) {
        console.log({ error });
      }
    });

    socket.on("disconnect", () => {
      socketConnections.forEach(connection => {
        if (connection.id === socket.id) {
          socketConnections.delete(connection);
        }
      })
    });
  });

  res.socket.server.io = io;
  res.end();
}
