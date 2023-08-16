import express, { Request, Response } from "express"
import cors from "cors"
import { PORT } from "./utils/config"

import usersRouter from "./routes/userRoutes"

import errorHandler from "./middlewares/errorHandler"

const app = express()
app.use(express.json())
app.use(cors())

app.get("/api", (req: Request, res: Response) => {
  res.send("Hello world!")
})

app.use("/api/users", usersRouter)

app.use(errorHandler)

const start = async () => {
  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`)
  })
}

start()

export default app
