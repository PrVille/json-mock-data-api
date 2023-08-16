import { Request, Response } from "express"
import userService from "../services/userService"

const getAllUsers = async (_req: Request, res: Response) => {
  const users = await userService.getAllUsers()
  res.json(users)
}

export default { getAllUsers }
