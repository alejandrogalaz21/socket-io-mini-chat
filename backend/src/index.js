import http from 'http'
import express from 'express'
import { Server } from 'socket.io'
import path from 'path'

// Express App
const app = express()
// Server
const server = http.createServer(app)
// Socket.io Server
const io = new Server(server)

app.use(express.static(path.join(__dirname, '../public')))

io.on('connection', socket => {
  console.log('a user connected :', socket.id)
  // emit welcome message
  socket.emit('server-message', {
    message: `welcome user you id is : ${socket.id}`,
    date: new Date()
  })

  // listen message event
  socket.on('client-message', data => {
    console.log({ data })
    const { message, date } = data
    // emit messages to all clients
    io.emit('server-emit-messages', {
      socketId: socket.id,
      message,
      date
    })
  })
})

server.listen(3000, () => {
  console.log('listening on *:3000')
})
