import { Request, Response } from "express"
import userService from "../services/userService"
import { matchedData } from "express-validator"
import { GetAllUsersQuery } from "../typings/queryTypes"
import { SortOrder, SortUsersBy } from "../typings/enums"
import { IdParams } from "../typings/paramsTypes"

const getAllUsers = async (req: Request, res: Response) => {
  const {
    skip = 0,
    take = 10,
    sortBy = SortUsersBy.USERNAME,
    sortOrder = SortOrder.ASC,
  } = matchedData(req) as GetAllUsersQuery

  const users = await userService.getAllUsers(skip, take, sortBy, sortOrder)

  res.json(users)
}

const getUserById = async (req: Request, res: Response) => {
  const { id } = matchedData(req) as IdParams

  const user = await userService.getUserById(id)

  res.json(user)
}

export default { getAllUsers, getUserById }
