import { Request, Response } from "express"
import postService from "../services/postService"
import { matchedData } from "express-validator"
import { GetAllPostsQuery } from "../typings/queries"
import { SortOrder, SortPostsBy } from "../typings/enums"
import { IdParams } from "../typings/params"
import { CreatePostBody } from "../typings/bodies"

const getAllPosts = async (req: Request, res: Response) => {
  const {
    skip = 0,
    take = 10,
    sortBy = SortPostsBy.CREATED_AT,
    sortOrder = SortOrder.ASC,
  } = matchedData(req) as GetAllPostsQuery

  const postsMeta = { skip, take, sortBy, sortOrder }
  const posts = await postService.getAllPosts(postsMeta, req.apiUserId)

  res.json(posts)
}

const getPostById = async (req: Request, res: Response) => {
  const { id } = matchedData(req) as IdParams

  const post = await postService.getPostById(id, req.apiUserId)

  res.json(post)
}

const createPost = async (req: Request, res: Response) => {
  const postToCreate = matchedData(req) as CreatePostBody

  const post = await postService.createPost(postToCreate, req.apiUserId)

  res.json(post)
}

export default {
  getAllPosts,
  getPostById,
  createPost
}
