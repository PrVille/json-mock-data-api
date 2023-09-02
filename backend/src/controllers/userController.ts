import { Request, Response } from "express"
import userService from "../services/userService"
import { matchedData } from "express-validator"
import { GetAllUsersQuery } from "../typings/queries"
import { SortOrder, SortUsersBy } from "../typings/enums"
import { IdParams } from "../typings/params"
import { CreateUserBody, UpdateUserBody } from "../typings/bodies"

const getAllUsers = async (req: Request, res: Response) => {
  const {
    skip = 0,
    take = 10,
    sortBy = SortUsersBy.USERNAME,
    sortOrder = SortOrder.ASC,
  } = matchedData(req) as GetAllUsersQuery

  const usersMeta = { skip, take, sortBy, sortOrder }
  const users = await userService.getAllUsers(usersMeta, req.apiUserId)

  res.json(users)
}

const getUserById = async (req: Request, res: Response) => {
  const { id } = matchedData(req) as IdParams

  const user = await userService.getUserById(id, req.apiUserId)

  res.json(user)
}

const createUser = async (req: Request, res: Response) => {
  const userToCreate = matchedData(req) as CreateUserBody

  const user = await userService.createUser(userToCreate, req.apiUserId)

  res.json(user)
}

const updateUserById = async (req: Request, res: Response) => {
  const { id, ...userToUpdate } = matchedData(req) as IdParams & UpdateUserBody

  const user = await userService.updateUserById(id, userToUpdate, req.apiUserId)

  res.json(user)
}

const deleteUserById = async (req: Request, res: Response) => {
  const { id } = matchedData(req) as IdParams

  const user = await userService.deleteUserById(id, req.apiUserId)

  res.json(user)
}

export default {
  getAllUsers,
  getUserById,
  createUser,
  updateUserById,
  deleteUserById,
}
