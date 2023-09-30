import express from "express"
import cors from "cors"
import "express-async-errors"

import { PORT } from "./utils/config"
import { routes } from "./const"

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

app.get("/api", (_req, res) => {
  res.json({ message: "Welcome to JSON Mock Data API!", ...routes })
})

app.use("/api/auth", authRouter)

app.use("/api/account", authApiUser, accountRouter)

app.use("/api/users", authApiRequest, usersRouter)
app.use("/api/posts", authApiRequest, postsRouter)
app.use("/api/comments", authApiRequest, commentsRouter)

app.get("*", (req, res) => {
  const invalidRoute = req.originalUrl
  res.json({ message: `Page not found: ${invalidRoute}`, ...routes })
})

app.use(errorHandler)

const start = () => {
  const server = app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`)
  })

  return server
}

export const server = start()

export default app
