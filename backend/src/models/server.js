import path from 'path'
import http from 'http'
import express from 'express'
import { Server as socketIo } from 'socket.io'
import Sockets from './sockets'

class Server {
  constructor() {
    this.app = express()
    this.port = process.env.PORT || 3000
    // Http server
    this.server = http.createServer(this.app)
    // Socket.io Server
    this.io = new socketIo(this.server)
  }

  middlewareConfig() {
    this.app.use(express.static(path.join(__dirname, './../../public')))
  }

  socketsConfig() {
    new Sockets(this.io).socketEvents()
  }

  execute() {
    // Init middleware
    this.middlewareConfig()

    // Init Socket's
    this.socketsConfig()

    this.server.listen(this.port, () => {
      console.log(`listening on *:${this.port}`)
    })
  }
}

export default Server
