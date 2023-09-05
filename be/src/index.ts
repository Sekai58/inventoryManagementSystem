import express, { Express, NextFunction, Request, Response } from 'express'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import cors from "cors"
import userRoutes from './User'
import { errorHandler } from './User/Middleware/error'


dotenv.config()
const app:Express = express()

app.use(bodyParser.json())
app.use(cors())

app.use("/api", userRoutes())


app.all("*", (req: Request, res:Response,next:NextFunction) => {
    const error = new Error("Path not found")
    error.name='404'
    throw error
})

app.use(errorHandler)

app.listen(process.env.PORT, () => {
    console.log(`server is running at port http://localhost:${process.env.PORT}`);

})

