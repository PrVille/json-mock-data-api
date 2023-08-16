import express, { Request, Response } from "express"
import cors from "cors"
import "dotenv/config"

const app = express()
app.use(express.json())
app.use(cors())
const port = process.env.PORT || 3001

app.get("/api", (req: Request, res: Response) => {
  res.send("Hello, TypeScript Backend!")
})

app.get("/api/person", (req: Request, res: Response) => {
  res.json({ id: 1, name: "Ville Prami", age: 26 })
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
