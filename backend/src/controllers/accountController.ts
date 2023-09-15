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

export default {
  deleteById,
}
