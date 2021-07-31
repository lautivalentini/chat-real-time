const chat = (req, res) => {
  if (req.method === "POST") {
    const { name, message } = req.body;
    const socket = res?.socket?.server?.io

    const response = { user: name, text: message }

    socket.emit("message", response);

    res.status(201).json(JSON.stringify(response));
  }
};

export default chat
