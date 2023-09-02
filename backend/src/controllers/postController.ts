import { Request, Response } from "express"
import postService from "../services/postService"
import { matchedData } from "express-validator"
import { GetAllPostsQuery } from "../typings/queries"
import { SortOrder, SortPostsBy } from "../typings/enums"
import { IdParams } from "../typings/params"

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

export default {
  getAllPosts,getPostById
}
