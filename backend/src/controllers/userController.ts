import { Request, Response } from "express"
import userService from "../services/userService"
import { matchedData } from "express-validator"
import { GetAllUsersQuery, GetUserByIdQuery } from "../typings/queryTypes"
import { SortOrder, SortUsersBy } from "../typings/enums"
import { IdParams } from "../typings/paramsTypes"

const getAllUsers = async (req: Request, res: Response) => {
  const {
    skip = 0,
    take = 10,
    sortBy = SortUsersBy.USERNAME,
    sortOrder = SortOrder.ASC,
    include,
  } = matchedData(req) as GetAllUsersQuery

  const users = await userService.getAllUsers(
    skip,
    take,
    sortBy,
    sortOrder,
    include
  )

  res.json(users)
}

const getUserById = async (req: Request, res: Response) => {
  const { id } = matchedData(req) as IdParams
  const { include } = matchedData(req) as GetUserByIdQuery

  const user = await userService.getUserById(id, include)

  res.json(user)
}

export default { getAllUsers, getUserById }
