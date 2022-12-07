class Sockets {
  constructor(io) {
    this.io = io
  }

  socketEvents() {
    // On connection
    this.io.on('connection', socket => {
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
        this.io.emit('server-emit-messages', {
          socketId: socket.id,
          message,
          date
        })
      })
    })
  }
}

export default Sockets
