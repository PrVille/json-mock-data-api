import { Request, Response } from "express"
import commentService from "../services/commentService"
import { matchedData } from "express-validator"
import { GetAllCommentsQuery } from "../typings/queries"
import { SortCommentsBy, SortOrder } from "../typings/enums"
import { IdParams } from "../typings/params"

const getAllComments = async (req: Request, res: Response) => {
  const {
    skip = 0,
    take = 10,
    sortBy = SortCommentsBy.CREATED_AT,
    sortOrder = SortOrder.ASC,
  } = matchedData(req) as GetAllCommentsQuery

  const commentsMeta = { skip, take, sortBy, sortOrder }
  const comments = await commentService.getAllComments(commentsMeta, req.apiUserId)

  res.json(comments)
}

const getCommentById = async (req: Request, res: Response) => {
  const { id } = matchedData(req) as IdParams

  const comment = await commentService.getCommentById(id, req.apiUserId)

  res.json(comment)
}

// const createPost = async (req: Request, res: Response) => {
//   const postToCreate = matchedData(req) as CreatePostBody

//   const post = await postService.createPost(postToCreate, req.apiUserId)

//   res.json(post)
// }

// const updatePostById = async (req: Request, res: Response) => {
//   const { id, ...postToUpdate } = matchedData(req) as IdParams & UpdatePostBody

//   const post = await postService.updatePostById(id, postToUpdate, req.apiUserId)

//   res.json(post)
// }

// const deletePostById = async (req: Request, res: Response) => {
//   const { id } = matchedData(req) as IdParams

//   const post = await postService.deletePostById(id, req.apiUserId)

//   res.json(post)
// }

export default {
  getAllComments,
  getCommentById,
//   createPost,
//   updatePostById,
//   deletePostById
}
