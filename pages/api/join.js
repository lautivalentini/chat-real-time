const join = async (req, res) => {
  const users = []
  
  if (req.method === 'POST') {
    const { name, room } = req.body
    const socket = res?.socket?.server?.io
    
    const user = { name, room }
    users.push(user);

    socket.emit("message", { user: "Admin", text: `${user.name}, has joined` });

    res.status(201).json(JSON.stringify(user));
  }
}

export default join