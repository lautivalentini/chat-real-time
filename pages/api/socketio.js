import { Server as ServerIO } from "socket.io";

export const config = {
  api: {
    bodyParser: false,
  },
};

const users = []

const socketIo = async (req, res) => {
  if (!res.socket.server.io) {
    const httpServer = res.socket.server;
    const io = new ServerIO(httpServer, {
      path: "/api/socketio",
    });
    res.socket.server.io = io;
  }
  
  res.end();
};


export default socketIo