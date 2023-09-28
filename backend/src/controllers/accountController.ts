import { Request, Response } from "express"
import { IdParams } from "../typings/params"
import { matchedData } from "express-validator"
import bcrypt from "bcrypt"
import accountService from "../services/accountService"
import prisma from "../client"

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

const updateEmailById = async (req: Request, res: Response) => {
  const { id, email } = matchedData(req) as IdParams & { email: string }
  const apiUserId = req.apiUserId

  if (id !== apiUserId) {
    return res.status(401).json({
      errors: [
        {
          type: "auth",
          value: id,
          msg: "You do not have permission to update another user.",
        },
      ],
    })
  }

  const updatedApiUser = await prisma.apiUser.update({
    where: {
      id,
    },
    data: {
      email,
    },
  })

  const {
    passwordHash: excludedPasswordHash,
    ...updatedApiUserWithoutPasswordHash
  } = updatedApiUser

  res.json(updatedApiUserWithoutPasswordHash)
}

const updatePasswordById = async (req: Request, res: Response) => {
  const { id, oldPassword, newPassword } = matchedData(req) as IdParams & {
    oldPassword: string
    newPassword: string
  }
  const apiUserId = req.apiUserId

  if (id !== apiUserId) {
    return res.status(401).json({
      errors: [
        {
          type: "auth",
          value: id,
          msg: "You do not have permission to update another user.",
        },
      ],
    })
  }

  const user = await prisma.apiUser.findUniqueOrThrow({
    where: { id },
  })

  const passwordCorrect = await bcrypt.compare(oldPassword, user.passwordHash)

  if (!passwordCorrect) {
    return res.status(400).json({
      errors: [
        {
          type: "field",
          value: oldPassword,
          msg: "The specified password for the 'oldPassword' field is incorrect.",
          path: "oldPassword",
          location: "body",
        },
      ],
    })
  }

  const saltRounds = 10
  const newPasswordHash = await bcrypt.hash(newPassword, saltRounds)

  const updatedApiUser = await prisma.apiUser.update({
    where: {
      id,
    },
    data: {
      passwordHash: newPasswordHash,
    },
  })

  const {
    passwordHash: excludedPasswordHash,
    ...updatedApiUserWithoutPasswordHash
  } = updatedApiUser

  res.json(updatedApiUserWithoutPasswordHash)
}

export default {
  deleteById,
  getResources,
  deleteResources,
  resetResources,
  updateEmailById,
  updatePasswordById,
}
