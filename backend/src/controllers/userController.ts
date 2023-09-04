import { Request, Response } from "express"
import userService from "../services/userService"
import { matchedData } from "express-validator"
import { GetAllPostsQuery, GetAllUsersQuery } from "../typings/queries"
import { SortCommentsBy, SortOrder, SortPostsBy, SortUsersBy } from "../typings/enums"
import { IdParams } from "../typings/params"
import { CreateUserBody, UpdateUserBody } from "../typings/bodies"
import { GetAllCommentsProps } from "../typings/props"

const getAll = async (req: Request, res: Response) => {
  const {
    skip = 0,
    take = 10,
    sortBy = SortUsersBy.USERNAME,
    sortOrder = SortOrder.ASC,
  } = matchedData(req) as GetAllUsersQuery

  const usersMeta = { skip, take, sortBy, sortOrder }
  const users = await userService.getAll(usersMeta, req.apiUserId)

  res.json(users)
}

const getById = async (req: Request, res: Response) => {
  const { id } = matchedData(req) as IdParams

  const user = await userService.getById(id, req.apiUserId)

  res.json(user)
}

const getAllPosts = async (req: Request, res: Response) => {
  const {
    id: userId,
    skip = 0,
    take = 10,
    sortBy = SortPostsBy.CREATED_AT,
    sortOrder = SortOrder.ASC,
  } = matchedData(req) as GetAllPostsQuery & IdParams

  const postsMeta = { skip, take, sortBy, sortOrder }
  const posts = await userService.getAllPosts(userId, postsMeta, req.apiUserId)

  res.json(posts)
}

const getAllComments = async (req: Request, res: Response) => {
  const {
    id: userId,
    skip = 0,
    take = 10,
    sortBy = SortCommentsBy.CREATED_AT,
    sortOrder = SortOrder.ASC,
  } = matchedData(req) as GetAllCommentsProps & IdParams

  const commentsMeta = { skip, take, sortBy, sortOrder }
  const comments = await userService.getAllComments(userId, commentsMeta, req.apiUserId)

  res.json(comments)
}

const create = async (req: Request, res: Response) => {
  const userToCreate = matchedData(req) as CreateUserBody

  const user = await userService.create(userToCreate, req.apiUserId)

  res.json(user)
}

const updateById = async (req: Request, res: Response) => {
  const { id, ...userToUpdate } = matchedData(req) as IdParams & UpdateUserBody

  const user = await userService.updateById(id, userToUpdate, req.apiUserId)

  res.json(user)
}

const deleteById = async (req: Request, res: Response) => {
  const { id } = matchedData(req) as IdParams

  const user = await userService.deleteById(id, req.apiUserId)

  res.json(user)
}

export default {
  getAll,
  getById,
  getAllPosts,
  getAllComments,
  create,
  updateById,
  deleteById,
}
