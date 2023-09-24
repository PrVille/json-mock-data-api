import { Request, Response } from "express"
import { IdParams } from "../typings/params"
import { matchedData } from "express-validator"
import accountService from "../services/accountService"

const deleteById = async (req: Request, res: Response) => {
  const { id } = matchedData(req) as IdParams
  const apiUserId = req.apiUserId

  if (id !== apiUserId) {
    return res.status(401).json({
      errors: [
        {
          type: "auth",
          value: id,
          msg: "You do not have permission to delete another user's account.",
        },
      ],
    })
  }

  const apiUser = await accountService.deleteById(id)

  res.json(apiUser)
}

const getResources = async (req: Request, res: Response) => {
  const { id } = matchedData(req) as IdParams
  const apiUserId = req.apiUserId

  if (id !== apiUserId) {
    return res.status(401).json({
      errors: [
        {
          type: "auth",
          value: id,
          msg: "You do not have permission to fetch another user's resources.",
        },
      ],
    })
  }

  const resources = await accountService.getResources(id)

  res.json(resources)
}

const deleteResources = async (req: Request, res: Response) => {
  const { id } = matchedData(req) as IdParams
  const apiUserId = req.apiUserId

  if (id !== apiUserId) {
    return res.status(401).json({
      errors: [
        {
          type: "auth",
          value: id,
          msg: "You do not have permission to delete another user's resources.",
        },
      ],
    })
  }

  const resources = await accountService.deleteResources(id)

  res.json(resources)
}

const resetResources = async (req: Request, res: Response) => {
  const { id } = matchedData(req) as IdParams
  const apiUserId = req.apiUserId

  if (id !== apiUserId) {
    return res.status(401).json({
      errors: [
        {
          type: "auth",
          value: id,
          msg: "You do not have permission to reset another user's resources.",
        },
      ],
    })
  }

  const resources = await accountService.resetResources(id)

  res.json(resources)
}

export default {
  deleteById,
  getResources,
  deleteResources,
  resetResources
}
