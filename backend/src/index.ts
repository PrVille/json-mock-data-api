import express from "express"
import cors from "cors"
import "express-async-errors"

import { PORT } from "./utils/config"

import usersRouter from "./routes/userRoutes"
import authRouter from "./routes/authRoutes"

import errorHandler from "./middlewares/errorHandler"
import authApiUser from "./middlewares/authApiUser"

const app = express()
app.use(express.json())
app.use(cors())

app.use("/api/auth", authRouter)
app.use("/api/users", authApiUser, usersRouter)

app.use(errorHandler)

const start = () => {
  const server = app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`)
  })

  return server
}

export const server = start()

export default app
