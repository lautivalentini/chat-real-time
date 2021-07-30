const app = require('express')()
const server = require('http').Server(app)
const io = require('socket.io')(server)
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'

const nextApp = next({ dev })

const nextHandler = nextApp.getRequestHandler()

const users = []
const messages = []

io.on('connection', socket => {
  socket.on("join", ({ name, room }, callback) => {
    const user = { id: socket.id, name, room }
    users.push(user);

    socket.join(user.room);

    socket.emit("message", [{user: "Admin", text: `¡${user.name}!, welcome to the room ${user.room}`}]);
    
    socket.broadcast
      .to(user.room)
      .emit("message", [{ user: "Admin", text: `${user.name}, has joined` }]);

    io.to(user.room).emit("roomData", {
      room: user.room,
      users: users.filter((u) => u.room === user.room),
    });

    callback();
  })

  socket.on("sendMessage", (message, name, callback) => {
    const user = users.find(u => u.name === name)
    const sms = { user: user.name, text: message }
    messages.push(sms)
    io.to(user.room).emit("message", messages);
    io.to(user.room).emit("roomData", {
      room: user.room,
      users: users.filter((u) => u.room === user.room),
    });

    callback();
  });

  socket.on("off", (name) => {
    const user = () => {
      const index = users.findIndex((user) => user.id === id);
      if (index !== -1) {
        return users.splice(index, 1)[0];
      }
    };
    if (user) {
      io.to(user.room).emit("message", {
        user: "admin",
        text: `${user.name} has left`,
      });
    }
  });

});

nextApp.prepare().then(() => {
  app.get('*', (req, res) => {
    return nextHandler(req, res)
  })

  server.listen(3000, (err) => {
    if (err) process.exit(0)
    console.log('> Ready on http://localhost:3000')
  })
})