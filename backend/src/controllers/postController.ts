import { Request, Response } from "express"
import postService from "../services/postService"
import { matchedData } from "express-validator"
import { GetAllPostsQuery } from "../typings/queries"
import { SortOrder, SortPostsBy } from "../typings/enums"
import { IdParams } from "../typings/params"
import { CreatePostBody, UpdatePostBody } from "../typings/bodies"

const getAll = async (req: Request, res: Response) => {
  const {
    skip = 0,
    take = 10,
    sortBy = SortPostsBy.CREATED_AT,
    sortOrder = SortOrder.ASC,
  } = matchedData(req) as GetAllPostsQuery

  const postsMeta = { skip, take, sortBy, sortOrder }
  const posts = await postService.getAll(postsMeta, req.apiUserId)

  res.json(posts)
}

const getById = async (req: Request, res: Response) => {
  const { id } = matchedData(req) as IdParams

  const post = await postService.getById(id, req.apiUserId)

  res.json(post)
}

const create = async (req: Request, res: Response) => {
  const postToCreate = matchedData(req) as CreatePostBody

  const post = await postService.create(postToCreate, req.apiUserId)

  res.json(post)
}

const updateById = async (req: Request, res: Response) => {
  const { id, ...postToUpdate } = matchedData(req) as IdParams & UpdatePostBody

  const post = await postService.updateById(id, postToUpdate, req.apiUserId)

  res.json(post)
}

const deleteById = async (req: Request, res: Response) => {
  const { id } = matchedData(req) as IdParams

  const post = await postService.deleteById(id, req.apiUserId)

  res.json(post)
}

export default {
  getAll,
  getById,
  create,
  updateById,
  deleteById
}
