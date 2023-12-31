import express, { Express, NextFunction, Request, Response } from 'express'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import cors from "cors"
import userRoutes from './User'
import itemRoutes from './Item/Routes'
import { errorHandler } from './User/Middleware/error'
const socketIo = require('socket.io');
const http = require('http');

dotenv.config()
const app:Express = express()

app.use(bodyParser.json())
app.use(cors())

const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"]
  }
});

io.on("connection", (socket:any) => {
  io.emit("fromserver","Hello from server")
    console.log("someone connected",socket.id)
  
  socket.on('fromclient', (message:any) => {
    console.log('Received message from client:', message);
  })

  socket.on('sendMessage',(message:any)=>{
    console.log('Received message from user:', message);
    io.emit('getMessage',message)
  })

  socket.on('replyMessage',(message:any)=>{
    console.log('Received message from admin:', message);
    io.emit('getReply',message)
  })
  
  socket.on("disconnect",()=>{
    console.log("someone has left")
  })
});

app.use("/api", userRoutes())
app.use("/api", itemRoutes())

app.all("*", (req: Request, res:Response,next:NextFunction) => {
    const error = new Error("Path not found")
    error.name='404'
    throw error
})

app.use(errorHandler)

server.listen(process.env.PORT, () => {
    console.log(`server is running at port http://localhost:${process.env.PORT}`);

})