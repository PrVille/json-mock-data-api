import { Request, Response } from "express"
import commentService from "../services/commentService"
import { matchedData } from "express-validator"
import { GetAllCommentsQuery } from "../typings/queries"
import { SortCommentsBy, SortOrder } from "../typings/enums"
import { IdParams } from "../typings/params"
import { CreateCommentBody, UpdateCommentBody } from "../typings/bodies"

const getAll = async (req: Request, res: Response) => {
  const {
    skip = 0,
    take = 10,
    sortBy = SortCommentsBy.CREATED_AT,
    sortOrder = SortOrder.ASC,
  } = matchedData(req) as GetAllCommentsQuery

  const commentsMeta = { skip, take, sortBy, sortOrder }
  const comments = await commentService.getAll(commentsMeta, req.apiUserId)

  res.json(comments)
}

const getById = async (req: Request, res: Response) => {
  const { id } = matchedData(req) as IdParams

  const comment = await commentService.getById(id, req.apiUserId)

  res.json(comment)
}

const create = async (req: Request, res: Response) => {
  const commentToCreate = matchedData(req) as CreateCommentBody

  const comment = await commentService.create(commentToCreate, req.apiUserId)

  res.json(comment)
}

const updateById = async (req: Request, res: Response) => {
  const { id, ...commentToUpdate } = matchedData(req) as IdParams &
    UpdateCommentBody

  const comment = await commentService.updateById(
    id,
    commentToUpdate,
    req.apiUserId
  )

  res.json(comment)
}

const deleteById = async (req: Request, res: Response) => {
  const { id } = matchedData(req) as IdParams

  const comment = await commentService.deleteById(id, req.apiUserId)

  res.json(comment)
}

export default {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
}
