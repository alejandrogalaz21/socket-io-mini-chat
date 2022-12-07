import path from 'path'
import http from 'http'
import express from 'express'
import { Server as socketIo } from 'socket.io'

class Server {
  constructor() {
    this.app = express()
    this.port = process.env.PORT || 3000
    // Http server
    this.server = http.createServer(this.app)
    // Socket.io Server
    this.io = new socketIo(this.server)
  }

  middlewares() {
    this.app.use(express.static(path.join(__dirname, './../../public')))
  }

  execute() {
    this.middlewares()
    this.server.listen(this.port, () => {
      console.log(`listening on *:${this.port}`)
    })
  }
}

export default Server
