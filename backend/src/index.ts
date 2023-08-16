import express, { Request, Response } from "express"
import "dotenv/config"

const app = express()
const port = process.env.PORT || 3001

app.get("/api", (req: Request, res: Response) => {
  res.send("Hello, TypeScript Backend!")
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
