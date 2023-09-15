import express from "express"
import cors from "cors"
import "express-async-errors"

import { PORT } from "./utils/config"

import authRouter from "./routes/authRoutes"
import accountRouter from "./routes/accountRoutes"
import usersRouter from "./routes/userRoutes"
import postsRouter from "./routes/postRoutes"
import commentsRouter from "./routes/commentRoutes"

import errorHandler from "./middlewares/errorHandler"
import authApiRequest from "./middlewares/authApiRequest"
import authApiUser from "./middlewares/authApiUser"

const app = express()
app.use(express.json())
app.use(cors())

app.use("/api/auth", authRouter)

app.use("/api/account", authApiUser, accountRouter)

app.use("/api/users", authApiRequest, usersRouter)
app.use("/api/posts", authApiRequest, postsRouter)
app.use("/api/comments", authApiRequest, commentsRouter)

app.use(errorHandler)

const start = () => {
  const server = app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`)
  })

  return server
}

export const server = start()

export default app
