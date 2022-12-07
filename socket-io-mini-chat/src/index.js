import dotenv from 'dotenv'
import Server from './models/server'
// set global env variables
dotenv.config()
// instance of the server
const server = new Server()
// run the server
server.execute()
