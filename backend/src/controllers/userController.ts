import { Request, Response } from "express"
import userService from "../services/userService"

const getAllUsers = async (_req: Request, res: Response) => {
  const users = await userService.getAllUsers()
  res.json(users)
}

const getUserById = async (req: Request, res: Response) => {
  const user = await userService.getUserById(req.params.id)
  res.json(user)
}

export default { getAllUsers, getUserById }
